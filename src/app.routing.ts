import { RouteBase } from "./bases/route.base";
import { ApiRoute } from "./main/api/api.routing";

export class AppRoute extends RouteBase {

    private apiRoute = new ApiRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        this.apiRoute = new ApiRoute()
        // console.log("api.routing", this.apiRoute);
        this.router.use('/api', this.apiRoute.router);
    }
}
