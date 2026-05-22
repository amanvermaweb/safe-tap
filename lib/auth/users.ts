
export const users = [
  {
    id: "1",
    email: "admin@safetap.com",
    password: "admin123",
    role: "admin",
    name: "Admin User"
  },
  {
    id: "2",
    email: "teacher@safetap.com",
    password: "teacher123",
    role: "teacher",
    name: "Teacher User"
  },
  {
    id: "3",
    email: "parent@safetap.com",
    password: "parent123",
    role: "parent",
    name: "Parent User",
  }
];

export type User = (typeof users)[0];
export type UserRole = User["role"];
