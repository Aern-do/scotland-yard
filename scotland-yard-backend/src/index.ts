import "dotenv/config";
import "reflect-metadata";
import { MainDataSource } from "./source";
import app from "./app";
import { serve } from "@hono/node-server";

async function main() {
  await MainDataSource.initialize();

  serve(app, (info) => {
    console.log(`Listening at ${info.address}:${info.port}`);
  });
}

main();
