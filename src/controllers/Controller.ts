import { Request, RequestHandler, Response } from 'express';
import { ErrorFormatter, validationResult } from 'express-validator/check';
import injector from '../di/Injector';

/**
 *
 *
 * @export
 * @abstract
 * @class Controller
 */
export default abstract class Controller {

    private _request: Request;
    private _response: Response;

    /**
     *
     *
     * @readonly
     * @type {Request}
     * @memberof Controller
     */
    get request(): Request { return this._request; }

    /**
     *
     *
     * @readonly
     * @type {Response}
     * @memberof Controller
     */
    get response(): Response { return this._response; }

    /**
     *
     *
     * @param {Request} request
     * @returns {Controller}
     * @memberof Controller
     */
    public setRequest(request: Request): Controller {
        this._request = request;
        return this;
    }

    /**
     *
     *
     * @param {Response} response
     * @returns {Controller}
     * @memberof Controller
     */
    public setResponse(response: Response): Controller {
        this._response = response;
        return this;
    }

    /**
     *
     *
     * @param {*} error
     * @returns {never}
     * @memberof Controller
     */
    public error(error: any): void { throw error; }

    private static errorFormatter: ErrorFormatter =
        ({ location, msg, param, value }) => `${location}[${param}]: ${msg.replace('%value%', value)}`;

    /**
     *
     *
     * @static
     * @param {string} name
     * @param {string} action
     * @returns {RequestHandler}
     * @memberof Controller
     */
    public static createRoute(name: string, action: string): RequestHandler {
        return (request, response) => {
            try {
                validationResult(request).throw();
                const controller: any = injector.create(name);
                if (controller instanceof Controller) controller.setRequest(request).setResponse(response);
                controller[action](request, response);
            } catch (errors) {
                if (errors['formatWith'] && errors['array'])
                    errors = errors.formatWith(this.errorFormatter).array();
                response.status(400).send(errors);
            }
        };
    }
}
