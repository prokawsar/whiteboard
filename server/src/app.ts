import express from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';
import middleware from './middleware/system';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(middleware.logger);

// all routes here
routes(app);

// app.use(middleware.noRouteHandler)

export default app;
