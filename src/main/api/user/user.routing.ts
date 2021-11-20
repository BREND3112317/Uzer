import express from 'express';
import { RouteBase } from '../../../bases/route.base';
import { UserController } from './user.controller';

export class UserRoute extends RouteBase {

    protected controller!: UserController;

    constructor () {
        super();
    }

    protected initial(): void {
        this.controller = new UserController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.route('/:account')
        .get(
            // this.responseHandler(this.controller.getUser)
            this.responseHandler(this.controller.getUser)
        )
        this.router.route('/')
        .get(
            this.responseHandler(this.controller.getMySelf)
        )
        .post( 
            express.json(), 
            this.responseHandler(this.controller.addUser)
        )
        .put(
            express.json(),
            this.responseHandler(this.controller.updateUser)
        );
    }
}