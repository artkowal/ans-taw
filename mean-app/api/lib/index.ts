import App from './app';
import IndexController from './controllers/index.controller';
import PostController from './controllers/post.controller';
import logRequests from './middlewares/logRequests.middleware';

const app: App = new App([
    new PostController(),
    new IndexController(),
]);

app.listen();