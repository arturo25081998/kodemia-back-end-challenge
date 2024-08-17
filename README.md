# Back-End Challenge

Este es el desafio del modulo de back-end en el boot-camp de Kodemia.

Este desafio consiste en desarrolar una API similar a un sitio web llamado dev.to el cual sera desarrollado en NodeJS utilizando librerias como JWT, Express, http-errors y mongoose para realizar una conexion a una base de datos en MongoDB.

## Get started

Para poder usar este repositorio sigue los siguientes pasos

1. Descargar este repositorio.
2. Configurar el archivo .env para establecer tus variables de entorno.
3. Desplegar tu servidor con en modo desarrollo o modo produccion con uno de los siguientes comandos

```bash
npm start -> Producción
npm run dev -> Desarrollo
```

4. Una vez desplegado tu servidor podras tener acceso a los siguientes end-points o rutas:

- POST /users -> Para permitir el registro a los nuevos usuarios

- GET /user/:id -> Para obtener la información de un usuario por id

- POST /auth/login -> Para otorgar un nuevo JWT cada que es llamado

- POST /posts -> Para crear un nuevo post, el post creado será asignado al usuario que llamó este endpoint

- GET /posts -> Para listar todos los posts y soporta buscar por titulo con un query param llamado search

- PATCH /posts/:id -> Para permitir actualizar un post, no se permite la actualizacion de usuario

- DELETE /posts/:id -> Para permitir borrar un post, solo el creador del post puede eliminarlo.
