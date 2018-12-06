/**
 *
 *
 * @export
 * @class Service
 */
export default class Service {

    /**
     *
     *
     * @type {{ [index: string]: string }}
     * @memberof Service
     */
    public readonly properties: { [index: string]: string } = {};

    /**
     *
     *
     * @type {string[]}
     * @memberof Service
     */
    public readonly parameters: string[] = [];

    /**
     * Creates an instance of Service.
     * @param {Function} constructor
     * @memberof Service
     */
    public constructor(public readonly constructor: Function) { }

    /**
     *
     *
     * @readonly
     * @type {string}
     * @memberof Service
     */
    get name(): string { return this.constructor.name; }

    /**
     *
     *
     * @param {string} property
     * @param {string} name
     * @memberof Service
     */
    public addDependency(name: string, property?: string) {
        if (property) this.properties[property] = name;
        else this.parameters.push(name);
    }
}
