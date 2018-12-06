import { ValidationChain } from 'express-validator/check';
import Controller from '../controllers/Controller';
import injector from '../di/Injector';
import Method from './Method';
import router from './Router';

/**
 *
 *
 * @export
 * @param {string} route
 * @param {ValidationChain[]} [validators=[]]
 * @param {(Method | Method[])} [methods=Method.GET]
 * @returns {Function}
 */
export default function Route(route: string, validators: ValidationChain[] = [], methods: Method | Method[] = Method.GET): Function {
    return (target: Object, propertyKey: string): void => {
        const controllerRoute = Controller.createRoute(injector.register(target).name, propertyKey);
        if (!(methods instanceof Array)) methods = [methods];
        for (const method of methods) router[method](route, validators, controllerRoute);
    };
}
