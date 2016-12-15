"use strict";
const http = require("http");
const cheerio = require('cheerio');
const league_1 = require('./Objects/league');
const maps_1 = require('./Objects/maps');
const async = require('async');
const fs = require('fs');
const URI = {
    BASKETBALL_REFERENCE_HOST: 'www.basketball-reference.com',
    CBS_HOST: 'www.cbssports.com',
    MY_TEAM_INDEX: 1
};
class Connector {
    static findPlayerUrl(player, team, callback) {
        if (maps_1.BR_map[team]) {
            team = maps_1.BR_map[team];
        }
        var options = {
            "method": "GET",
            "hostname": URI.BASKETBALL_REFERENCE_HOST,
            "path": "/teams/" + team + "/2017.html"
        };
        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load(body.toString());
                var iter = $('td[csk="' + player + '"]').find('a');
                var player_href = iter.prop('href');
                if (player_href) {
                    callback(null, player_href);
                }
                else {
                    callback(new Error('Cannot find page href for player' + player));
                }
            });
            res.on('error', function (err) {
                callback(new Error('Could not find team' + team));
            });
        });
        req.end();
    }
    static findPlayerAverages(player, callback) {
        var options = {
            "method": "GET",
            "hostname": URI.BASKETBALL_REFERENCE_HOST,
            "path": player.href
        };
        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load(body.toString());
                let findHref = player.href.replace('.html', '/gamelog/2017/');
                console.log('FIND HREF ' + findHref);
                let elementRow = $('a[href="' + findHref + '"]').parent().attr('class');
                console.log(elementRow);
                elementRow = $('a[href="' + findHref + '"]').parent().parent().attr('class');
                console.log(elementRow);
                let x = $('a[href="' + findHref + '"]').parent().parent().children().length;
                console.log('CHILDREN' + x);
                let statRow = $('a[href="' + findHref + '"]').parent().parent();
                player.loadStats($, findHref);
                callback(null, player);
            });
            res.on('error', function (err) {
                callback('Failed in FETCHING MY TEAM');
            });
        });
        req.end();
    }
    static getPlayerGameStats(player, gameHref, callback) {
        var options = {
            "method": "GET",
            "hostname": URI.CBS_HOST,
            "path": gameHref
        };
        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let $ = cheerio.load(body.toString());
                let player_anchor_str = player.firstname.charAt(0) + ". " + player.lastname;
                var playerStatLine = $('.playerStatName').find('a');
                var statline = {};
                playerStatLine.each(function () {
                    if ($(this).html() == player_anchor_str) {
                        console.log('FOUND STAT LINE');
                        var $row = $(this).parent().parent();
                        var $cols = $($row).find('td');
                        console.log('COLUMNS' + $cols);
                        statline.PTS = parseInt($($cols[1]).html());
                        statline.RB = parseInt($($cols[2]).html());
                        statline.AST = parseInt($($cols[3]).html());
                        let fgs = $($cols[5]).html().split('-');
                        statline.FGM = parseInt(fgs[0]);
                        statline.FGA = parseInt(fgs[1]);
                        statline.TPM = parseInt($($cols[6]).html().split('-')[0]);
                        let fts = $($cols[7]).html().split('-');
                        statline.FTM = parseInt(fts[0]);
                        statline.FTA = parseInt(fts[1]);
                        statline.TOV = parseInt($($cols[8]).html());
                        statline.STL = parseInt($($cols[9]).html());
                        statline.BLK = parseInt($($cols[10]).html());
                        return true;
                    }
                });
                callback(null, statline);
            });
            res.on('error', function (err) {
                callback('Failed in FETCHING MY TEAM');
            });
        });
        req.end();
    }
}
class WebConnect {
    constructor() {
    }
    static getPlayerSeasonAverages(player, callback) {
        let formPlayerKey = player.lastname + "," + player.firstname;
        Connector.findPlayerUrl(formPlayerKey, player.team, (err, href) => {
            if (err) {
                callback(err);
            }
            else {
                let initPlayer = new league_1.Player(player.firstname, player.lastname, player.team);
                initPlayer.href = href;
                Connector.findPlayerAverages(initPlayer, (err, player) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    }
                    else {
                        let week_games = JSON.parse(fs.readFileSync('./json/remaining_schedule.json', 'utf8'));
                        player.wk_games = week_games[player.team].wk_remaining_games;
                        callback(null, player.toJson());
                    }
                });
            }
        });
    }
    static getPlayerWeeklyStats(player, callback) {
        let weekly_games = JSON.parse(fs.readFileSync('./json/played_schedule.json', 'utf8'));
        let player_games = weekly_games[player.team].games;
        var this_player = new league_1.Player(player.firstname, player.lastname, player.team);
        var async_game_requests = [];
        player_games.forEach(function (node) {
            let fnction = function (fn) {
                console.log('GAME LINK' + node.game_link);
                Connector.getPlayerGameStats(this_player, node.game_link, fn);
            };
            if (player.cutdate && player.adddate) {
                if (player.cutdate > node.date && player.adddate <= node.date) {
                    async_game_requests.push(fnction);
                }
            }
            else if (player.cutdate) {
                if (player.cutdate > node.date) {
                    async_game_requests.push(fnction);
                }
            }
            else if (player.adddate) {
                if (player.adddate <= node.date) {
                    async_game_requests.push(fnction);
                }
            }
            else {
                async_game_requests.push(fnction);
            }
        });
        async.parallel(async_game_requests, function (err, results) {
            console.log('LENGTH ' + results.length);
            for (var iter = 0; iter < results.length; iter++) {
                this_player.importStatLine(results[iter]);
            }
            console.log(results[0]);
            callback(this_player.toJson());
        });
    }
}
exports.WebConnect = WebConnect;
exports.init = new WebConnect();
