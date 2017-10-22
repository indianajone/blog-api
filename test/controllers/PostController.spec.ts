import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Post, IPost } from '../../src/models/Post';
import { app, container } from '../../src/bootstrap';

chai.use(chaiHttp);
const expect = chai.expect;

describe('PostController', () => {

    let client: ChaiHttp.Agent;
    let model: IPost;
    let dummyPost = {
        title: 'New Post',
        // tslint:disable-next-line:object-literal-sort-keys
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    };

    before(async () => {
        client = chai.request(app);
        model = container.get<IPost>(Post.TYPE);

        await model.removeAll();
    });

    it('should fetch all posts.', async () => {
        await model.create(dummyPost);
        client.get('/posts')
            .end((error, response) => {
                expect(response.status).to.be.equals(200);
                expect(response.body).to.have.lengthOf(1);
                expect(response.body[0]).to.includes.keys([
                    '_id', 'title', 'body', 'type', 'createdAt'
                ]);
            }
        );
    });

    it('should create a post.', (done) => {
        client.post('/posts')
            .send(dummyPost)
            .end((error, response) => {
                expect(response.status).to.be.equals(201);
                done();
            }
        );
    });

    it('should fetch a post by id.', async () => {
        let newPost = await model.create(dummyPost);

        client.get(`/posts/${newPost._id}`)
            .end((error, response) => {
                expect(response.status).to.be.equals(200);
                expect(response.body.data.title).to.be.equals(dummyPost.title);
            }
        );
    });

    it('should update a post by given id.', async () => {
        let newPost = await model.create(dummyPost);

        client.put(`/posts/${newPost._id}`)
            .send({ title: 'Edited Post'})
            .end((error, response) => {
                expect(response.status).to.be.equals(200);
                expect(response.body.data.title).to.be.equals('Edited Post');
            }
        );
    });

});
