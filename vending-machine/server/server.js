const jsonServer = require('json-server');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '..', 'src'),
});

const port = process.env.API_PORT || 4000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(path.join(__dirname, '..', 'src'));
  console.log(`JSON Server is running, port ${port}`);
});
