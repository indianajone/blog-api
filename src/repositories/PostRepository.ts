import { Post, IPost } from '../models/Post';
import { inject, injectable } from 'inversify';

@injectable()
export default class PostRepository {

    public static TYPE = Symbol('PostRepository');

    constructor(
        @inject(Post.TYPE) private model: IPost
    ) {}

    public all() {
        return this.model.all();
    }

}
