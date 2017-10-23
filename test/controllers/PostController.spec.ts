import * as fs from 'fs';
import * as path from 'path';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Post, IPost } from '../../src/models/Post';
import { app, container } from '../../src/bootstrap';
import { cleanUploadedFile } from '../helpers';

chai.use(chaiHttp);
const expect = chai.expect;
const client = chai.request(app);;

describe('PostController', () => {

    let model: IPost;
    let dummyPost = {
        title: 'New Post',
        // tslint:disable-next-line:object-literal-sort-keys
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    };

    beforeEach(async () => {
        model = container.get<IPost>(Post.TYPE);
    });

    after(() => {
        model.removeAll();
    });

    it('should fetch all posts.', async () => {
        try {
            await model.create(dummyPost);
            let response = await client.get('/posts');
            expect(response.status).to.be.equals(200);
            expect(response.body.data).to.have.lengthOf(1);
            expect(response.body.data[0]).to.includes.keys([
                '_id', 'title', 'body', 'type', 'createdAt'
            ]);
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

    it('should create a post.', async () => {
        try {
            let response = await client.post('/posts').send(dummyPost)
            expect(response.status).to.be.equals(201);
            expect(response.body.data.title).to.be.equals(dummyPost.title);
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

    it('should create a post with image.', async () => {
        try {
            let imagePath = path.join(__dirname, '../mock/image.jpg');
            let response = await client.post('/posts')
                .field('title', dummyPost.title)
                .field('body', dummyPost.body)
                .attach('image', fs.readFileSync(imagePath), 'image.jpg');

            expect(response.status).to.be.equals(201);
            expect(response.body.data.image).to.be.exist;

            cleanUploadedFile(response.body.data.image);
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

    it('should fetch a post by id.', async () => {
        try {
            let newPost = await model.create(dummyPost);
            let response = await client.get(`/posts/${newPost._id}`);

            expect(response.status).to.be.equals(200);
            expect(response.body.data.title).to.be.equals(dummyPost.title);
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

    it('should update a post by given id.', async () => {
        try {
            let newPost = await model.create(dummyPost);
            let response = await client.put(`/posts/${newPost.id}`)
                .send({'title': 'Edited Post'});

            expect(response.status).to.be.equals(200);
            expect(response.body.data.title).to.be.equals('Edited Post');
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

    it('should be able to update existing post image.', async () => {
        try {
            let dummyPostWithImage = Object.assign(dummyPost, {
                image: '/uploads/dummy.jpg'
            });
            let imagePath = path.join(__dirname, '../mock/image.jpg');
            let newPost = await model.create(dummyPostWithImage);
            let response = await client.put(`/posts/${newPost._id}`)
                .field('title', 'Edited Post')
                .attach('image', fs.readFileSync(imagePath), 'image.jpg');

            expect(response.status).to.be.equals(200);
            expect(response.body.data.title).to.be.equals('Edited Post');
            expect(response.body.data.image).to.be.contains('image-');

            cleanUploadedFile(response.body.data.image);
        } catch (e) {
            expect.fail(e, null, e.message);
        }
    });

});
