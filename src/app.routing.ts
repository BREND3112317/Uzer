import express from "express";
import { RouteBase } from "./bases/route.base";
import { ApiRoute } from "./main/api/api.routing";
import { AuthRoute } from "./main/auth/auth.routing";

export class AppRoute extends RouteBase {

    private apiRoute = new ApiRoute();
    private authRoute = new AuthRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        this.apiRoute = new ApiRoute();
        this.authRoute = new AuthRoute();
        // console.log("api.routing", this.apiRoute);
        this.router.use('/api', this.apiRoute.router);
        this.router.use('/auth', this.authRoute.router);

        this.router.use('/signin', (req, res, next) => {
            res
            .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .sendFile('signin.html', {root: "./client"});
        });
        this.router.use('/signup', (req, res, next) => {
            res
            .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .sendFile('signup.html', {root: "./client"});
        })
        this.router.use('/info', (req, res, next) => {
            res
            .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .sendFile('Info.html', {root: "./client"});
        });
        // console.log(__dirname + "../client/static");
        // this.router.use('/static', express.static( __dirname + "/client/static" ));
    }
}
