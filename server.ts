import { createServer } from 'http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { setSocketServer } from './lib/realtime';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

// Start Next.js programmatically so Socket.IO can share the same HTTP server.
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
      credentials: true,
    },
  });

  // Make the Socket.IO instance available to services that emit realtime events.
  setSocketServer(io);

  io.on('connection', (socket) => {
    console.log(`[socket.io] connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[socket.io] disconnected: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`> SafeTap server listening at http://localhost:${port} (${dev ? 'development' : 'production'})`);
  });
});
