import { RouteBase } from "../../bases/route.base";

export class StaticRoute extends RouteBase {
    
    constructor() {
        super();
    }

    protected registerRoute(): void {
        // this.router.use('/local', this.localAuthRoute.router);
        // app.use('/static', this.router.static('public'));
    }
}