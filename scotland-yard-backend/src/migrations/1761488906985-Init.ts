import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761488906985 implements MigrationInterface {
  name = "Init1761488906985";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "passwordHash" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
