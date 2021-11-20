import express from "express";
import { RouteBase } from "./bases/route.base";
import { ApiRoute } from "./main/api/api.routing";
import { AuthRoute } from "./main/auth/auth.routing";
import { ViewRoute } from "./main/view/view.routing";

export class AppRoute extends RouteBase {

    private apiRoute = new ApiRoute();
    private authRoute = new AuthRoute();
    private viewRoute = new ViewRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        // this.apiRoute = new ApiRoute();
        // this.authRoute = new AuthRoute();
        // console.log("api.routing", this.apiRoute);
        this.router.use('/api', this.apiRoute.router);
        this.router.use('/auth', this.authRoute.router);
        this.router.use('/view', this.viewRoute.router);

        
        // console.log(__dirname + "../client/static");
        // this.router.use('/static', express.static( __dirname + "/client/static" ));
    }
}
