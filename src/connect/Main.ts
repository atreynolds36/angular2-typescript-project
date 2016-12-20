/**
 * Created by areynolds2 on 11/7/2016.
 */
import * as http from "http";
import * as cheerio from 'cheerio';
import * as express from "express";
import { Player, StatLine } from './Objects/league';
import { BR_map } from './Objects/maps';
import * as async from 'async';
import * as fs from 'fs';

const URI = {
    BASKETBALL_REFERENCE_HOST : 'www.basketball-reference.com',
    CBS_HOST : 'www.cbssports.com',
    MY_TEAM_INDEX : 1
};

interface PlayerFromClient{
    firstname : string,
    lastname : string,
    team : string
    cutdate ?: string,
    adddate ?: string
}
/*
    Private class that connects to internet via http.request
 */
class Connector{

    static findPlayerUrl(player : string , team : string , callback : (err : Error , href ?: string) => void ) : void  {
        //If team abreviation is different for basketball reference, use that instead
        if(BR_map[team]){
            team = BR_map[team];
        }
        var options = {
            "method": "GET",
            "hostname" : URI.BASKETBALL_REFERENCE_HOST,
            "path": "/teams/" + team + "/2017.html"
        };
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load( body.toString()  );
                var csk = $('td').filter(function(){
                    var csk = $(this).attr('csk');
                    return csk && csk.toUpperCase().indexOf(player.toUpperCase()) > -1;
                });
                var iter : any = csk.find('a');
                var player_href = iter && iter.prop('href');
                if(player_href){
                    callback( null , player_href )
                } else {
                    callback(new Error('Cannot find page href for player' + player ));
                }
            });
            res.on('error',function(err){
                callback(new Error('Could not find team' + team ) )
            })
        });
        req.end();
    }

    static findPlayerAverages(player : Player , callback : (err : any , p ?: Player) => void ) : void  {
        var options = {
            "method": "GET",
            "hostname" : URI.BASKETBALL_REFERENCE_HOST,
            "path": player.href
        };
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load( body.toString()  );

                let findHref = player.href.replace('.html' , '/gamelog/2017/');
                console.log('FIND HREF ' + findHref);

                let elementRow = $('a[href="' + findHref + '"]').parent().attr('class');
                console.log(elementRow);

                elementRow = $('a[href="' + findHref + '"]').parent().parent().attr('class');
                console.log(elementRow);
                let x = $('a[href="' + findHref + '"]').parent().parent().children().length;
                console.log('CHILDREN' + x);

                let statRow = $('a[href="' + findHref + '"]').parent().parent()
                player.loadStats($ , findHref)

                callback( null , player )
            });
            res.on('error',function(err){
                callback('Failed in FETCHING MY TEAM')
            })
        });
        req.end();
    }

    /*
        From a player - get there game stats for a specific game
     */
    static getPlayerGameStats(player : Player , gameHref : string , callback : (err : any , stats ?: StatLine) => void ) : void  {
        var options = {
            "method": "GET",
            "hostname" : URI.CBS_HOST,
            "path": gameHref
        };
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load( body.toString()  );

                let player_anchor_str = player.firstname.charAt(0) + ". " + player.lastname;
                var playerStatLine = $('.playerStatName').find('a');
                var statline : any = {};
                playerStatLine.each(function(){
                    //GET PLAYER STAT LINE
                    if( $(this).html() == player_anchor_str ){
                        console.log('FOUND STAT LINE');
                        var $row = $(this).parent().parent();

                        var $cols = $($row).find('td');
                        console.log('COLUMNS' + $cols );
                        statline.PTS = parseInt ( $($cols[1]).html() );
                        statline.RB = parseInt ( $($cols[2]).html() );
                        statline.AST = parseInt ( $($cols[3]).html() );

                        let fgs = $($cols[5]).html().split('-') ;
                        statline.FGM = parseInt ( fgs[0] );
                        statline.FGA = parseInt ( fgs[1] );
                        statline.TPM = parseInt ( $($cols[6]).html().split('-')[0] ) ;

                        let fts = $($cols[7]).html().split('-');
                        statline.FTM = parseInt( fts[0] );
                        statline.FTA = parseInt( fts[1] );
                        statline.TOV = parseInt ( $($cols[8]).html() );
                        statline.STL = parseInt ( $($cols[9]).html() );
                        statline.BLK = parseInt ( $($cols[10]).html() );
                        return true;
                    }
                });

                callback( null , statline )
            });
            res.on('error',function(err){
                callback('Failed in FETCHING MY TEAM')
            })
        });
        req.end();
    }
}


export class WebConnect{
    constructor(){}

    static getPlayerSeasonAverages( player : PlayerFromClient , callback : (err: Error , stats ?: any) => void ) : void  {
        let formPlayerKey = player.lastname + "," + player.firstname;
        Connector.findPlayerUrl(formPlayerKey , player.team , (err : any , href : string ) =>{
            if(err){
                callback(err);
            } else{
                let initPlayer = new Player(player.firstname , player.lastname , player.team );
                initPlayer.href = href;
                Connector.findPlayerAverages(initPlayer , (err: any , player : Player) => {
                    if(err){
                        console.log(err);
                        callback(err);
                    } else{
                        let week_games = JSON.parse(fs.readFileSync('./json/remaining_schedule.json', 'utf8'));
                        player.wk_games = week_games[ player.team ].wk_remaining_games;
                        callback( null , player.toJson() );
                    }
                })
            }
        })
    }

    /*
        Get player X's weekly statistics
     */
    static getPlayerWeeklyStats( player : PlayerFromClient , callback : (stats : any) => void ) : void  {

        let weekly_games = JSON.parse(fs.readFileSync('./json/played_schedule.json', 'utf8'));

        let player_games = weekly_games[ player.team ].games;

        var this_player = new Player( player.firstname , player.lastname , player.team );

        var async_game_requests = [];
        //Build parrell async functions for each game
        player_games.forEach(function(node){
            let fnction = function(fn){
                console.log('GAME LINK' + node.game_link );
                Connector.getPlayerGameStats(this_player , node.game_link , fn );
            };
            if( player.cutdate && player.adddate ){
                if( player.cutdate > node.date && player.adddate <= node.date ){
                    async_game_requests.push( fnction );
                }
            } else if(player.cutdate) {
                if(player.cutdate > node.date ){
                    async_game_requests.push(fnction);
                }
            } else if(player.adddate) {
                if(player.adddate <= node.date ){
                    async_game_requests.push(fnction);
                }
            } else {
                    async_game_requests.push( fnction );
            }
        });

        async.parallel( async_game_requests , function(err, results : Array<StatLine> ){
            console.log( 'LENGTH ' + results.length );
            for(var iter = 0 ; iter < results.length ; iter++ ){
                this_player.importStatLine( results[iter] );
            }
            console.log( results[0] );
            callback( this_player.toJson() )
        })
    }


}


export var init = new WebConnect();