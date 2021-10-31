import { RouteBase } from "../../bases/route.base";
import { TodoRoute } from "./todo/todo.routing";

export class ApiRoute extends RouteBase {
    
    private todoRoute = new TodoRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        this.todoRoute = new TodoRoute()
        // console.log("api.routing", this.todoRoute);
        this.router.use('/todo', this.todoRoute.router);
    }
}