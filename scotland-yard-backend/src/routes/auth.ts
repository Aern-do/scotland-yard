import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { MainDataSource } from "../source";
import { User } from "../entities/User";
import { hash } from "@node-rs/argon2";
import { authMiddleware, signToken } from "../middleware/auth";
import { createHono } from "../app";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const userRepo = MainDataSource.getRepository(User);

export const authRouter = createHono();

authRouter.post(
  "/register",
  zValidator("json", registerSchema, (result, c) => {
    if (!result.success) return c.json({ errors: result.error }, 400);
  }),
  async (c) => {
    const { username, password } = c.req.valid("json");

    const existing = await userRepo.findOne({
      where: [{ username }],
    });
    if (existing) return c.json({ message: "User already exists" }, 400);

    const user = userRepo.create({
      username,
      passwordHash: await hash(password),
    });
    await userRepo.save(user);

    return c.json({ message: "User registered successfully" }, 201);
  },
);

authRouter.post(
  "/login",
  zValidator("json", loginSchema, (result, c) => {
    if (!result.success) return c.json({ errors: result.error }, 400);
  }),
  async (c) => {
    const { username, password } = c.req.valid("json");

    const user = await userRepo.findOne({ where: { username } });
    if (!user) return c.json({ message: "Invalid credentials" }, 401);

    const valid = await user.validatePassword(password);
    if (!valid) return c.json({ message: "Invalid credentials" }, 401);

    const token = signToken({ id: user.id, username: user.username });
    return c.json({ message: "Login successful", token });
  },
);

authRouter.get("/me", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json({ message: "Authenticated user info", user });
});
