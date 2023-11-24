
# Challenge de Back-End

### Objetivo del Challenge
Desarrollar una API para la gestión de tareas dentro de un equipo, permitiendo la creación de usuarios, la asignación de tareas con fechas de entrega y la manipulación de datos numéricos asociados a las tareas, como estimaciones de tiempo y seguimiento del tiempo invertido







## Instalación Software y Programas
#### Entornos de Desarrollo Integrado (IDEs):
Si aún no tienes un IDE, aquí tienes algunas opciones populares:

*  **Visual Studio Code**
*  **IntelliJ IDEA**

#### Herramientas para el Desarrollo del Back-End:
Para trabajar en el desarrollo del lado del servidor, necesitarás las siguientes herramientas:

* **NestJS:** Framework de Node.js para la construcción de aplicaciones de servidor.
* **PostgreSQL:** Sistema de gestión de bases de datos relacional.
* **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
* **TypeScript:** es un lenguaje de programación de código abierto que amplía la sintaxis de JavaScript añadiendo un sistema de tipado estático opcional.
* **PostMan:** Herramienta para probar APIs.
* **DataGrip (paga):** Herramienta de JetBrains para la gestión de bases de datos.
* **pgAdmin (gratis):** Herramienta de administración y desarrollo para PostgreSQL.

Ambas herramientas, **DataGrip** y **pgAdmin**, ofrecen funcionalidades para administrar bases de datos PostgreSQL, pero se diferencian en sus características y enfoque. No es necesario tener ambas; puedes elegir la que mejor se ajuste a tus preferencias y necesidades específicas de gestión de bases de datos.




## Installation
Primero, clonaremos el repositorio. Una vez clonado, nos dirigiremos a la carpeta **challenge**.
```bash
    git clone https://ejemplo.com/repo.git
    cd challenge
```
Dentro de la carpeta **challenge**, instalaremos las dependencias necesarias.

```bash
  npm install
```

#### Configuración Base de Datos
Luego, vamos a crear una base de datos. Abre una terminal y asegúrate de tener acceso a PostgreSQL. Desde la terminal, ejecuta:

```bash
  psql -U posgresql
```
Una vez dentro del terminal de PostgreSQL, puedes ejecutar los siguientes comandos SQL para crear una base de datos y un esquema:

```bash
# Crear la base de datos
CREATE DATABASE challenge_puul;

# Conectar a la base de datos creada
\c challenge_puul;

# Crear un esquema en la base de datos
CREATE SCHEMA chpl;
```
Una vez ejecutados estos comandos, habrás creado una base de datos llamada challenge_puul y un esquema dentro de esa base de datos.

#### Para transferir las tablas a la base de datos, sigue estos pasos:

 * Abre la terminal y navega al directorio que contiene la carpeta **challenge**.
 * Ejecuta el siguiente comando, dependiendo del sistema operativo:


```bash
# En sistemas Linux
npm run migrate:local

# En sistemas Windows
npm run w-migrate:local
```
Esto transferirá las tablas a la base de datos junto con los datos que se hayan agregado en la migración. Estos comandos ejecutarán las migraciones configuradas para el proyecto, asegurándose de que la estructura de la base de datos esté actualizada según la definida en el proceso de migración.

#### Ejecución del Programa
El último paso consiste en ejecutar este comando en tu terminal:
```bash
npm run start:local
```
Una vez ejecutado este comando, podrás observar que el programa se está ejecutando exitosamente. En caso de que ocurra algún fallo, te recomiendo revisar detalladamente los pasos anteriores. ¡Gracias!

## Puertos Utilizados
* **5432 posgresql**
* **3000 nestjs**

Estos son los puertos utilizados por los servicios específicos:

* **5432:** Se utiliza para PostgreSQL, el sistema de gestión de bases de datos relacional.
* **3000:** Es el puerto por defecto para aplicaciones NestJS, el framework de Node.js para la construcción de servidores.
## Environment Variables

Para ejecutar este proyecto, es necesario las siguientes variables de entorno a tu archivo **environments**.
Actualmente, se proporciona una configuración por defecto para entorno local. Si deseas modificar el puerto u otras configuraciones, puedes crear o ajustar el archivo *.env* con las variables específicas.

## Uso en Postman

**Para acceder a las API desde Postman:**

* Abre la aplicación Postman.
* Selecciona el método de la API que deseas probar (por ejemplo, POST, GET, PUT, DELETE, etc.).
* Introduce la URL del endpoint correspondiente en la barra de direcciones de Postman.
* Configura los parámetros y el cuerpo de la solicitud según la estructura y los datos necesarios para la API en cuestión.
* Haz clic en el botón "Send" para enviar la solicitud a la API.
* Observa las respuestas para verificar el funcionamiento correcto de la API y los datos devueltos.

Recuerda configurar los métodos, endpoints y cuerpos de solicitud de acuerdo con la documentación de la API proporcionada para obtener resultados precisos y utilizar correctamente los servicios disponibles.

## API Reference

### Crear Usuario
**Endpoint**
```http
  POST localhost:3000/account/user/createuser/new
```
**Parámetros**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `rol` | `enum` | **Opcional.** Por defecto: **Miembro.**|

#### Ejemplo de Cuerpo (JSON)
Para enviar datos a la base de datos, utiliza la siguiente estructura JSON como ejemplo:

```json
{
  "name": "Pérez1",
  "email": "211@hotmail.com",
  "rol": "Administrador"
}
```
Si no se proporciona un valor para rol, por defecto se asignará como Miembro. En Postman, selecciona el método POST, introduce la URL del endpoint y configura el cuerpo de la solicitud como JSON en el formato mostrado arriba para crear un usuario utilizando la API correspondiente.

### Filtro de usuario
**Endpoint**
```http
  GET localhost:3000/account/user/filter/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Opcional**. Filtra por nombre.|
| `email` | `string` | **Opcional**. Filtra por email.|
| `rol` | `enum` | **Opcional.** Filtra por rol.|

#### Ejemplos de Cuerpo (JSON)
Puedes utilizar cualquiera de estos ejemplos en el cuerpo de la solicitud para filtrar usuarios:

**Filtrar por nombre, correo electrónico y rol:**

```json
{
  "name": "Pérez1",
  "email": "211@hotmail.com",
  "rol": "Administrador"
}
```
**o filtrar solo por correo electrónico:**
```json
{
  "email": "211@hotmail.com",
}
```
Si se proporciona algún parámetro de filtrado, el sistema filtrará los usuarios según esos parámetros específicos. Si no se agrega ningún parámetro, se devolverán todos los usuarios disponibles. 


### Crear una nueva tarea
**Endpoint**
```http
  POST localhost:3000/task/register
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**.
| `description` | `string` | **Opcional**.|
| `estimationHours` | `number` | **Required.**|
| `dateExpiration` | `Date` | **Required.**|
| `status` | `enum` | **Opcional.** Por defecto: **Activa**|
| `assignedUsers` | `number[]` | **Required.** |
| `cost` | `number` | **Required.**|

Puedes utilizar los siguientes parámetros para crear una tarea, y aquí te proporciono algunos ejemplos de cómo estructurar los datos:

#### Ejemplos de Cuerpo (JSON)
```json
{
  "title": "Desarrollar API REST",
  "description": "Crear endpoints para interactuar con la base de datos",
  "estimationHours": 20,
  "dateExpiration": "2023-12-31",
  "status": "Activa",
  "assignedUsers": [3],
  "cost": 500
}
```
Estos son algunos de los parámetros que puedes incluir al crear una tarea. Ten en cuenta que algunos de estos parámetros pueden ser requeridos y, en caso de no ser proporcionados, podrían generar errores. Asegúrate de incluir los parámetros necesarios para la creación exitosa de la tarea.

### Filtrar tareas 
**Endpoint**
```http
  GET localhost:3000/task/filter
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Opcional**.
| `dateExpiration` | `Date` | **Opcional**.|
| `assignedUserName` | `string` | **Opcional.**|
| `assignedUserEmail` | `string` | **Opcional.**|
| `status` | `enum` | **Opcional.**|


En el caso de tareas podemos filtrar por varias opciones desde el nombre del usuario hasta los estatus estos son algunos ejemplos:

#### Ejemplos de Cuerpo (JSON)
```json
{
    "assignedUserEmail": "roberttest@hotmail.com"
}
```
o
#### Ejemplos de Cuerpo (JSON)
```json
{
    "title": "Desarrollar API REST",
    "description": "Crear endpoints para interactuar con la base de datos",
    "estimationHours": 20
}
```
Estos ejemplos te muestran cómo estructurar la solicitud para filtrar tareas según distintos criterios, facilitando la visualización y gestión de las tareas 

### Actualizar Tareas
**Endpoint**
```http
  PATCH task/update/:id 
```

ejemplo de llamado por el id
```http
  PATCH localhost:3000/task/update/3
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Opcional**.
| `description` | `string` | **Opcional**.|
| `estimationHours` | `number` | **Opcional.**|
| `dateExpiration` | `Date` | **Opcional.**|
| `status` | `enum` | **Opcional.**|
| `assignedUsers` | `number[]` | **Opcional.** |
| `cost` | `number` | **Opcional.**|

El método PATCH se utiliza para actualizar datos en tareas existentes. En este caso, puedes cambiar los usuarios asignados a una tarea específica. Aquí tienes un ejemplo:

#### Ejemplos de Cuerpo (JSON)
```json
{
  "assignedUsers": [2, 4, 6]
}
```
Este ejemplo demuestra cómo utilizar el método PATCH para actualizar la lista de usuarios asignados a la tarea con ID 1. El cuerpo de la solicitud especifica los nuevos usuarios asignados a la tarea.

Utiliza este método para realizar modificaciones en tareas existentes, como cambiar los usuarios asignados, el estado, la descripción u otros detalles específicos de una tarea en particular.

### Eliminar Tareas
**Endpoint**
```http
  DELETE task/delete/:id
```
ejemplo de llamado por el id
```http
  DELETE localhost:3000/task/delete/1
```
Este endpoint te permite eliminar una tarea específica mediante su identificador (id). Al hacer uso de este endpoint con el id correspondiente, se elimina la tarea junto con todas las asignaciones relacionadas que tenía la tarea.

### Analítica
**Endpoint**
```http
  GET localhost:3000/analytics
```
Mostrar dos estadísticas, una de ellas son el gasto del usuario, las tareas pendientes, las completadas, tareas totales, etc. En cuanto a la segunda estadística el tiempo promedio por usuario en las tareas asignadas
## FAQ

#### ¿Cuál es el enum de RolStatus?

    ADMIN = 'Administrador'
    MIEMBRO = 'Miembro'

#### ¿Cuál es el enum TaskStatus?
    ACTIVE = 'Activa'
    DONE = 'Terminada'


## License
* [BSD](https://www.postgresql.org/about/licence/)
* [MIT](https://choosealicense.com/licenses/mit/)


## Authors

- **Bryan Vazquez** [@MultiEduardo](https://github.com/MultiEduardo)
        
    Copyright 2023

