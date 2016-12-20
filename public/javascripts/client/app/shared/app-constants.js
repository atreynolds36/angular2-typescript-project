"use strict";
/**
 * Created by areynolds2 on 11/23/2016.
 */
var player_1 = require('../classes/player');
var stat_categories = [
    'FG%',
    'FT%',
    '3PM',
    'PTS',
    'RBS',
    'AST',
    'STL',
    'BLK',
    'TOV'
];
//DECLARE ANDREWS TEAM
var player1 = new player_1.Player('Carmelo Anthony', 'NYK');
var player2 = new player_1.Player('Kyrie Irving', 'CLE');
var player3 = new player_1.Player('Marc Gasol', 'MEM');
var player4 = new player_1.Player('Jae Crowder', 'BOS');
var player5 = new player_1.Player('Jeremy Lin', 'NJN');
var player6 = new player_1.Player('Josh Richardson', 'MIA');
var player7 = new player_1.Player('Derrick Rose', 'NYK');
var player8 = new player_1.Player('Michael Kidd-Gilchrist', 'CHA');
//let player9 : Player = new Player('Frank Kaminsky' , 'CHA');
var player10 = new player_1.Player('Blake Griffin', 'LAC', true);
var player11 = new player_1.Player('Goran Dragic', 'MIA');
var player12 = new player_1.Player('Emmanuel Mudiay', 'DEN');
var player14 = new player_1.Player('Tyson Chandler', 'PHO');
var pete1 = new player_1.Player('Rajon Rondo', 'CHI');
var pete2 = new player_1.Player('Nicolas Batum', 'CHA');
var pete3 = new player_1.Player('Deron Williams', 'DAL');
var pete4 = new player_1.Player('Wilson Chandler', 'DEN');
var pete5 = new player_1.Player('Taj Gibson', 'CHI');
var pete6 = new player_1.Player('Danilo Gallinari', 'DEN');
var pete7 = new player_1.Player('Brook Lopez', 'NJN');
var pete8 = new player_1.Player('Jonas Valanciunas', 'TOR');
var pete9 = new player_1.Player('Darren Collison', 'SAC');
var pete10 = new player_1.Player('James Harden', 'HOU');
var pete11 = new player_1.Player('Nick Young', 'LAL');
var pete12 = new player_1.Player('Derrick Favors', 'UTA');
exports.APP_CONSTANTS = {
    stat_categories: stat_categories,
    ANDREW_TEAM: [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6, player7, player8, player10, player11, player12, player14
    ],
    OTHER_TEAM: [
        pete1, pete2, pete3, pete4, pete5, pete6, pete7, pete8, pete9, pete10, pete11, pete12
    ]
};
//# sourceMappingURL=app-constants.js.map