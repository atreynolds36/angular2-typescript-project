/// <reference path="_all.d.ts" />
"use strict";

import * as express from "express";
import * as path from "path";

import { IndexRouter } from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        this.config();
    }

    private config(){
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");

        //noinspection TypeScriptValidateTypes
        this.app.use(express.static(path.join(__dirname, "public")));
        //add router
        this.routes();
    }

    private routes(){
        //get router
        //let router: express.Router = express.Router();
        //let indexRouter : IndexRouter = new IndexRouter();
        let indexRouter : express.Router = IndexRouter.initRouter() ;

        //create routes
        //var appIndexRouter: IndexRouter = new IndexRouter();

        //home page
        //router.get("/", appIndexRouter.index.bind(appIndexRouter.index));

        //use router middleware


        //noinspection TypeScriptValidateTypes
        this.app.use( indexRouter );
    }
}

var server = Server.bootstrap();
export = server.app;