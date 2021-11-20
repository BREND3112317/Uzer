import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import { AppRoute } from './app.routing';

export class App {
    private app = express();
    private route = new AppRoute();

    constructor () {
        this.setEnvironment();
        this.setHelmet();
        this.setCors();
        this.setPassport();
        this.registerRoute();
    }

    // @Public Methods
    public bootstrap(): void {
        this.app.listen(process.env.PORT, () => console.log(`API server is running at port ${process.env.PORT}`));
    }

    public setException(handler: ErrorRequestHandler): void {
        this.app.use(handler);
    }

    // @Private Methods
    private setHelmet(): void {
        this.app.use(helmet());
    }

    private setCors(): void {
        this.app.use(cors({
            origin: 'https://codebackend.brlin.org'
        }));
    }

    private setEnvironment(): void {
        dotenv.config({
            path: path.resolve(
                __dirname,
                `./environments/${process.env.NODE_ENV}.env`
            )
        });
        console.log(`./environments/${process.env.NODE_ENV}.env`, process.env);
    }

    private setPassport(): void {
        passport.initialize();
    }

    private registerRoute(): void {
        // console.log("app", this.route);
        this.app.use('/', this.route.router);
    }
}