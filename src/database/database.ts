import mysql, {createConnection} from 'mysql2';
import * as dotenv from "dotenv";
dotenv.config();

export const DATABASE_CONFIG = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB_NAME
}

// export class Database {
//     protected config: mysql.ConnectionConfig = {
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         host: process.env.DB_HOST,
//         port: 3306,
//         database: process.env.DB_NAME
//     };

//     protected conn!: mysql.Connection;

//     constructor (){
//     }

//     public connect(): void {
//         this.conn = mysql.createConnection(this.config);
//         this.conn.connect(
//             (err) => {
//                 if(err) {
//                     console.log("!!! Cannot connect !!! Error:");
//                     throw err;
//                 }else {
//                     console.log("Connection established.");
//                 }
//             }
//         );
//     }
// }

// TODO 解決這裡的process偷跑
export const db = mysql.createConnection({
    user: "server",
    password: "brend",
    host: "192.168.1.119",
    port: 3306,
    database: "Version1"
});