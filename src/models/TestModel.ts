/**
 *
 *
 * @export
 * @class TestModel
 */
export default class TestModel {

    /**
     *
     *
     * @returns {Promise<string>}
     * @memberof TestModel
     */
    public data(): Promise<string> { return new Promise(resolve => resolve('Hello World!')); }
}