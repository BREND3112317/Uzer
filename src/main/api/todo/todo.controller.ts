import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from 'src/common/response/response.object';
import { ControllerBase } from '../../../bases/controller.base';
import { HttpStatus } from '../../../types/response.type';

export class TodoController extends ControllerBase {
    public async getTodos(req: Request, res: Response, next: NextFunction): Promise<ResponseObject> {
        return this.formatResponse([], HttpStatus.OK);
    }
}