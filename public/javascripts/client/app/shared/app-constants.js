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
player5.setAddedDate('20161215');
var player6 = new player_1.Player('Josh Richardson', 'MIA');
var player7 = new player_1.Player('Derrick Rose', 'NYK');
var player8 = new player_1.Player('Michael Kidd-Gilchrist', 'CHA');
var player9 = new player_1.Player('Frank Kaminsky', 'CHA');
var player10 = new player_1.Player('Blake Griffin', 'LAC');
var player11 = new player_1.Player('Goran Dragic', 'MIA');
var player12 = new player_1.Player('Sean Kilpatrick', 'NJN');
player12.setCutDate('20161214');
var player13 = new player_1.Player('Dario Saric', 'PHI');
player13.setCutDate('20161214');
var player14 = new player_1.Player('Tyson Chandler', 'PHO');
player14.setAddedDate('20161215');
var pete1 = new player_1.Player('Damian Lillard', 'POR');
var pete2 = new player_1.Player('Lou Williams', 'LAL');
var pete3 = new player_1.Player('Joe Johnson', 'UTA');
var pete4 = new player_1.Player('Lebron James', 'CLE');
var pete5 = new player_1.Player('Trevor Booker', 'NJN');
var pete6 = new player_1.Player('Kristaps Porzingis', 'NYK');
var pete7 = new player_1.Player('Al Jefferson', 'IND');
var pete8 = new player_1.Player('Clint Capella', 'HOU');
var pete9 = new player_1.Player('Markief Morris', 'WAS');
var pete10 = new player_1.Player('Evan Turner', 'POR');
var pete11 = new player_1.Player('Jrue Holiday', 'NOR');
var pete12 = new player_1.Player('Greg Monroe', 'MIL');
exports.APP_CONSTANTS = {
    stat_categories: stat_categories,
    ANDREW_TEAM: [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6, player7, player8, player9, player10, player11, player12, player13, player14
    ],
    OTHER_TEAM: [
        pete1, pete2, pete3, pete4, pete5, pete6, pete7, pete8, pete9, pete10, pete11, pete12
    ]
};
//# sourceMappingURL=app-constants.js.map