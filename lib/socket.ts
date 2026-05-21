import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { setSocketServer } from './realtime';

// Helper to attach Socket.IO to an existing HTTP server. Next.js App Router
// can call this from a custom server or from a long-running route that
// exposes the underlying server instance. This file only provides a simple
// initializer — wiring into your platform may vary.

let io: IOServer | null = null;

export function initSocket(server: HTTPServer) {
  if (io) return io;

  io = new IOServer(server, {
    cors: { origin: '*' },
  });

  // Optional: basic connection logging
  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('Socket connected', socket.id);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Socket disconnected', socket.id);
    });
  });

  setSocketServer(io);
  return io;
}

export function getSocket() {
  return io;
}
