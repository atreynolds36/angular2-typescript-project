#!/usr/bin/env node

const sync_request = require('sync-request');
const fs = require('fs');
const cheerio = require('cheerio');

const MAX_DAYS_IN_MONTH = {
    1 : 31,
    2 : 28,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10 : 31,
    11 : 30 ,
    12 : 31
};

const TEAMS = {
    ATL : 'Atlanta',
    BOS : 'Boston',
    NJN : 'Brooklyn',
    CHA : 'Charlotte',
    CHI : 'Chicago',
    CLE : 'Cleveland',
    DAL : 'Dallas',
    DEN : 'Denver',
    DET : 'Detroit',
    GSW : 'Golden State',
    HOU : 'Houston',
    IND : 'Indiana',
    LAC : 'L.A. Clippers',
    LAL : 'L.A. Lakers',
    MIA : 'Miami',
    MIL : 'Milwaukee',
    MIN : 'Minnesota',
    MEM : 'Memphis',
    NYK : 'New York',
    NOH : 'New Orleans',
    ORL : 'Orlando',
    OKC : 'Oklahoma City',
    PHI : 'Philadelphia',
    PHO : 'Phoenix',
    POR : 'Portland',
    SAC : 'Sacramento',
    SAS : 'San Antonio',
    TOR : 'Toronto',
    UTA : 'Utah',
    WAS : 'Washington'
};

//0(sunday) - 6(saturday)
var day = new Date().getDay();

var todays_month = new Date().getMonth() + 1 ;

var todays_date = new Date().getDate();

var year = new Date().getFullYear();
/*
    TASK 1 - Figure out how many games each team has remaining on their schedule this week
 */
(function(){
    var filePath = "./json/remaining_schedule.json";

    var weekly_remaining_schedule = {
        ATL : { wk_remaining_games : 0 },
        BOS : { wk_remaining_games : 0 },
        NJN : { wk_remaining_games : 0 },
        CHA : { wk_remaining_games : 0 },
        CHI : { wk_remaining_games : 0 },
        CLE : { wk_remaining_games : 0 },
        DAL : { wk_remaining_games : 0 },
        DEN : { wk_remaining_games : 0 },
        DET : { wk_remaining_games : 0 },
        GSW : { wk_remaining_games : 0 },
        HOU : { wk_remaining_games : 0 },
        IND : { wk_remaining_games : 0 },
        LAC : { wk_remaining_games : 0 },
        LAL : { wk_remaining_games : 0 },
        MIA : { wk_remaining_games : 0 },
        MIL : { wk_remaining_games : 0 },
        MIN : { wk_remaining_games : 0 },
        MEM : { wk_remaining_games : 0 },
        NYK : { wk_remaining_games : 0 },
        NOH : { wk_remaining_games : 0 },
        ORL : { wk_remaining_games : 0 },
        OKC : { wk_remaining_games : 0 },
        PHI : { wk_remaining_games : 0 },
        PHO : { wk_remaining_games : 0 },
        POR : { wk_remaining_games : 0 },
        SAC : { wk_remaining_games : 0 },
        SAS : { wk_remaining_games : 0 },
        TOR : { wk_remaining_games : 0 },
        UTA : { wk_remaining_games : 0 },
        WAS : { wk_remaining_games : 0 }
    };

    var iter = 0;
    while( day != 1 || iter == 0 ){
        if(day == 7 ){
            day = 0;
        }
        var month = ( todays_date + iter ) <= MAX_DAYS_IN_MONTH[todays_month] ? todays_month : todays_month + 1 ;

        var date = ( todays_date + iter ) <= MAX_DAYS_IN_MONTH[todays_month] ? todays_date + iter :
        ( todays_date + iter ) - MAX_DAYS_IN_MONTH[todays_month];

        var path = year.toString() + month.toString() + ( date < 10 ? "0" + date.toString() : date.toString() );

        console.log(path);

        var res = sync_request('GET' , 'http://www.cbssports.com/nba/scoreboard/' + path )

        if(res.getBody()){
            console.log('SUCCESS');
            var response_html = res.getBody('utf8');
            var $ = cheerio.load(response_html);
            var teams = $('.teamLocation').find('a');
            console.log( teams.length );
            teams.each(function(){
                for(var team in weekly_remaining_schedule){
                    var node = weekly_remaining_schedule[team];

                    if( $(this).html() === TEAMS[ team ] ){
                        //Game left in week - add to counter
                        node.wk_remaining_games ++;
                    }
                }
            });
            console.log( typeof res.getBody('utf8') );
        }
        iter++;
        day++;
    }

    if( fs.existsSync(filePath) ){
        fs.writeFileSync(filePath , JSON.stringify(weekly_remaining_schedule , null , 4));
    } else{
        console.log('no file path');
    }
})();

console.log('--Configure past games --');

////////////////////////////////////////////////////////////////////////////////
/*
    Task 2 - figure out past games that have been played already
 */
///////////////////////////////////////////////////////////////////////////////
(function(){
    var played_games = {
        ATL : { games : [] },
        BOS : { games : [] },
        NJN : { games : [] },
        CHA : { games : [] },
        CHI : { games : [] },
        CLE : { games : [] },
        DAL : { games : [] },
        DEN : { games : [] },
        DET : { games : [] },
        GSW : { games : [] },
        HOU : { games : [] },
        IND : { games : [] },
        LAC : { games : [] },
        LAL : { games : [] },
        MIA : { games : [] },
        MIL : { games : [] },
        MIN : { games : [] },
        MEM : { games : [] },
        NYK : { games : [] },
        NOH : { games : [] },
        ORL : { games : [] },
        OKC : { games : [] },
        PHI : { games : [] },
        PHO : { games : [] },
        POR : { games : [] },
        SAC : { games : [] },
        SAS : { games : [] },
        TOR : { games : [] },
        UTA : { games : [] },
        WAS : { games : [] }
    };

    var filePath = "./json/played_schedule.json";

    var iter = 1;

//start from yesterday
    day = new Date().getDay() -1 ;

    while( day != 0 ){
        if(day == -1 ){
            day = 6;
        }
        var month = ( todays_date - iter ) > 0 ? todays_month : todays_month - 1 ;

        var date = ( todays_date - iter ) > 0 ? todays_date - iter :
        ( todays_date - iter ) + MAX_DAYS_IN_MONTH[todays_month];

        var path = year.toString() + month.toString() + ( date < 10 ? "0" + date.toString() : date.toString() );

        console.log(path);

        var res = sync_request('GET' , 'http://www.cbssports.com/nba/scoreboard/' + path )

        if(res.getBody()){
            console.log('SUCCESS');
            var response_html = res.getBody('utf8');
            var $ = cheerio.load(response_html);
            var teams = $('.teamLocation').find('a');
            console.log( teams.length );
            teams.each(function(){
                for(var team in played_games){
                    var node = played_games[team];

                    if( $(this).html() === TEAMS[ team ] ){
                        var $scoreBoxParent = $(this).parents('.scoreBox')[0];
                        var $links = $($scoreBoxParent).find('a[class="gameTracker"]');
                        var box_score_href;
                        $links.each(function(){
                            if( $(this).html().toUpperCase() == 'BOX SCORE'){
                                box_score_href = $(this).prop('href');
                            }
                        });

                        node.games.push( { date : path , game_link : box_score_href})
                    }
                }
            });
        }
        iter++;
        day--;
    }

    if( fs.existsSync(filePath) ){
        fs.writeFileSync(filePath , JSON.stringify(played_games , null , 4));
    } else{
        console.log('no file path');
    }
})();



