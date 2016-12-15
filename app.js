"use strict";
const express = require("express");
const path = require("path");
const index_1 = require("./routes/index");
class Server {
    constructor() {
        this.app = express();
        this.config();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use(express.static(path.join(__dirname, "public")));
        this.routes();
    }
    routes() {
        let indexRouter = index_1.IndexRouter.initRouter();
        this.app.use(indexRouter);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
