import JWT from "jsonwebtoken";

import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from '../../../common/response/response.object';
import { ControllerBase } from '../../../bases/controller.base';
import { HttpStatus, ModelStatus } from '../../../types/response.type';
import { UserModel } from '../todo/user.model';

export class UserController extends ControllerBase {
    public async test(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        return this.formatResponse("test", HttpStatus.OK);
    }

    public async NormalLogin(req: Request): Promise<ResponseObject> {
        const { account } = req.params; // post: req.body
        const password = "brend";
        var user: UserModel = new UserModel({ account });

        await user.getUser().then(
            (data) => {
                console.log(data)
                user = new UserModel(data);
                console.log(user.verifyPassword(password));
                if(user.verifyPassword(password)){
                    
                }
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        );

        // get_user.hashPassword(password, get_user.salt);

        return this.formatResponse("Normal Login", HttpStatus.OK);
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
}