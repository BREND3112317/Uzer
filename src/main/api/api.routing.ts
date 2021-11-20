import JWTGuard from 'express-jwt';
import { RouteBase } from "../../bases/route.base";
import { TodoRoute } from "./todo/todo.routing";
import { UserRoute } from "./user/user.routing";
import { HttpStatus } from '../../types/response.type';

export class ApiRoute extends RouteBase {
    
    private todoRoute = new TodoRoute();
    private userRoute = new UserRoute();

    constructor() {
        super();
    }

    protected registerRoute(): void {
        this.todoRoute = new TodoRoute()
        this.userRoute = new UserRoute()
        // console.log("api.routing", this.todoRoute);

        this.router.use(
            JWTGuard({
                secret: "secret",
                userProperty: 'payload',
                algorithms: ['HS256'],
                getToken: (req) => {
                    const err = new Error();
                    console.log("headers.cookie", req.headers.cookie);
                    console.log("cookies", req.cookies);
                    console.log("query", req.query);
                    if(req.headers.cookie){
                        return req.headers.cookie.split("token=")[1];
                    }
                    // else if( req.query && req.query.token){
                    //     return req.query.token;
                    // }
                    // else if( req.cookies.token) {
                    //     return req.cookies.token;
                    // }

                    return null;
                    err.message = "沒有找到Token";
                    (err as any).status = HttpStatus.UNAUTHORIZED;
                    throw err;
                }
            })
        );

        this.router.use('/todo', this.todoRoute.router);
        this.router.use('/user', this.userRoute.router);
    }
}