import "dotenv/config";
import "reflect-metadata";
import { MainDataSource } from "./source";
import { serve } from "@hono/node-server";
import app from "./app";

async function main() {
  await MainDataSource.initialize();

  serve(app, (info) => {
    console.log(`Listening at ${info.address}:${info.port}`);
  });
}

main();
