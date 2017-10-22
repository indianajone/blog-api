import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import PostRepository from '../repositories/PostRepository';
import { controller, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';

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

    @httpPost('/')
    public async store(
        @request() request: Request,
        @response() response: Response
    ) {
        try {
            await this.repo.create(request.body);
            response.status(201).json({ message: 'Post has been created!' });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

    @httpGet('/:id')
    public async show(
        @request() request: Request,
        @response() response: Response
    ) {
        try {
            let data = await this.repo.find(request.params.id);
            response.json({ data });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

    @httpPut('/:id')
    public async update(
        @request() request: Request,
        @response() response: Response
    ) {
        try {
            await this.repo.update(request.params.id, request.body);
            response.status(200).json({ message: 'Post has been updated!' });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

}
