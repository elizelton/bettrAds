import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Routes from './routes'
import { dbCreateConnection } from './database/typeOrm'
export class Server {
    app: Application;

    constructor() {
        this.app = express();
    }


    middleware() {

    }

    configuration() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Server is up');
        });
        const routes = new Routes().router;
        this.app.use(routes);
    }

    start() {
        dbCreateConnection().then((connection) => {

            this.configuration();
            this.routes();
            this.app.listen(this.app.get('port'), () => {
                console.log(`Server starting on port ${this.app.get('port')}.`);
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }
}

const server = new Server();
server.start();