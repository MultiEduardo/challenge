import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../seeds/hydrateUserTaskStarter1700775362709/user.seed";
import { Task } from "../seeds/hydrateUserTaskStarter1700775362709/task.seeds";
import { TaskAssignment } from "../seeds/hydrateUserTaskStarter1700775362709/task-assignment";

export class hydrateUserTaskStarter1700775362709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('user', ['name', 'email', 'rol'])
        .values(User)
        .execute();

        await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('task', ['title', 'description', 'estimationHours', 'dateExpiration', 'status', 'cost'])
        .values(Task)
        .execute();

        await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('task_assignment', ['taskId', 'userId'])
        .values(TaskAssignment)
        .execute();
    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
