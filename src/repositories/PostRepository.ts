import { Post, IPost, IPostDto } from '../models/Post';
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

    public create(post: IPostDto) {
        return this.model.create(post);
    }

    public find(id: string) {
        return this.model.findById(id);
    }

    public update(id: string, post: IPostDto) {
        return this.model.updateById(id, post);
    }

}
