'use strict'

import express from 'express'

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
       
    }

    async conectarDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;