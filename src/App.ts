import * as express from 'express';
import { Route } from './interfaces';

class App {
  public app: express.Application;
  public port: (string | number);
  public productionEnv: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.productionEnv = process.env.NODE_ENV === 'production';
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }
}

export default App;
