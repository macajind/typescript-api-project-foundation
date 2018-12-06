import Inject from '../di/Inject';
import TestModel from '../models/TestModel';
import Route from '../routes/Route';
import Controller from './Controller';

/**
 *
 *
 * @export
 * @class TestController
 * @extends {Controller}
 */
export default class TestController extends Controller {

    @Inject(TestModel)
    private testModel: TestModel;

    /**
     *
     *
     * @memberof TestController
     */
    @Route('/')
    public async index() {
        const data = await this.testModel.data();
        this.response.json(data);
    }
}
