import { RouteBase } from '../../../bases/route.base';
import { TodoController } from './todo.controller';

export class TodoRoute extends RouteBase {

    protected controller!: TodoController;

    constructor () {
        super();
    }

    protected initial(): void {
        this.controller = new TodoController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.get('/', (req, res, next) => {
            // this.controller.getTodos(req, res, next);
            this.responseHandler(this.controller.getTodos);
        });
    }
}