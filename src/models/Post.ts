import { injectable } from 'inversify';

export interface IPost {
    title: string;
    body: string;
    image?: string;
    createdAt: string;

    all(): Promise<IPost[]>;
}

@injectable()
export class Post {

    public static TYPE = Symbol('Post');

    public all(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
}
