'use strict'

import express from 'express';
import { dbConnection } from './mongo.js';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

// routes
import categoriesRoutes from '../src/categories/categories.routes.js';
import userRoutes from '../src/users/user.routes.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/controlsales/v1/user';
        this.categoriesPath = '/controlsales/v1/categories'

        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.categoriesPath, categoriesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;