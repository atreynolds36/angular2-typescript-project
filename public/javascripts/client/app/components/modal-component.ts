/**
 * Created by areynolds2 on 12/7/2016.
 */
import { Component, Input , Output , EventEmitter , OnInit } from '@angular/core';

import { APP_CONSTANTS } from '../shared/app-constants';
import { Player } from '../classes/Player'
import { Team } from '../classes/Team';
import { DataService } from '../services/rest-service';

@Component({
    selector : '<my-modal-component',
    templateUrl : '../templates/modal-component.html',
    providers : [ DataService ]
})

export class MyModalComponent implements OnInit{
    stat_categories = APP_CONSTANTS.stat_categories;
    analysis_run : boolean;
    team1 : Team;
    team2 : Team;
    firstname : string;
    lastname : string;
    team : string;
    inputPlayer : Player
    @Input('replacePlayer') replacementPlayer : Player;
    @Input() set teams(obj : any){
        this.team1 = obj.one;
        this.team2 = obj.two;
    }


    constructor(private ds : DataService) {
        this.analysis_run = false;
    }

    ngOnInit(){}

    runAnalysis(){
        //If analysis already ran, replace stats of last input player
        let playerToReplace : Player = this.inputPlayer ? this.inputPlayer : this.replacementPlayer;

        this.inputPlayer = new Player(this.firstname + " " + this.lastname, this.team );
        this.ds.fetchPlayerWeeklyProjection(this.inputPlayer)
            .subscribe( stats => {
                    this.analysis_run = true;
                    this.inputPlayer.loadProjectedStats(stats);
                    this.team1.swapStats( stats , playerToReplace.projected_statline );
                } ,
                error => {
                    alert('Could not find player');
                }
            )

    }

    onClose(){
        this.analysis_run = false;
        this.team1.swapStats( this.replacementPlayer.projected_statline , this.inputPlayer.projected_statline);
    }
}