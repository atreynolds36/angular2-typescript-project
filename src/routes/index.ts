/*
var router = require('express').Router();
var connect = require('../connect/NBA')

router.get('/' , (req,res) => {
    res.json({ status : "ok"})
});


module.exports = router;
    */
/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";
import { WebConnect } from "../connect/Main";

module RouterModule{
    export class IndexRouter {
        public router : express.Router;

        public static initRouter() : express.Router {
            let router : express.Router = express.Router();
            let myWebConnect : WebConnect = new WebConnect();

            router.get('/' , (req: express.Request, res: express.Response, next: express.NextFunction) => {
                //render page
                res.render("index");
            });

            router.get('/angular' , (req: express.Request, res: express.Response, next: express.NextFunction) => {
                //render page
                res.render("angular");
            });


            router.get('/connect/getPlayerStats', (req: express.Request, res: express.Response, next: express.NextFunction) => {
                WebConnect.getPlayerSeasonAverages({
                    team : req.query.team ,
                    firstname : req.query.fName ,
                    lastname : req.query.lName
                } , function(err , players) {
                    if(err){
                        res.status(400).send( { msg : err.message } );
                    } else{
                        res.json(players);
                    }
                })
            });

            router.get('/connect/getPlayerWeeklyStats' , (req: express.Request, res: express.Response, next: express.NextFunction) => {
                let playerObj : any = {
                    team : req.query.team ,
                    firstname : req.query.fName ,
                    lastname : req.query.lName
                }
                if( req.query.cutdate ){
                    playerObj.cutdate = req.query.cutdate;
                }
                if(req.query.adddate ){
                    playerObj.adddate = req.query.adddate;
                }
                WebConnect.getPlayerWeeklyStats( playerObj , function(players) {
                    res.json(players);
                })
            });

            return router;

        }

        constructor(){}
    }
}

export = RouterModule;
//var IndexRouter = IndexRouter.initRouter();
//export = IndexRouter.router;