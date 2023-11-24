import {MigrationInterface, QueryRunner} from "typeorm";

export class loadInitial1700764758789 implements MigrationInterface {
    name = 'loadInitial1700764758789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "chpl"."task_status_enum" AS ENUM('Activa', 'Terminada')`);
        await queryRunner.query(`CREATE TABLE "chpl"."task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "estimationHours" double precision NOT NULL, "dateExpiration" TIMESTAMP NOT NULL DEFAULT now(), "status" "chpl"."task_status_enum" NOT NULL DEFAULT 'Activa', "cost" numeric(10,2) NOT NULL DEFAULT '100', "dateCreation" TIMESTAMP NOT NULL DEFAULT now(), "dateModification" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "chpl"."user_rol_enum" AS ENUM('Administrador', 'Miembro')`);
        await queryRunner.query(`CREATE TABLE "chpl"."user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying(100) NOT NULL, "rol" "chpl"."user_rol_enum" NOT NULL DEFAULT 'Miembro', "dateCreation" TIMESTAMP NOT NULL DEFAULT now(), "dateModification" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chpl"."task_assignment" ("user_id" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_f824225a835e8a11a1a73e2a165" PRIMARY KEY ("user_id", "task_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_579d61b631951292a9f51f6727" ON "chpl"."task_assignment" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f8544ee8cfca009e58e0e52d8" ON "chpl"."task_assignment" ("task_id") `);
        await queryRunner.query(`ALTER TABLE "chpl"."task_assignment" ADD CONSTRAINT "FK_5f8544ee8cfca009e58e0e52d89" FOREIGN KEY ("task_id") REFERENCES "chpl"."task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chpl"."task_assignment" ADD CONSTRAINT "FK_579d61b631951292a9f51f67272" FOREIGN KEY ("user_id") REFERENCES "chpl"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chpl"."task_assignment" DROP CONSTRAINT "FK_579d61b631951292a9f51f67272"`);
        await queryRunner.query(`ALTER TABLE "chpl"."task_assignment" DROP CONSTRAINT "FK_5f8544ee8cfca009e58e0e52d89"`);
        await queryRunner.query(`DROP INDEX "chpl"."IDX_5f8544ee8cfca009e58e0e52d8"`);
        await queryRunner.query(`DROP INDEX "chpl"."IDX_579d61b631951292a9f51f6727"`);
        await queryRunner.query(`DROP TABLE "chpl"."task_assignment"`);
        await queryRunner.query(`DROP TABLE "chpl"."user"`);
        await queryRunner.query(`DROP TYPE "chpl"."user_rol_enum"`);
        await queryRunner.query(`DROP TABLE "chpl"."task"`);
        await queryRunner.query(`DROP TYPE "chpl"."task_status_enum"`);
    }

}
