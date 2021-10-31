import express from 'express';
import { RouteBase } from '../../../bases/route.base';
import { UserController } from './user.controller';

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
            this.responseHandler(this.controller.getUser)
        )
        .post( 
            express.json(), 
            this.responseHandler(this.controller.addUser)
        );
    }
}