import { EventEmitter } from 'events';
import { Server as IOServer } from 'socket.io';

// Lightweight realtime abstraction. In production attach a Socket.IO server
// during app boot (see lib/socket.ts). Other server code can call `emitEvent`.

const emitter = new EventEmitter();

let io: IOServer | null = null;

export function setSocketServer(server: IOServer) {
  io = server;
}

export function emitEvent(name: string, payload: unknown) {
  // Emit locally for in-process listeners (useful for tests)
  emitter.emit(name, payload);

  // If a Socket.IO server is attached, broadcast
  if (io) {
    io.emit(name, payload);
  }
}

export function onEvent(name: string, handler: (payload: unknown) => void) {
  emitter.on(name, handler);
}

export default { emitEvent, onEvent, setSocketServer };
