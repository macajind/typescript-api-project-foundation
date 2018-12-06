import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import express from 'express';
import expressValidator from 'express-validator';
import injector from './di/Injector';
import router from './routes/Router';
import glob = require('glob');

// Load environment variables from .env file, where API keys and passwords are configured
const result = dotenv.config({ path: '.env' });
if (result.error) throw result.error;

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());                              // Compresses requests
app.use(bodyParser.json());                          // Support application/json type data
app.use(bodyParser.urlencoded({ extended: false })); // Support application/x-www-form-urlencoded post data
app.use(expressValidator());

// Load application controllers
const controllers = glob.sync(`${process.env.MAPPING}*`, { cwd: 'src/', nocase: true });
for (const controller of controllers)
    import(`./${controller}`.replace('.ts', ''))
        .then((controller) => injector.register(controller['default']));

// Set application routing rules
app.use('/', router);

// Error Handler providing full stack output
if (app.get('env') === 'development') app.use(errorHandler());

export default app;
