import Service from './Service';

/**
 *
 *
 * @class Injector
 */
class Injector {

    private services: { [index: string]: Service } = {};
    private instances: { [index: string]: Object } = {};

    /**
     *
     *
     * @param {(Function | Object)} service
     * @returns {Service}
     * @memberof Injector
     */
    public register(service: Function | Object): Service {
        const constructor = (typeof service == 'function') ? service : service.constructor;
        const name = constructor.name;
        if (!this.services[name]) this.services[name] = new Service(constructor);
        return this.services[name];
    }

    /**
     *
     *
     * @param {string} name
     * @returns {Object}
     * @memberof Injector
     */
    public get(name: string): Object { return this.instances[name] ? this.instances[name] : this.create(name); }

    /**
     *
     *
     * @param {string} name
     * @param {boolean} [recursive=false]
     * @returns {Object}
     * @memberof Injector
     */
    public create(name: string, recursive: boolean = false): Object {
        const service = this.services[name];

        // Gather constructor dependencies
        const dependencies: Object[] = [];
        for (const dependency of service.parameters)
            dependencies.push(recursive ? this.create(dependency, recursive) : this.get(dependency));

        // Create instance of the service
        const constructor: any = this.services[name].constructor;
        const instance = new constructor(...dependencies);

        // Set property dependencies of the service to the service instance
        for (const property of Object.keys(service.properties)) {
            const dependency = service.properties[property];
            Reflect.set(instance, property, recursive ? this.create(dependency, recursive) : this.get(dependency));
        }

        // Save and return the service instance
        this.instances[name] = instance;
        return this.instances[name];
    }
}

const injector = new Injector();
export default injector;
