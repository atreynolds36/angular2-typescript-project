/**
 * Created by areynolds2 on 11/23/2016.
 */
import { Component, Input , OnChanges , SimpleChange , Output , EventEmitter , OnInit } from '@angular/core';
import { Player } from '../classes/player';
import { Team } from '../classes/team';

import { DataService } from '../services/rest-service';

@Component({
    selector: '[myPlayer]',
    providers : [ DataService ] ,
    templateUrl : '../templates/player-row.html'
})

export class PlayerRowComponent implements OnInit , OnChanges {
    @Input('myPlayer') player : Player;
    @Input('projection') projection_generated : boolean;
    @Input('myTeam') team : Team ;

    @Output() analyze : EventEmitter<Player>;

    constructor(private dataService : DataService){
        this.analyze = new EventEmitter();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('enter onchanges');
    }

    ngOnInit() : void {
        this.dataService.fetchPlayerWeeklyStats(this.player)
            .subscribe( stats => {
                    this.player.loadWeeklyStats(stats);
                    this.team.addPlayerStatsToTotal(stats);
                } ,
                error => console.log(error)
            )
    }


}