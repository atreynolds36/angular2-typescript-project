/**
 * Created by areynolds2 on 11/23/2016.
 */
import { Statline } from './statline';
import { Player } from './player';

export class Team {

    public weekly_stats : Statline;
    public players : Array<Player>;
    public projection_loading : boolean;

    constructor(public name : String){
        this.weekly_stats = new Statline();
        this.players = [];
        this.projection_loading = false;
    }

    addPlayer( p : Player ){
        this.players.push(p);
    }

    addPlayerStatsToTotal(stats : Statline){
        this.weekly_stats.push(stats);
    }

    swapStats( newStats : Statline , oldStats : Statline ){
        this.weekly_stats.swap(newStats , oldStats );
    }
}