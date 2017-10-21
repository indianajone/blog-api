import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export default class Database {

    public static TYPE = Symbol('Database');

    public db: mongoose.Connection;
    public url = 'mongodb://localhost:27017/myblog';

    constructor() {
        (mongoose as any).Promise = require('bluebird');
    }

    public connect(cb: (error: Error, db: mongoose.Connection) => void) {
        if (this.isConnected()) {
            mongoose.connect(this.url, { useMongoClient: true }).then(
                () => {
                    this.db = mongoose.connection;
                    cb(null, mongoose.connection);
                },
                (error) => console.error.bind(console, 'connection error:')
            );
        }
    }

    private isConnected() {
        return mongoose.connection.readyState !== 1;
    }
}
