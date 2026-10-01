import type { User } from "./types";

// Demo credentials only. Production authentication belongs on the server.
export const DEMO_ACCOUNTS = [
  {
    nim: "202020",
    name: "Arlan Satya",
    role: "student",
    password: "campus123",
  },
  {
    nim: "101010",
    name: "Admin Fasilitas",
    role: "admin",
    password: "admin123",
  },
] satisfies (User & { password: string })[];

export const AUTHORS: Record<string, string> = {
  "202020": "Arlan Satya",
  "2021002": "Bima Aditya",
  "2021003": "Dewi Lestari",
};
