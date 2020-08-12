import 'dotenv/config';
import App from './App';
import { validateEnv } from './utils/validateEnv';
import { IndexRoute } from './routes/index';

validateEnv();

const app = new App([
  new IndexRoute(),
]);

app.start();
