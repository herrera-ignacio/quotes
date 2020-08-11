import 'reflect-metadata';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { Route } from './interfaces';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: (string | number);
  public productionEnv: boolean;
  public routes: Route[];

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.productionEnv = process.env.NODE_ENV === 'production';
    this.routes = routes;
  }

  public async start() {
    try {
      await this.connectToDatabase();
      this.initializeMiddleware();
      this.initializeRoutes(this.routes);
      this.initializeErrorHandling();
    } catch (err) {
      console.error(`[ERROR] ${err.message}`)
      console.log('[APP] Retrying in 10 seconds...')
      setTimeout(async () => this.start(), 10000);
    }
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }
  
  private async connectToDatabase() {
    await createConnection();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
