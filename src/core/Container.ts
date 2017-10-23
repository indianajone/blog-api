import Database from './Database';
import * as models from '../models';
import * as controllers from '../controllers';
import * as repositories from '../repositories';
import { interfaces, TYPE } from 'inversify-express-utils';
import { 
    Container as InversifyContainer,
    interfaces as InversifyInterface 
} from 'inversify';

export default class Container {

    private _services = { ...repositories, ...models, Database };

    constructor(private _container: InversifyContainer) {}

    public get<T>(id: InversifyInterface.ServiceIdentifier<T>) {
        return this._container.get<T>(id);
    }

    public load() {
        this.loadControllers();
        this.loadServices();

        return this._container;
    }

    private loadControllers() {
        for (let name of Object.keys(controllers)) {
            let controller = controllers[name];
            this._container.bind<interfaces.Controller>(TYPE.Controller)
                .to(controller).whenTargetNamed(controller.TAG);
        }
    }

    private loadServices() {
        for (let name of Object.keys(this._services)) {
            let service = this._services[name];
            this._container.bind<{}>(service.TYPE)
                .to(service);
        }
    }

}
