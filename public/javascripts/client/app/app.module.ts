/**
 * Created by areynolds2 on 11/20/2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { CategoryBackgroundColor  } from './directives/matchup-directives'
import { ScoreTracker } from './directives/ScoreTracker';
import { PlayerRowComponent } from './components/player-row-component'
import { MyModalComponent } from './components/modal-component';
@NgModule({
    imports:      [ BrowserModule , HttpModule , FormsModule ],
    declarations: [ AppComponent , CategoryBackgroundColor , ScoreTracker , PlayerRowComponent , MyModalComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }