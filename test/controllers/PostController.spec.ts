import { expect } from 'chai';
import MockPostRepository from '../mock/MockPostRepository';
import { PostController } from '../../src/controllers';

describe('PostController', () => {

    let controller: PostController;

    beforeEach(() => {
        controller = new PostController(new MockPostRepository() as any);
    });

    it('should be exits.', () => {
        expect(controller).to.be.exist;
    });

    it('should fetch all posts.', async () => {
        let result = await controller.index();
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.includes.keys([
            '_id', 'title', 'body', 'type', 'createdAt'
        ]);
    });

});
