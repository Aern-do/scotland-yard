import { MigrationInterface, QueryRunner } from "typeorm";

export class Game1761493997715 implements MigrationInterface {
    name = 'Game1761493997715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isPublic" boolean NOT NULL DEFAULT (1), "inviteCode" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "hostId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isPublic" boolean NOT NULL DEFAULT (1), "inviteCode" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "hostId" integer, CONSTRAINT "FK_4084468356497d7dcedd09502ff" FOREIGN KEY ("hostId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_game"("id", "name", "isPublic", "inviteCode", "createdAt", "updatedAt", "hostId") SELECT "id", "name", "isPublic", "inviteCode", "createdAt", "updatedAt", "hostId" FROM "game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`ALTER TABLE "temporary_game" RENAME TO "game"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" RENAME TO "temporary_game"`);
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isPublic" boolean NOT NULL DEFAULT (1), "inviteCode" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "hostId" integer)`);
        await queryRunner.query(`INSERT INTO "game"("id", "name", "isPublic", "inviteCode", "createdAt", "updatedAt", "hostId") SELECT "id", "name", "isPublic", "inviteCode", "createdAt", "updatedAt", "hostId" FROM "temporary_game"`);
        await queryRunner.query(`DROP TABLE "temporary_game"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
