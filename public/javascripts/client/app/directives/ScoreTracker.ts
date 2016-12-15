/**
 * Created by areynolds2 on 12/5/2016.
 */
import { Component , Input , DoCheck } from '@angular/core';

@Component({
    selector: 'my-score-tracker',
    template: `<h1>{{score}}</h1>`
})
export class ScoreTracker implements DoCheck {
    score = 'Score : 0-0';
    detect_changes_andrew : number = 0;
    detect_changes_oppo : number = 0;
    categories_for = 0;
    categories_against = 0;
    categories_tie = 0;

    @Input('team1Stats') andrew_statline : any;
    @Input('team2Stats') oppo_statline : any;

    /*
        On change to statline - update scoreboard
     */
    ngDoCheck(){

        if( this.detect_changes_andrew != this.andrew_statline.fga ||
            this.detect_changes_oppo != this.oppo_statline.fga ){
            this.detect_changes_andrew = this.andrew_statline.fga;
            this.detect_changes_oppo = this.oppo_statline.fga;

            this.initScoreboard();

            this.compareStatLines( this.andrew_statline.fgpct , this.oppo_statline.fgpct);
            this.compareStatLines( this.andrew_statline.ftpct , this.oppo_statline.ftpct);
            this.compareStatLines( this.andrew_statline.tpm , this.oppo_statline.tpm );
            this.compareStatLines( this.andrew_statline.pts , this.oppo_statline.pts );
            this.compareStatLines( this.andrew_statline.rbs , this.oppo_statline.rbs );
            this.compareStatLines( this.andrew_statline.ast , this.oppo_statline.ast );
            this.compareStatLines( this.andrew_statline.stl , this.oppo_statline.stl );
            this.compareStatLines( this.andrew_statline.blk , this.oppo_statline.blk );
            this.compareStatLines( this.oppo_statline.tov , this.andrew_statline.tov );

            this.score+= this.categories_for + "-" + this.categories_against;
            if(this.categories_tie){
                this.score+= this.categories_tie;
            }
        }

    }

    initScoreboard(){
        this.score = 'Score : ';
        this.categories_for = 0;
        this.categories_against = 0;
        this.categories_tie = 0;
    }

    compareStatLines(stat1 : number , stat2 : number ){
        if(stat1 > stat2 ){
            this.categories_for++;
        } else if( stat1 < stat2 ){
            this.categories_against++;
        } else{
            this.categories_tie++ ;
        }
    }
}