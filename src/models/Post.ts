import schema from '../schema/Post';
import Database from '../core/Database';
import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';

export interface IPostDto {
    title: string;
    body: string;
    image?: string;
    createdAt?: string;
}

export interface IPost extends Document, IPostDto {
    all(): Promise<IPost[]>;
    create(post: IPostDto): Promise<IPost>;
    findById(id: string): Promise<IPost>;
    updateById(id: string, post: IPostDto): Promise<IPost>;
    removeAll(): Promise<void>;
}

@injectable()
export class Post {

    public static TYPE = Symbol('Post');
    private model: Model<IPost>;

    constructor(@inject(Database.TYPE) private database: Database) {
        if (!this.model) {
            this.database.connect();
            this.model = this.database.db.model('Post', schema);
        }
    }

    public all(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            this.model.find({}, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    public create(post: IPostDto) {
        return new Promise((resolve, reject) => {
            this.model.create(post).then(resolve, reject);
        });
    }

    public findById(id: string) {
        return new Promise((resolve, reject) => {
            this.model.findById(id).then(resolve, reject);
        });
    }

    public updateById(id: string, post: IPostDto) {
        return new Promise((resolve, reject) => {
            this.model.findById(id).then(old => {
                Object.assign(old, post).save(
                    (error, newPost) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(newPost);
                    }
                );
            }, reject);
        });
    }

    public removeAll() {
        return new Promise((resolve, reject) => {
            this.model.remove({}, error => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
}
