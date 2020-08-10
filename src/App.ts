import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { Route } from './interfaces';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: (string | number);
  public productionEnv: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.productionEnv = process.env.NODE_ENV === 'production';

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
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
