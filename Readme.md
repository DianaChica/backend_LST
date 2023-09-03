# Votaciones Confort Backend LST

Este repositorio contiene el backend del proyecto de Votaciones Confort para el Laboratorio de Sistemas de Telecomunicación (LST). Este proyecto forma parte de las actividades académicas y de investigación llevadas a cabo por el equipo.

## Instrucciones

El backend ofrece varias funcionalidades esenciales para el proyecto de Votaciones Confort. Aquí encontrarás las instrucciones básicas para poner en marcha el proyecto, ya sea para propósitos de desarrollo o de producción.

### Deploy del servidor

#### Dependencias

Una vez clonado el repositorio y entrando a la carpeta de lo clonado debes instalar ciertas dependencias.
Para instalar todas las dependencias necesarias, debes ejecutar el siguiente comando en tu terminal:

```bash
npm install
```

### Dockerización del Proyecto

Para la dockerización del backend en la implementación del proyecto, puedes seguir los siguientes pasos:

#### Ubicarse en la raiz del proyecto, en donde se encuentra el dockerfile y el docker-compose.yml

Una vez estés en la carpeta debes ejecutar 

```bash
docker-compose up -d --restart always
```
En donde -d ejecuta los contenedores en segundo plano (modo "detached") y --restart always configura la política de reinicio del contenedor para que siempre se reinicie, independientemente de la razón por la que se haya detenido.

Si tienes alguna pregunta o inquietud, no dudes en abrir un Issue o realizar un Pull Request.