import express from 'express';

import { RouteBase } from '../../../bases/route.base';

import { LocalAuthController } from './local-auth.controller';

export class LocalAuthRoute extends RouteBase {

    protected controller!: LocalAuthController;

    constructor () {
        super();
    }

    protected initial(): void {
        this.controller = new LocalAuthController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.route('/session')
        .get(
            this.responseHandler(this.controller.session)
        )

        this.router.route('/signup')
        .post(
            express.json(),
            this.responseHandler(this.controller.signup)
        )

        this.router.route('/signin')
        .post(
            express.json(),
            this.responseHandler(this.controller.signin)
        )
        
        this.router.route('/logout')
        .get(
            this.responseHandler(this.controller.logout)
        )
    }
}