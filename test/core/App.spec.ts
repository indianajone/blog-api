import { expect } from 'chai';
import App from '../../src/core/App';
import Container from '../../src/core/Container';
import { Container as InversifyContainer } from 'inversify';

describe('App', () => {

    it('should be create a server.', () => {
        let app = new App(new Container(new InversifyContainer));
        expect(app.create()).to.be.exist;
    });

});
