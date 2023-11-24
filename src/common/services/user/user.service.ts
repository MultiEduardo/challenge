import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewAccountRegistrationDto } from "src/common/dtos";
import { User } from "src/database/entities/user.entity";
import { Like, Repository } from "typeorm";
import { UserFilterDto } from '../../dtos/user/filter/user-filter.dto';
import { TaskStatus } from "src/common/enum/task-status.enum";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * @description_EN Method to create a new user in the database.
     * @description_ES Método para crear un nuevo usuario en la base de datos.
     * @param newUser
     * @since 0.0.1
     * 
     * @author Bryan Vazquez
     */
    public createUser = (newUser: NewAccountRegistrationDto): Promise<User> => this.userRepository.save(newUser);

    /**
     * @description_En Search for a user by email address.
     * @description_ES Buscar un usuario por su dirección de correo electrónico.
     * @param email 
     * @since 0.0.1
     * 
     * @author Bryan Vazquez
     */
    public async findUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    /**
     * @description_EN Search for users along with details of completed tasks, filtered according to specific criteria.
     * @description_ES Busca usuarios junto con detalles de tareas completadas, filtrados según criterios específicos.
     * @param filterDto
     * @returns
     * 
     * @author Bryan Vazquez
     */
    public async findUsersWithTasksInfo(filterDto: UserFilterDto): Promise<any[]> {
        const { name, email, rol } = filterDto;

        /**
         * EN -> Initialize the object to store the search conditions.
         * ES -> Inicializamos el objeto para almacenar las condiciones de búsqueda.
         */
        const whereConditions: any = {};

        /**
        * EN -> Check if name, email, rol exists and assign the condition if true.
        * ES -> Verificar si existe name, email, rol y asignar la condición si es verdadero.
        */
        if (name) whereConditions.name = Like(`%${name}%`);
        if (email) whereConditions.email = Like(`%${email}%`);
        if (rol) whereConditions.rol = rol;

        /**
        * EN -> Perform the search in the user repository using the defined conditions.
        * ES -> Realizar la búsqueda en el repositorio de usuarios utilizando las condiciones definidas.
        */
        const users = await this.userRepository.find({
            where: whereConditions,
            relations: ['tasks'],
        });

        /**
        * EN -> Obtain task information for filtered users
        * ES -> Obtener información de tareas para usuarios filtrados
        */
        const usersWithTasksInfo = users.map(user => {
            const tasksCompleted = user.tasks.filter(task => task.status === TaskStatus.DONE).length;
            const totalCostOfTasks = user.tasks
                .reduce((acc, task) => {
                    if (task.status === TaskStatus.DONE) {
                        return acc + Number(task.cost);
                    }
                    return acc;
                }, 0);

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol,
                tasksCompleted,
                totalCostOfTasks,
            };
        });

        return usersWithTasksInfo;
    }
}