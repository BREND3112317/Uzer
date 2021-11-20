import JWT from "jsonwebtoken";

import passport from 'passport';
import { Strategy, VerifyFunction } from "passport-local";

import { UserModel, UserDocument } from "../../../main/api/user/user.model";

import { LocalAuthDocument } from "./local-auth.model";

import { HttpStatus } from "../../../types/response.type";
import { resolve } from "path/posix";
import { Request, Response, NextFunction } from "express";

export class LocalAuthService {
    private readonly userModel = new UserModel()

    public async addUser(account:string, username:string, password:string, phone:string) {
        const user = new UserModel({account, username, password, phone});
        const isUsed = await user.createUser()
        .then(userData => {
            return userData;
        }).catch(err => {
            const error = new Error(err);
            (error as any).status = HttpStatus.CONFLICT;
            throw error;
        })
        console.log(isUsed);
        return isUsed;
    }

    // public generateJWT(user: LocalAuthDocument): string{
    public generateJWT(user: UserDocument): string{
        if(!user){// todo: 這件事不應該再這裡
            const err = new Error();
            err.message = "登入資料異常（缺少）";
            (err as any).status = HttpStatus.UNAUTHORIZED;
            throw err;
        }
        console.log("generateJWT", user);
        const expiry = new Date();
        expiry.setDate(expiry.getDate()+7);
        return JWT.sign({
            uid: user.uid,
            account: user.account,
            exp: expiry.getTime()/1000
        }, ("secret")) //todo process.env.JWT_KEY
    }

    public get Strategy() {
        return new Strategy(
            {
                session: false,
                usernameField: "account",
            },
            this.verifyUserFlow()
        );
    }

    // public authenticate(...args: any[]): Promise<string> {
    public authenticate(req: Request, res: Response, next: NextFunction): Promise<string> {
        
        return new Promise((resolve, reject) => {
            
            passport.authenticate('local', (err: Error, user: UserDocument) => {
                console.log("authenticate User", user);
                if(err){
                    return reject(err);
                }
                const token = this.generateJWT(user);
                resolve(token);
            })(req, res, next);
        })
    }

    // @Private Function
    private verifyUserFlow(): VerifyFunction {
        return (account: string, password: string, done) => {
            const user: UserModel = new UserModel({account});
            user.getUser()
            .then(user_data => {
                console.log("verifyUserFlow", user_data);
                const error = new Error();
                if(!user_data) {
                    error.message = "查無此用戶";
                    (error as any).status = HttpStatus.NOT_FOUND;
                    return done(error);
                }
                if(!this.verifyPassword(new UserModel(user_data), password)){
                    error.message = "密碼錯誤";
                    (error as any).status = HttpStatus.FORBIDDEN;
                    return done(error);
                }
                return done(null, user_data)
            })
            .catch((err: Error) => done(err));
        }
    }

    private verifyPassword(user: UserModel, password: string): boolean {
        return user.verifyPassword(password);
    }
 }