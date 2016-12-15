/**
 * Created by areynolds2 on 11/20/2016.
 */
import { Component, OnInit , EventEmitter , HostListener } from '@angular/core';
import { APP_CONSTANTS } from './shared/app-constants'
import { Team } from './classes/team';
import { Player } from './classes/player';
import { DataService } from './services/rest-service';
import { CategoryBackgroundColor } from './directives/matchup-directives';

@Component({
    selector: 'my-app',
    //template: '<h1>Hello Angular!</h1>'
    templateUrl : 'templates/main.html',
    providers : [ DataService ]
})
export class AppComponent implements OnInit {
    title = 'Matchup Page';
    stat_categories = APP_CONSTANTS.stat_categories;

    public team1 : Team;
    public team2 : Team;

    public projection_generated : boolean;
    public projectionEvent : EventEmitter<void>;

    public replacementPlayer : Player;

    constructor(private dataService : DataService){
        this.team1 = new Team('Andrews Team');
        this.team2 = new Team('Opponents Team');
        this.initTeam( this.team1 , APP_CONSTANTS.ANDREW_TEAM );
        this.initTeam( this.team2 , APP_CONSTANTS.OTHER_TEAM );
        this.projection_generated = false;
        this.projectionEvent = new EventEmitter<void>();
    }

    ngOnInit() : void { }

    public initTeam( team : Team , players : Array<Player> ) : void{
        for( let player of players ){
            team.addPlayer( player );
        }
    }

    generateTeamProjection(){
        //If projection already generated - do not do it again
        if(this.projection_generated){
            return;
        }
        this.projectionEvent.emit();

        this.projection_generated = true;

        this.team1.projection_loading = true;
        this.team2.projection_loading = true;
        for(let player of this.team1.players){
            this.getPlayerWeeklyProjection( player , this.team1 );
        }

        for(let player of this.team2.players){
            this.getPlayerWeeklyProjection( player , this.team2 );
        }
    }

    getPlayerWeeklyProjection(player : Player , team : Team ){
        if( ! player.cut && ! player.injured ){
            this.dataService.fetchPlayerWeeklyProjection(player)
                .subscribe( stats => {
                        player.loadProjectedStats(stats);
                        team.addPlayerStatsToTotal(stats);
                    } ,
                    error => console.log(error)
                )
        }
    }

    @HostListener('replace_player_event') replacePlayer(p : Player) {
        this.replacementPlayer = p;
    }

    setReplacementPlayer(p : Player ){
        this.replacementPlayer = p;
    }
}