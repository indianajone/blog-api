import Database from '../core/Database';
import { Document, Model, Schema } from 'mongoose';
import { inject, injectable } from 'inversify';

export interface IPost extends Document {
    title: string;
    body: string;
    image?: string;
    createdAt: string;

    all(): Promise<IPost[]>;
}

@injectable()
export class Post {

    public static TYPE = Symbol('Post');
    private model: Model<IPost>;

    constructor(
        @inject(Database.TYPE) private db: Database
    ) {
        this.db.connect((error, connection) => {
            if (error) {
                throw error;
            }

            this.model = connection.model('Post', new Schema({
                // tslint:disable-next-line:object-literal-sort-keys
                title: { type: String, required: true },
                // tslint:disable-next-line:object-literal-sort-keys
                body: { type: String, required: true },
                // tslint:disable-next-line:object-literal-sort-keys
                image: { type: String, required: false },
                // tslint:disable-next-line:object-literal-sort-keys
                createdAt: { type: Date, default: Date.now }
            }));
        });
    }

    public all(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
}
