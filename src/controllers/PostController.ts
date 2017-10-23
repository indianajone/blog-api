import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import PostRepository from '../repositories/PostRepository';
import * as multer from 'multer';
import { controller, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

const upload = multer({ storage });

@injectable()
@controller('/posts')
export default class PostController {

    public static TAG = 'PostController';

    constructor(
        @inject(PostRepository.TYPE) private repo: PostRepository
    ) { }

    @httpGet('/')
    public async index(
        @request() request: Request,
        @response() response: Response
    ) {
        try {
            let posts = await this.repo.all();
            response.json({ data: posts });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

    @httpPost('/', upload.single('image'))
    public async store(
        @request() request: Request,
        @response() response: Response
        ) {
        try {
            if (request.file) {
                request.body.type = 'image';
                request.body.image = request.file.path;
            }
            let post = await this.repo.create(request.body);
            response.status(201).json({ data: post });
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
            let post = await this.repo.find(request.params.id);
            response.json({ data: post });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

    @httpPut('/:id', upload.single('image'))
    public async update(
        @request() request: Request,
        @response() response: Response
        ) {
        try {
            if (request.file) {
                request.body.type = 'image';
                request.body.image = request.file.path;
            }
            let post = await this.repo.update(request.params.id, request.body);
            response.json({ data: post });
        } catch (e) {
            response.status(400).json({ error: e.message });
        }
    }

}
