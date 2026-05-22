// Simple JWT-like token management
// In production, use a real JWT library like jsonwebtoken

const SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function jwtSign<T extends object>(payload: T): Promise<string> {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = Buffer.from(
    `${header}.${body}.${SECRET}`
  ).toString("base64");

  return `${header}.${body}.${signature}`;
}

export async function jwtVerify<T>(token: string): Promise<T> {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const [, body] = parts;
  const decoded = JSON.parse(
    Buffer.from(body, "base64").toString("utf-8")
  );

  return decoded as T;
}
