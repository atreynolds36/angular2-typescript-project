/**
 * Created by areynolds2 on 11/23/2016.
 */
import { Statline } from './statline';

export class Player {

    public weekly_stats : Statline ;
    public cut : boolean;
    public added : boolean;
    public cutdate : string;
    public addeddate : string;
    public stats_loaded : boolean;
    public projection_loaded : boolean;
    public projected_statline : Statline;
    public injured : boolean;

    constructor(public name : string , public team : string ,
                public inj ?: boolean ) {
        this.weekly_stats = new Statline();
        this.cut = false;
        this.added = false;
        this.injured = inj;
        this.stats_loaded = false;
        this.projection_loaded = false;
        this.projected_statline = new Statline();
    }

    setCutDate(date : string ){
        this.cut = true;
        this.cutdate = date;
    }

    setAddedDate(date : string){
        this.added = true;
        this.addeddate = date;
    }

    loadWeeklyStats( stats : Statline ){
        for(let key in stats){
            if( typeof this.weekly_stats[key] != 'function'){
                this.weekly_stats[key] += stats[key];
            }
        }
        this.weekly_stats.calcPercentages();
        this.stats_loaded = true;
    }

    loadProjectedStats( stats : Statline ){
        for(let key in stats){
            if( typeof this.projected_statline[key] != 'function'){
                this.projected_statline[key] += stats[key];
            }
        }
        this.projected_statline.calcPercentages();
        this.projection_loaded = true;
    }

}