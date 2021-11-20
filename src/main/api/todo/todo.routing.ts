import express from 'express';
import { RouteBase } from '../../../bases/route.base';
import { UserController } from '../user/user.controller';

export class TodoRoute extends RouteBase {

    protected controller!: UserController;

    constructor () {
        super();
    }

    protected initial(): void {
        this.controller = new UserController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.route('/')
        .get(
            this.responseHandler(this.controller.test)
        )
        this.router.route('/')
        .post( 
            express.json(), 
            this.responseHandler(this.controller.addUser)
        );
    }
}