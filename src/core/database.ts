import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenvFlow from 'dotenv-flow';

/**
 * @descriptionEN Configuring dotenv-flow to load environment variables
 * @description_ES Configuración de dotenv-flow para cargar variables de entorno
 */

dotenvFlow.config({
    node_env: process.env.NODE_ENV,
    path: __dirname + '/../../environments'
  });
  

/**
 * @descriptionEN Database connection
 * @description_ES Conexion con la base de datos
 */
const Database: TypeOrmModuleOptions = {
    timezone: "GMT+6",
    type: process.env.DATA_BASE_TYPE,
    host: process.env.HOST_DATA_BASE,
    port: process.env.PORT_DATA_BASE as any,
    username: process.env.USER_DATA_BASE,
    password: process.env.KEY_DATA_BASE,
    database: process.env.DATA_BASE_NAME,
    autoLoadEntities: true,
    keepConnectionAlive: true,
    logging: false,
    schema: process.env.SCHEMA_DATABASE,
    entities: [ __dirname + '/../database/entities/**/*.entity{.ts,.js}'],
    migrations: [ __dirname + '/../database/migrations/*.ts'],
    cli: {
        migrationsDir: __dirname + '/../database/migrations'
      }
}

export default Database;