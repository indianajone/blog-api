import { injectable } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

@injectable()
@controller('/posts')
export default class PostController {

    public static TAG = 'PostController';

    @httpGet('/')
    public index() {
      return [];
    }

}
