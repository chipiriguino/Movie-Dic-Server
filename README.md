# MovieDick

Servidor de Movie Dick, creado con nodeJS & Express, con autenticación de usuario (login. signup)
### Paquetes npm instalados
* MongoDB 
* Express
* Node
* Morgan
* dotenv
* Cloudinary
* axios 

## Comenzando 🚀
### Instalación 🔧
Para poder ver y probar este proyecto en tu ordenador local, haz Fork tanto de este repositorio como el [repositorio del cliente](https://github.com/GitSkynet/Movie-Dic-Client)

Antes de poner el servidor en marcha, debemos crear un archivo y descargar las pedendencias.
Crea  un **archivo .env** en el directorio raíz, donde añadiremos las siguientes keys:

### Keys 📋

```
* MONGODB_URI=<url_mongoDB local/atlas>
* PUBLIC_DOMAIN=http://localhost:3000
* SECRET_SESSION=<nombre(anithing)>
* PORT=4000
* SECRET_SESSION=<nombre>
* cloudName=<cloudinary>
* cloudKey=<cloudinary>
* cloudSecret=<cloudinary>
```
_Las variables clodName, clodKey y cloudSecret son las variables que nos da Cloudinary en su panel
de control. Si no tienes cuenta, ve a [Cloudinary](https://cloudinary.com/), crea una e introduce las keys_

_Una vez creado nnuestro archivo .env, instalamos todas las dependencias y ejectuamos el servidor_

```
npm install
```

_Para ejecutar el servidor:_

```
npm run dev
```

_Ya tenemos nuestro backend escuchando en http://localhost:4000 y conectado a mongoDB_

## Full Stack App

_Una vez con el servidor en marcha, ve al [repositorio del cliente](https://github.com/GitSkynet/Movie-Dic-Client), haz un fork y un clone y sigue las insturcciones del readme para ejecutar el frontend, 
y tendrás la aplicación Full Stack corriendo en local_


## Realizando el deploy en Heroku ⚙️

## 📌Una vez tengas la build hecha del repo del cliente📌, ejecutamos:

### Configurando Heroku 🔩

_Habrá que crear en Heoku las mismas variables que declaramos arriba para el archivo .env, pero en este caso; en la dirección de la base de datos le daremos la dirección de mongoDB Atlas_

```
* MONGODB_URI=<url_mongoDB_atlas>
* PUBLIC_DOMAIN=http://localhost:3000
* SECRET_SESSION=<nombre(anithing)>
* PORT=4000
* SECRET_SESSION=<nombre>
* cloudName=<cloudinary>
* cloudKey=<cloudinary>
* cloudSecret=<cloudinary>
```

_Para comprobar que se ha añadido a la carpeta public los cambios de la build_
```
git status
```
_Añadimos  Todos los cambios_
```
git add .
```
_Creamos el commit_
```
git commit -m"myCommit"
```
_Hacemos el push a Heroku_
```
git push heroku master"
```

## Construido con 🛠️

_Server realizado con_

* [nodeJS](https://nodejs.org/es/)
* [Express](https://expressjs.com/es/)
* [Cloudinary](https://cloudinary.com/)

## Actualemente trabajando🖇️

- Refactorizar y pulir todo el código del backend
- Mejorar la eficiencia y rendimiento
- Incorporar nodeMailer
- Incorporar Disquss para cada película
- Mejorar feed social
- Realizar test 

## Autores ✒️

### José Luis Blasco Ortiz
* **LinkedIn** - [José Luis Blasco Ortiz](https://www.linkedin.com/in/joseluis-blascoortiz/)
* **GitHub** - [chipiriguino](https://github.com/chipiriguino)
* **PortFolio** - [portfolio](https://portfolio-chipiriguino.herokuapp.com/)

### Carlos Curtido
* **LinkedIn** - [Carlos Curtido](https://www.linkedin.com/in/carlos-curtido/)
* **GitHub** - [GitSkynet](https://github.com/GitSkynet)
* **PortFolio** - [portfolio](https://portfoliocurtido.herokuapp.com/)

## Licencia 📄

Este proyecto está bajo Licencia libre - mira el archivo [LICENSE.md](LICENSE.md) para detalles

---
⌨ Realizado con ❤️ por [Carlos Curtido](https://portfoliocurtido.herokuapp.com/) &  [José Luis Blasco Ortiz](https://portfolio-chipiriguino.herokuapp.com/) ❤️
