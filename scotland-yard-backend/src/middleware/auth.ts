import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

const SECRET = "1111";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");
  if (!authHeader?.startsWith("Bearer "))
    return c.json({ message: "Unauthorized" }, 401);

  const token = authHeader.split(" ")[1]!;

  try {
    const payload = jwt.verify(token, SECRET);
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ message: "Invalid or expired token" }, 401);
  }
};

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};
