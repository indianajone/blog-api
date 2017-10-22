import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export default class Database {

    public static TYPE = Symbol('Database');

    public db: mongoose.Connection;
    public url = process.env.MONGO_URL || 'mongodb://localhost:27017/myblog';

    constructor() {
        this.connect();
    }

    public connect() {
        (mongoose as any).Promise = require('bluebird');
        mongoose.connect(this.url, { useMongoClient: true });

        if (!this.db) {
            this.db = mongoose.connection;
            this.db.on('error', console.error.bind(console, 'MongoConnectionError:'));
        }
    }
}
