import mysql, { Connection } from 'mysql';
import { isBuffer } from 'util';
import { DATABASE_OPTIONS } from './database.option';

// export const DATABASE_CONFIG = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     host: process.env.DB_HOST,
//     port: 3306,
//     database: process.env.DB_NAME
// }

export class Database {
    protected config: mysql.ConnectionConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        host: process.env.DB_HOST,
        port: 3306,
        database: process.env.DB_NAME
    };

    protected conn!: mysql.Connection;

    constructor (){
    }

    public connect(): void {
        this.conn = mysql.createConnection(this.config);
        this.conn.connect(
            (err) => {
                if(err) {
                    console.log("!!! Cannot connect !!! Error:");
                    throw err;
                }else {
                    console.log("Connection established.");
                }
            }
        );
    }
}