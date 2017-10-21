import * as controllers from '../controllers';
import { interfaces, TYPE } from 'inversify-express-utils';
import { Container as InversifyContainer } from 'inversify';

export default class Container {

    constructor(private _container: InversifyContainer) {}

    public load() {

        this.loadControllers();

        return this._container;
    }

    private loadControllers() {
        for (let name of Object.keys(controllers)) {
            let controller = controllers[name];
            this._container.bind<interfaces.Controller>(TYPE.Controller)
                .to(controller).whenTargetNamed(controller.TAG);
        }
    }

}
