import 'reflect-metadata';
import App from './core/App';
import Container from './core/Container';
import { Container as InversifyContainer } from 'inversify';

let container = new Container(new InversifyContainer);
let app = (new App(container)).create();
app.listen(3000);
console.log('Server started on port 3000 :)');
