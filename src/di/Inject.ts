import injector from './Injector';

/**
 *
 *
 * @export
 * @param {...Function[]} dependencies
 * @returns {Function}
 */
export default function Inject(...dependencies: Function[]): Function {
    return (target: Object, propertyKey?: string): void => {
        const service = injector.register(target);
        if (propertyKey) service.addDependency(injector.register(dependencies[0]).name, propertyKey);
        else for (const dependency of dependencies)
            service.addDependency(injector.register(dependency).name);
    };
}
