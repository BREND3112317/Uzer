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
    }
}
