/**
 * Created by areynolds2 on 12/7/2016.
 */
import { Component, Input , Output , EventEmitter , OnInit } from '@angular/core';

import { APP_CONSTANTS } from '../shared/app-constants';
import { Player } from '../classes/Player'
import { Team } from '../classes/Team';

@Component({
    selector : '<my-modal-component',
    templateUrl : '../templates/modal-component.html'
})

export class MyModalComponent implements OnInit{
    stat_categories = APP_CONSTANTS.stat_categories;
    user_entry_fname : String;
    user_entry_lname : String;
    user_entry_team : String;
    analysis_run : boolean;
    team1 : Team;
    team2 : Team;
    @Input('replacePlayer') replacement_player : Player;
    @Input() set teams(obj : any){
        this.team1 = obj.one;
        this.team2 = obj.two;
    }


    constructor() {
        this.analysis_run = false;
    }

    ngOnInit(){}

    runAnalysis(){
        this.analysis_run = true;

    }
}