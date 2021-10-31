import mysql from 'mysql';
import crypto from 'crypto';

import { CoreDocument } from "../../../types/model.type";
import { ModelBase } from "../../../bases/model.base";
import { db } from "../../../database/database"
import { OkPacket, RowDataPacket } from "mysql2";

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
    public phone!: string;

    public createdAt!: Date;
    public updatedAt!: Date;

    constructor(data: any = {}) {
        super();
        this.username = data.username;
        this.account = data.account;
        this.password = data.password;
        this.phone = data.phone;
    }

    // @Public funciton
    public async getUser() {
        const queryString = "SELECT * FROM `User` WHERE `account`=?";
        db.query(
            queryString,
            ["admin"],
            function(err, results, fields) {
                
                console.log("Err", err);
                console.log("Result", results);
                return results;
            }
        )
        console.log("getUser", this.username);
    }

    public getUsers(limit: number) {

    }

    public async createUser(){
        const {salt, hash} = this.hashPassword(this.password);
        const queryString = "INSERT INTO `User`(`account`, `username`, `password`, `salt`) VALUES (?, ?, ?, ?)";
        db.query(
            queryString,
            [this.account, this.username, hash, salt],
            function(err, results, fields) {
                
                console.log("Err", err);
                console.log("Result", results);
                return results;
            }
        )
        // console.log("createUser", this.username, this.account, hash, salt);
    }

    // @Private Function
    private hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): { salt: string, hash: string}{
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

        return {salt, hash};
    }
}