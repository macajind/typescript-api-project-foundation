import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import express from 'express';
import expressValidator from 'express-validator';

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

// Error Handler providing full stack output
if (app.get('env') === 'development') app.use(errorHandler());

export default app;
