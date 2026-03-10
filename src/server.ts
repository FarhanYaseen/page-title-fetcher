import http from 'http';
import debug from 'debug';
import app from './app';

const log = debug('app:server');

function normalizePort(val: string): number | string | false {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) return val;
  if (parsed >= 0) return parsed;
  return false;
}

const port = normalizePort(process.env.PORT ?? '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  log(`Listening on ${bind}`);
  console.log(`Server listening on ${bind}`);
});
