import { Hono } from "hono";
import { User } from "./entities/User";
import { authRouter } from "./routes/auth";

export interface Variables {
  user: User;
}

export function createHono(): Hono<{ Variables: Variables }> {
  return new Hono();
}

const app = createHono();

app.route("/", authRouter);

export default app;
