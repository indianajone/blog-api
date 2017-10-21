import { expect } from 'chai';
import MockPostModel from '../mock/MockPost';
import { PostRepository } from '../../src/repositories';

describe('PostRepository', () => {

    let repo: PostRepository;

    beforeEach(() => {
        repo = new PostRepository(new MockPostModel() as any);
    });

    it('should be exists.', () => {
        expect(repo).to.be.exist;
    });

    it('should return all posts.', async () => {
        expect(await repo.all()).to.have.lengthOf(0);
    });

});
