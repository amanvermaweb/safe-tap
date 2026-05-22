import { users } from "./users";

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<AuthResponse> {
  // Simulate database lookup
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password"
    };
  }

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  };
}

export async function validateEmail(email: string): Promise<boolean> {
  return users.some((u) => u.email === email);
}
