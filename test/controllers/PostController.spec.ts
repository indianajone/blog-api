import { expect } from 'chai';
import MockPostRepository from '../mock/MockPostRepository';
import { PostController } from '../../src/controllers';

describe('PostController', () => {

    let controller: PostController;

    beforeEach(() => {
        controller = new PostController(new MockPostRepository);
    });

    it('should be exits.', () => {
        expect(controller).to.be.exist;
    });

    it('should fetch all posts.', () => {
        expect(controller.index()).to.have.lengthOf(0);
    });

});
