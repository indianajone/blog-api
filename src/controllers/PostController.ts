import { injectable } from 'inversify';
import { controller } from 'inversify-express-utils';

@injectable()
@controller('/posts')
export default class PostController {

    public static TAG = 'PostController';

}
