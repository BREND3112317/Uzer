import mysql, {Connection, createConnection} from 'mysql';
// import { DATABASE_CONFIG } from '../database/database';

export abstract class ModelBase {

    private conn!: Connection;

    // constructor(conn = createConnection(DATABASE_CONFIG)) {
    //     this.conn = conn;
    // }

}