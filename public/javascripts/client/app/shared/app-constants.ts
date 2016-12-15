/**
 * Created by areynolds2 on 11/23/2016.
 */
import { Player } from '../classes/player';

let stat_categories : Array<String> = [
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
let player1 : Player = new Player('Carmelo Anthony' , 'NYK');
let player2 : Player = new Player('Kyrie Irving' , 'CLE');
let player3 : Player = new Player('Marc Gasol' , 'MEM');
let player4 : Player = new Player('Jae Crowder', 'BOS');
let player5 : Player = new Player('Jeremy Lin' , 'NJN');
player5.setAddedDate('20161215');
let player6 : Player = new Player('Josh Richardson' , 'MIA');
let player7 : Player = new Player('Derrick Rose' , 'NYK');
let player8 : Player = new Player('Michael Kidd-Gilchrist' , 'CHA');
let player9 : Player = new Player('Frank Kaminsky' , 'CHA');
let player10 : Player = new Player('Blake Griffin' , 'LAC');
let player11 : Player = new Player('Goran Dragic' , 'MIA');
let player12 : Player = new Player('Sean Kilpatrick' , 'NJN');
player12.setCutDate('20161214');
let player13 : Player = new Player('Dario Saric' , 'PHI');
player13.setCutDate('20161214');
let player14 : Player = new Player('Tyson Chandler' , 'PHO');
player14.setAddedDate('20161215');

let pete1 : Player = new Player('Damian Lillard' , 'POR');
let pete2 : Player = new Player('Lou Williams', 'LAL');
let pete3 : Player = new Player('Joe Johnson', 'UTA');
let pete4 : Player = new Player('Lebron James', 'CLE');
let pete5 : Player = new Player('Trevor Booker', 'NJN');
let pete6 : Player = new Player('Kristaps Porzingis', 'NYK');
let pete7 : Player = new Player('Al Jefferson', 'IND');
let pete8 : Player = new Player('Clint Capella', 'HOU');
let pete9 : Player = new Player('Markief Morris', 'WAS');
let pete10 : Player = new Player('Evan Turner', 'POR');
let pete11 : Player = new Player('Jrue Holiday', 'NOR');
let pete12 : Player = new Player('Greg Monroe', 'MIL');

export const APP_CONSTANTS : any = {
    stat_categories : stat_categories ,

    ANDREW_TEAM : [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6, player7,player8,player9,player10,player11,player12,player13, player14
    ] , /* ANDREW_TEAM : [ player1 ], */
    OTHER_TEAM : [
        pete1,pete2,pete3,pete4,pete5,pete6,pete7,pete8,pete9,pete10,pete11,pete12
    ]
};