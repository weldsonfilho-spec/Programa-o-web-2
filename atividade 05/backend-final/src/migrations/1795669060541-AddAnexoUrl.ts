import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnexoUrl1795669060541 implements MigrationInterface {
    name = 'AddAnexoUrl1795669060541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" ADD "anexoUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP COLUMN "anexoUrl"`);
    }

}
