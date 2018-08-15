import { createServer } from 'http';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

const port = process.env.PORT || 8080
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet())

// router
app.get('/', (_, res) => res.send('hello world'))

const server = createServer(app)

server.listen(port)

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
});

server.on('error', (err: any) => {
  if (err.syscall !== 'listen') throw err;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw err;
  }
});