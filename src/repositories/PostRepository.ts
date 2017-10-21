import { injectable } from 'inversify';

@injectable()
export default class PostRepository {

    public static TYPE = Symbol('PostRepository');

    public all() {
        return [];
    }

}
