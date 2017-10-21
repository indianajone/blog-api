import { injectable, inject } from 'inversify';
import PostRepository from '../repositories/PostRepository';
import { controller, httpGet } from 'inversify-express-utils';

@injectable()
@controller('/posts')
export default class PostController {

    public static TAG = 'PostController';

    constructor(
        @inject(PostRepository.TYPE) private repo: PostRepository
    ) { }

    @httpGet('/')
    public async index() {
        try {
            let result = await this.repo.all();
            return result;
        } catch (e) {
            return { error: e.message };
        }
    }
}
