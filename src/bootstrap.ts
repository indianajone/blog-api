import 'reflect-metadata';
import App from './core/App';
import Container from './core/Container';
import { Container as InversifyContainer } from 'inversify';

let container = new Container(new InversifyContainer);
let app = (new App(container)).create();
let server = app.listen(3000);
console.log('Server started on port 3000 :)');

export { app, container, server };
