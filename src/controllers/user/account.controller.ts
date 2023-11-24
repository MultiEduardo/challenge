import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res } from "@nestjs/common";
import { UserService } from '../../common/services/user/user.service';
import { User } from '../../database/entities/user.entity';
import { NewAccountRegistrationDto } from "src/common/dtos/user";
import { Response } from 'express';
import { UserFilterDto } from '../../common/dtos/user/filter/user-filter.dto';

@Controller('account/user')
export class AccountController {

    constructor(private readonly userService: UserService) { }

    /**
     * @description_EN Create a new user
     * @description_ES Crear un nuevo usuario
     * @param newUserAccount 
     * @param response
     * @since 0.0.1
     * 
     * @author Bryan Vazquez
     */
    @Post('createuser/new')
    async createUser(@Body() newUserAccount: NewAccountRegistrationDto, @Res() response: Response) {
        try {
            /**
             * EN -> Check if the user already exists
             * ES -> Verificar si el usuario ya existe
             */
            const existingUser = await this.userService.findUserByEmail(newUserAccount.email);
            if (existingUser) {
                throw new HttpException('Registra otro email valido', HttpStatus.BAD_REQUEST);
            }

            /**
             * EN -> Create a new user
             * ES -> Crear un nuevo usuario
             */
            const usuario: User = new User();
            usuario.name = newUserAccount.name;
            usuario.email = newUserAccount.email;
            usuario.rol = newUserAccount.rol;

            const createdUser = await this.userService.createUser(usuario);
            return response.status(HttpStatus.CREATED).json({
                message: 'Usuario creado con éxito',
                user: createdUser,
            });
        } catch (e) {
            console.error('Error:', e);
            const mensajeError = e instanceof HttpException ? e.getResponse() : 'Error interno del servidor';
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                mensaje: mensajeError,
            });
        }
    }

     /**
     * @description_EN Filter users
     * @description_ES Filtrar a los usuarios
     * @param newUserAccount 
     * @param response
     * @since 0.0.1
     * 
     * @author Bryan Vazquez
     */
    @Get('filter/user')
    async getUsers(@Body() filterDto: UserFilterDto) {
    return this.userService.findUsersWithTasksInfo(filterDto);
    }
}