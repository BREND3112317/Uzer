import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from 'src/common/response/response.object';
import { ControllerBase } from '../../../bases/controller.base';
import { HttpStatus } from '../../../types/response.type';
import { UserModel } from '../todo/user.model';

export class UserController extends ControllerBase {
    public async getUser(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        // console.log("test2");
        return this.formatResponse({data: "getUser"}, HttpStatus.OK);
    }

    public async addUser(req: Request): Promise<ResponseObject> {
        console.log(req.body);
        const { username, account, password, phone } = req.body;

        const user = new UserModel({ username, account, password, phone });
        
        return this.formatResponse({
            data: { username, account, password, phone },
            createUser: user.createUser(),
            // getUser: user.getUser()
        }, HttpStatus.OK);
    }
}