import { RouteBase } from "../../bases/route.base";
import { LocalAuthRoute } from "./local/local-auth.routing";

export class AuthRoute extends RouteBase {
    
    private localAuthRoute = new LocalAuthRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        this.localAuthRoute = new LocalAuthRoute();
        this.router.use('/local', this.localAuthRoute.router);
    }
}