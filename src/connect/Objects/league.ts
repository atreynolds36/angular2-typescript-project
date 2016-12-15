/**
 * Created by areynolds2 on 11/8/2016.
 */
import * as cheerio from 'cheerio';
//Basketball reference data-stat
const data_stat = {
    fg_per_g : "FGM",
    fga_per_g : "FGA",
    fg3_per_g : "TPM",
    ft_per_g : "FTM",
    fta_per_g : "FTA",
    trb_per_g : "RB",
    ast_per_g : "AST",
    stl_per_g : "STL",
    blk_per_g : "BLK",
    tov_per_g : "TOV",
    pts_per_g : "PTS"

}

export interface StatLine{
    FGA : number,
    FGM : number,
    FTA : number,
    FTM : number,
    PTS : number,
    AST : number,
    RB : number,
    TPM : number,
    BLK : number,
    STL : number
    TOV : number
}


export class Player{
    //PATH FOR HREF for player page
    public href : string;
    public firstname : string;
    public lastname : string;
    public team : string;
    public FGM : number;
    public FGA : number;
    public TPM : number;
    public FTM : number;
    public FTA : number;
    public RB : number;
    public AST : number;
    public STL : number;
    public BLK : number;
    public TOV : number;
    public PTS : number;

    //Number of remaining games this week
    public wk_games : number;

    constructor( fName : string , lName : string , team : string ){
        this.firstname = fName;
        this.lastname = lName;
        this.team = team;
        this.FGA = 0; this.FGM = 0; this.FTA = 0; this.FTM = 0; this.RB = 0;
        this.AST = 0; this.STL = 0; this.BLK = 0; this.TOV = 0; this.PTS = 0;
        this.TPM = 0;
    }

    public toJson(){
        let jsoned = {};
        let _this = this;
        Object.getOwnPropertyNames(_this).forEach((prop) => {
            const val = _this[prop];
            // don't include those
            if (prop === 'toJSON' || prop === 'constructor') {
                return;
            }
            if (typeof val === 'function') {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });
        return jsoned;
    }

    public loadStats( $ : any , href : string ){
        let statRow = $('a[href="' + href + '"]').parent().parent().find('td');
        console.log('LOAD STATS')
        console.log(statRow.length);
        let _player = this;
        statRow.each(function(i,index){
            let temp = $(this).html();
            console.log(temp);
            console.log( $(this).prop('data-stat') );
            let data_stat_prop = $(this).prop('data-stat');
            if( data_stat[data_stat_prop] ){
                console.log( 'DATA-STAT ' + data_stat[data_stat_prop] )
                let stat_prop = data_stat[data_stat_prop];
                _player[stat_prop] = $(this).html();
            }
        })
        console.log( 'POINTS + ' + this.PTS );
    }

    /*
        Import a games stat line
     */
    public importStatLine( statline : StatLine){
        for(var stat in statline){
            if( this[stat] ){
                this[stat] += statline[stat] ;
            } else {
                this[stat] = statline[stat];
            }
        }

    }
}