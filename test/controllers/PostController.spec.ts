import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../src/bootstrap';

chai.use(chaiHttp);
const expect = chai.expect;

describe('PostController', () => {

    let client: ChaiHttp.Agent;

    before(() => {
        client = chai.request(app);
    });

    it('should fetch all posts.', (done) => {
        client.get('/posts').end((error, response) => {
            expect(response.status).to.be.equals(200);
            expect(response.body).to.have.lengthOf(0);
            done();
        });
    });

});
