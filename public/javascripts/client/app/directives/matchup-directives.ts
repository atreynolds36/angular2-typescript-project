/**
 * Created by areynolds2 on 12/3/2016.
 */
import {Directive, ElementRef, Renderer, Input , HostListener } from '@angular/core';

@Directive({
    selector: '[teamStatLeader]',
})
export class CategoryBackgroundColor {
    @Input('teamStatLeader') data : any;
    constructor(public el: ElementRef, public renderer: Renderer) {
        // el.nativeElement.style.backgroundColor = 'yellow';
        //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }

    @Input() set teamStatLeader(data : any){
        if( data.myStat > data.othStat ){
            this.el.nativeElement.style.backgroundColor = '#dff0d8';
        } else{
            this.el.nativeElement.style.backgroundColor = '#f5f5f5';
        }
    }
}