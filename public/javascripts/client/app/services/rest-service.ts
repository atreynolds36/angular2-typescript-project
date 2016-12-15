/**
 * Created by areynolds2 on 11/23/2016.
 */
import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { Statline } from '../classes/statline'
import { Headers, Http , Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    constructor( private http : Http ) {}

    fetchPlayerWeeklyStats( p : Player ) : Observable<Statline> {
        return this.http.get('/connect/getPlayerWeeklyStats?' + this.formURLString(p) )
            .map(this.successHandleWeeklyStats)
            .catch(this.handleError)

    }
    private successHandleWeeklyStats(res : Response ){
        let body = res.json();
        console.log(body);
        let temp_statline : Statline = new Statline();
        temp_statline.pts = body.PTS;
        temp_statline.rbs = body.RB;
        temp_statline.ast = body.AST;
        temp_statline.fgm = body.FGM;
        temp_statline.fga = body.FGA;
        temp_statline.tpm = body.TPM;
        temp_statline.fta = body.FTA;
        temp_statline.ftm = body.FTM;
        temp_statline.tov = body.TOV;
        temp_statline.stl = body.STL;
        temp_statline.blk = body.BLK;

        return temp_statline;
    }
    fetchPlayerWeeklyProjection(p : Player) : Observable<Statline> {
        return this.http.get('/connect/getPlayerStats?' + this.formURLString(p) )
            .map(this.successHandleWeeklyProjection)
            .catch(this.handleError);
    }

    private successHandleWeeklyProjection(res : Response){
        let body = res.json();
        let weekly_games = body.wk_games;
        let temp_statline : Statline = new Statline();
        temp_statline.pts = body.PTS * weekly_games;
        temp_statline.rbs = body.RB * weekly_games;
        temp_statline.ast = body.AST * weekly_games;
        temp_statline.fgm = body.FGM * weekly_games;
        temp_statline.fga = body.FGA * weekly_games;
        temp_statline.tpm = body.TPM * weekly_games;
        temp_statline.fta = body.FTA * weekly_games;
        temp_statline.ftm = body.FTM * weekly_games;
        temp_statline.tov = body.TOV * weekly_games;
        temp_statline.stl = body.STL * weekly_games;
        temp_statline.blk = body.BLK * weekly_games;

        return temp_statline;
    }

    private formURLString( p : Player ) : String {
        let player_names = p.name.split(' ');
        let generic_url_param = 'fName=' + player_names[0] + '&lName=' + player_names[1] + '&team=' + p.team;
        if(p.cut){
            generic_url_param += "&cutdate=" + p.cutdate;
        }
        if(p.added){
            generic_url_param += "&adddate=" + p.addeddate;
        }
        return generic_url_param;
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}