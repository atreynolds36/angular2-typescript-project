"use strict";
const express = require("express");
const Main_1 = require("../connect/Main");
var RouterModule;
(function (RouterModule) {
    class IndexRouter {
        constructor() {
        }
        static initRouter() {
            let router = express.Router();
            let myWebConnect = new Main_1.WebConnect();
            router.get('/', (req, res, next) => {
                res.render("index");
            });
            router.get('/angular', (req, res, next) => {
                res.render("angular");
            });
            router.get('/connect/getPlayerStats', (req, res, next) => {
                Main_1.WebConnect.getPlayerSeasonAverages({
                    team: req.query.team,
                    firstname: req.query.fName,
                    lastname: req.query.lName
                }, function (err, players) {
                    if (err) {
                        res.status(400).send({ msg: err.message });
                    }
                    else {
                        res.json(players);
                    }
                });
            });
            router.get('/connect/getPlayerWeeklyStats', (req, res, next) => {
                let playerObj = {
                    team: req.query.team,
                    firstname: req.query.fName,
                    lastname: req.query.lName
                };
                if (req.query.cutdate) {
                    playerObj.cutdate = req.query.cutdate;
                }
                if (req.query.adddate) {
                    playerObj.adddate = req.query.adddate;
                }
                Main_1.WebConnect.getPlayerWeeklyStats(playerObj, function (players) {
                    res.json(players);
                });
            });
            return router;
        }
    }
    RouterModule.IndexRouter = IndexRouter;
})(RouterModule || (RouterModule = {}));
module.exports = RouterModule;
