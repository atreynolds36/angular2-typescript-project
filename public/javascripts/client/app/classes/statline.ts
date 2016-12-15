/**
 * Created by areynolds2 on 11/23/2016.
 */

export class Statline {
    fgm : number = 0;
    fga : number = 0;
    fta : number = 0;
    ftm : number = 0;
    tpm : number = 0;
    pts : number = 0;
    rbs : number = 0;
    ast : number = 0;
    blk : number = 0;
    stl : number = 0;
    tov : number = 0;
    ftpct : any = '0';
    fgpct : any = '0';

    constructor(){}

    push( stats : Statline ){
        for(let key in stats){
            if( typeof this[key] != 'function'){
                this[key] += stats[key];
            }
        }
        this.calcPercentages();
    }

    calcPercentages() : void {
        if( this.fta != 0 ){
            this.ftpct = this.ftm / this.fta; //( this.ftm / this.fta ) * 100;
        }
        if(this.fga != 0) {
            this.fgpct = this.fgm / this.fga;// ( this.fgm / this.fga ) * 100
        }
    }
}