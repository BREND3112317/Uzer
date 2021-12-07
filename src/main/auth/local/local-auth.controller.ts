import JWT from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

import { ControllerBase } from "../../../bases/controller.base";

import { LocalAuthService } from "./local-auth.service";

import { ResponseObject } from "../../../common/response/response.object";

import { UserModel, UserDocument } from "../../../main/api/user/user.model";

import { HttpStatus } from "../../../types/response.type";

import passport from 'passport';
import { rejects } from "assert";

export class LocalAuthController extends ControllerBase {
    protected readonly localAuthSvc = new LocalAuthService();

    public async signin(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        passport.use(this.localAuthSvc.Strategy);

        // const token = await this.localAuthSvc.authenticate(req, res, next);
        // const expiry = new Date();
        // res.cookie('token', token, {maxAge: expiry.getTime()/1000, httpOnly: true});

        const token = await this.localAuthSvc.authenticate(req, res, next).then(
            t => {
                const expiry = new Date();
                // res.cookie('token', t, {maxAge: expiry.getTime()/1000});
                res.cookie('token', t, {maxAge: expiry.getTime()/1000, httpOnly: true});
                return t;
            }
        )
        
        return this.formatResponse(token, HttpStatus.OK);
    }

    public async signup(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        const {account, username, password, phone } = req.body;
        console.log("controller signup",{account, username, password, phone });
        const user = await this.localAuthSvc.addUser(account, username, password, phone);
        // console.log("this.localAuthSvc.addUser", user['insertID']); //todo: 要讓user -> Promise<UserModel>
        const token = this.localAuthSvc.generateJWT(user);
        // const token = await this.localAuthSvc.authenticate(req, res, next).then(
        //     t => {
        //         const expiry = new Date();
        //         res.cookie('token', t, {maxAge: expiry.getTime()/1000, httpOnly: true});
        //         return t;
        //     }
        // )
        return this.formatResponse(token, HttpStatus.CREATED);
    }

    public async logout(req: Request, res: Response, next: NextFunction): Promise<ResponseObject>{
        // console.log("登出")
        res.clearCookie("token");
        return this.formatResponse("clear Token", HttpStatus.OK);
    }

    public async test(): Promise<ResponseObject> {
        return this.formatResponse("test", HttpStatus.OK);
    }

    public async session(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        console.log("headers.cookie", req.headers.cookie);
        console.log("cookies", req.cookies);

        const data = await this.verifyToken(req.headers.cookie);
        return this.formatResponse(data, HttpStatus.OK);
    }

    //@ Private
    private async verifyToken(cookie: any): Promise<{uid: number, account: string}>{
        const token = await cookie.split('token=')[1];
        // console.log(JWT.verify((token as any), "secret"));
        return new Promise((resolve, rejects) => {
            const {uid, account} = (JWT.verify((token as any), "secret") as any);
            if(!uid || !account){
                const err = new Error();
                err.message = "Token 缺少id, account";
                (err as any).status = HttpStatus.BAD_REQUEST;
            }
            resolve({uid, account});
        });
    }
}