# API-REST

Este es un backend que requiere registrarse como usuario para poder interartuar con los end-point definidos, para la autenticacion de los usuarios se usa JSON WEB TOKEN que son generados en el correspondiente end-point, los usuarios previameente registrados y con un token pueden realizar acciones de ver, crear, actualizar y eliminar publicaciones, ademas de poder ver comentarios, crearlos, actualizarlos y eliminarlos, como base de datos se usa Mongodb, y esta contruido considerando la arquitectura REST (Este proyecto esta sujeto a cambios).

Pre-requisitos 📋
Para poder ejecutar este proyecto necesitas tener disponible en tu PC Node JS, MongoDB y npm para poder descargar las dependencias necesarias y poder ejecutar el proyecto en un servidor local.

Instalación 🔧
Para poder correr este proyecto necesitas clonar el repositorio e instalar las dependencias necesarias con npm usando el siguiente codigo dentro de la carpeta del proyecto.

npm install --save

Y luego de que instale todas las dependencias necesarias, debes habilitar mongoDB para que NodeJS pueda trabajar con la base de datos
puedes correr el proyecto con:

npm start

De esta forma tendras el proyecto corriendo en un servidor local en tu computadora, por defecto el puerto definido es 3000, asi que el proyecto debe de estar corriendo en la ruta http://localhost:3000/

Construido con 🛠️
Este proyecto esta construido con Node JS, Express, Mongoose y cuenta con documentation swagger.
