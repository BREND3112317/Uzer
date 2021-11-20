import JWT from "jsonwebtoken";

import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from '../../../common/response/response.object';
import { ControllerBase } from '../../../bases/controller.base';
import { HttpStatus, ModelStatus } from '../../../types/response.type';
import { UserModel } from './user.model';

export class UserController extends ControllerBase {
    public async test(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        return this.formatResponse("test", HttpStatus.OK);
    }

    public async updateUser(req: Request): Promise<ResponseObject> {
        // todo _id => uid
        const {uid, account} = await this.verifyToken(req.headers.cookie);
        
        // console.log("test", req.params);

        const { username, password, phone } = req.body; // post: req.body
        console.log("controller updateUser req.body", { account, username, password, phone });
        var user: UserModel = new UserModel({ account });

        const data = await user.getUser().then(
            u => {
                if(username)(u as any).username = username;
                if(password)(u as any).password = password;
                if(phone)(u as any).phone = phone;
                console.log("await getUser then", u);
                return new UserModel(u) ;
            }
        ).catch(
            err => {
                throw err;
            }
        );

        console.log("controller updateUser", data);

        data.updateUser();

        return this.formatResponse(data, HttpStatus.OK);
        // return this.formatResponse(account, HttpStatus.OK);
    }

    public async getMySelf(req: Request, res: Response, next: NextFunction) {
        const token = await req.headers.cookie?.split('token=')[1];
        console.log(JWT.verify((token as any), "secret"));

        const account = (JWT.verify((token as any), "secret") as any).account;
        const user = new UserModel({ account });

        const data = await user.getUser().then(
            u => {
                return u;
            }
        ).catch(
            err => {
                throw err;
            }
        );

        // console.log("Controller getUser", data)
        return this.formatResponse(data, HttpStatus.OK);
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        const { account } = req.params;
        const user = new UserModel({ account });

        const { data, status } = await user.getUser().then(
            u => {
                return new ResponseObject({data: u, status: HttpStatus.OK});
            }
        ).catch(
            err => {
                return  new ResponseObject({data: err, status: HttpStatus.INTERNAL_ERROR});
            }
        );

        // console.log("Controller getUser", data)
        return this.formatResponse(data, status);
    }

    public async addUser(req: Request): Promise<ResponseObject> {
        console.log(req.body);
        const { username, account, password, phone } = req.body;

        const user = new UserModel({ username, account, password, phone });
        const { data, status } = await user.createUser().then(
            u => {
                return new ResponseObject({data: u, status: HttpStatus.OK});
            }
        ).catch(
            err => {
                return  new ResponseObject({data: err, status: HttpStatus.INTERNAL_ERROR});
            }
        );

        console.log("controller addUser", data);
        
        return this.formatResponse(data, status);
    }

    //@ Private
    private async verifyToken(cookie: any): Promise<{uid: number, account: string}>{
        const token = await cookie.split('token=')[1];
        // console.log(JWT.verify((token as any), "secret"));
        return new Promise((resolve, reject) => {
            const {uid, account} = (JWT.verify((token as any), "secret") as any);
            if(!uid || !account){
                const err = new Error();
                err.message = "Token 缺少id, account";
                (err as any).status = HttpStatus.BAD_REQUEST;
                reject(err);
            }
            resolve({uid, account});
        });
    }
}