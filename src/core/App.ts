import Container from './Container';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

export default class App {

    public container: Container;
    public server: InversifyExpressServer;

    constructor(container: Container) {
        this.container = container;
        this.server = new InversifyExpressServer(this.container.load());
        this.server.setConfig(this.config)
    }

    public create() {
        return this.server.build();
    }

    private config = (app: express.Application) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }

}
