import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Cache the connection across hot reloads in development to avoid
// opening new connections on every file change.
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  var __mongoose_cached__: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

if (!global.__mongoose_cached__) {
  // @ts-ignore
  global.__mongoose_cached__ = { conn: null, promise: null };
}

async function connect() {
  if (global.__mongoose_cached__!.conn) {
    return global.__mongoose_cached__!.conn;
  }

  if (!global.__mongoose_cached__!.promise) {
    global.__mongoose_cached__!.promise = mongoose
      .connect(mongoUri!, {
        // useUnifiedTopology and useNewUrlParser are default in Mongoose 6+
      })
      .then((m) => m);
  }

  global.__mongoose_cached__!.conn = await global.__mongoose_cached__!.promise;
  return global.__mongoose_cached__!.conn;
}

export default connect;
