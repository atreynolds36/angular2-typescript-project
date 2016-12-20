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
let player6 : Player = new Player('Josh Richardson' , 'MIA');
let player7 : Player = new Player('Derrick Rose' , 'NYK');
let player8 : Player = new Player('Michael Kidd-Gilchrist' , 'CHA');
//let player9 : Player = new Player('Frank Kaminsky' , 'CHA');
let player10 : Player = new Player('Blake Griffin' , 'LAC' , true);
let player11 : Player = new Player('Goran Dragic' , 'MIA');
let player12 : Player = new Player('Emmanuel Mudiay' , 'DEN');
let player14 : Player = new Player('Tyson Chandler' , 'PHO');

let pete1 : Player = new Player('Rajon Rondo' , 'CHI');
let pete2 : Player = new Player('Nicolas Batum', 'CHA');
let pete3 : Player = new Player('Deron Williams', 'DAL');
let pete4 : Player = new Player('Wilson Chandler', 'DEN');
let pete5 : Player = new Player('Taj Gibson', 'CHI');
let pete6 : Player = new Player('Danilo Gallinari', 'DEN');
let pete7 : Player = new Player('Brook Lopez', 'NJN');
let pete8 : Player = new Player('Jonas Valanciunas', 'TOR');
let pete9 : Player = new Player('Darren Collison', 'SAC');
let pete10 : Player = new Player('James Harden', 'HOU');
let pete11 : Player = new Player('Nick Young', 'LAL');
let pete12 : Player = new Player('Derrick Favors', 'UTA');

export const APP_CONSTANTS : any = {
    stat_categories : stat_categories ,

    ANDREW_TEAM : [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6, player7,player8, player10,player11,player12, player14
    ] , /* ANDREW_TEAM : [ player1 ], */
    OTHER_TEAM : [
        pete1,pete2,pete3,pete4,pete5,pete6,pete7,pete8,pete9,pete10,pete11,pete12
    ]
};