import { expect } from 'chai';
import { PostController } from '../../src/controllers';

describe('PostController', () => {

    let controller: PostController;

    beforeEach(() => {
        controller = new PostController;
    });

    it('should be exits.', () => {
        expect(controller).to.be.exist;
    });

});
