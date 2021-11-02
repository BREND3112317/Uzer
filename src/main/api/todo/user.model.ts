import mysql from 'mysql';
import crypto from 'crypto';

import { CoreDocument } from "../../../types/model.type";
import { ModelBase } from "../../../bases/model.base";
import { db } from "../../../database/database"
import { ModelStatus } from "../../../types/response.type";
import { OkPacket, RowDataPacket } from "mysql2";
import { resolve } from 'path/posix';

const UserSchema = {
    username: {
        type: String,
        isOption: false,
    },
    account: {
        type: String,
        isOption: false,
    },
    password: {
        type: String,
        isOption: false,
    },
    phone: {
        type: String,
        isOption: true
    },
}

export interface UserDocument extends CoreDocument {
    id: number;
    username: string;
    account: string;
    password: string;
    phone: string;
}

export class UserModel extends ModelBase implements UserDocument {
    public id!: number;
    public username!: string;
    public account!: string;
    public password!: string;
    public salt!: string;
    public phone!: string;

    public createdAt!: Date;
    public updatedAt!: Date;

    constructor(data: any = {}) {
        super();
        this.id = data.uid;
        this.username = data.username;
        this.account = data.account;
        this.password = data.password;
        this.salt = data.salt;
        this.phone = data.phone;
        this.createdAt = data.created_At;
        this.updatedAt = data.updated_At;
    }

    // @Public funciton
    public async getUser(){ //: Promise<UserModel> {
        console.log("Model getUser", this.account);
        const queryString = "SELECT * FROM `User` WHERE `account`=?";
        return new Promise((resolve) => {
            db.query(
                queryString,
                this.account,
                (err, result) => {
                    if(err) {
                        throw err;
                    }

                    const row = (<RowDataPacket> result)[0];
                    console.log(row);
                    resolve(new UserModel(row))
                }
            )
        })
    }

    public getUsers(limit: number) {
        const queryString = "SELECT * FROM `User` WHERE `account`=?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                this.account,
                (err, result) => {
                    if(err) reject(err);

                    const row = (<RowDataPacket> result)[0]
                    // console.log(row);
                    resolve(row)
                    // resolve({data: result, status: ModelStatus.SUCCESS});
                    // return result;
                }
            )
        })
    }

    public async createUser(){
        const {salt, hash} = this.hashPassword(this.password);
        const queryString = "INSERT INTO `User`(`account`, `username`, `password`, `salt`) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [this.account, this.username, hash, salt],
                (err, result) => {
                    if(err){
                        reject(err);
                    }

                    resolve(result);
                }
            )
        });
    }

    // @Private Function
    public hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): { salt: string, hash: string}{
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return {salt, hash};
    }

    public verifyPassword(password: string):boolean {
        const {salt, hash} = this.hashPassword(password, this.salt)
        return hash == this.password;
    }
}