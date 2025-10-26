import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Game } from "../entities/Game";
import { authMiddleware } from "../middleware/auth";
import { randomUUID } from "crypto";
import { MainDataSource } from "../source";
import { createHono } from "../app";

export const gameRouter = createHono();
gameRouter.use("*", authMiddleware);

const gameRepo = MainDataSource.getRepository(Game);

const createGameSchema = z.object({
  name: z
    .string()
    .min(3, "Game name must be at least 3 characters long")
    .max(50, "Game name must be 50 characters or fewer"),
  isPublic: z.boolean(),
});

const joinGameSchema = z.object({
  gameId: z.number().int().positive(),
  inviteCode: z.string().optional(),
});

gameRouter.get("/public", async (c) => {
  const games = await gameRepo.find({
    where: { isPublic: true },
    order: { createdAt: "DESC" },
  });
  return c.json(games);
});

gameRouter.post(
  "/create",
  zValidator("json", createGameSchema, (result, c) => {
    if (!result.success) return c.json({ errors: result.error }, 400);
  }),
  async (c) => {
    const { name, isPublic } = c.req.valid("json");
    const user = c.get("user");

    const game = gameRepo.create({
      name,
      isPublic,
      inviteCode: isPublic ? null : randomUUID().slice(0, 6).toUpperCase(),
      host: user,
    });

    await gameRepo.save(game);

    return c.json(
      {
        message: "Game created successfully",
        game,
      },
      201,
    );
  },
);

gameRouter.post(
  "/join",
  zValidator("json", joinGameSchema, (result, c) => {
    if (!result.success) return c.json({ errors: result.error }, 400);
  }),
  async (c) => {
    const { gameId, inviteCode } = c.req.valid("json");

    const game = await gameRepo.findOne({ where: { id: gameId } });
    if (!game) return c.json({ message: "Game not found" }, 404);

    if (!game.isPublic && game.inviteCode !== inviteCode)
      return c.json({ message: "Invalid game code" }, 400);

    return c.json({ message: "Joined successfully", game });
  },
);
