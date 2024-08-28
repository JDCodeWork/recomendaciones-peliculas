
# Sistema de Recomendación de Películas

## Introducción

Este documento describe el diseño y la implementación de un sistema de recomendación de películas desarrollado utilizando NestJS. El objetivo del sistema es sugerir películas a un usuario basado en sus preferencias personales y las valoraciones de otros usuarios. El sistema está compuesto por varios componentes backend, diseñados para manejar usuarios, películas y la base de datos correspondiente.


## Arquitectura del Sistema

El sistema está construido siguiendo la arquitectura modular proporcionada por NestJS, un framework de Node.js. Se han desarrollado tres módulos principales:

1. **Módulo de Usuario**: Responsable de manejar toda la lógica relacionada con los usuarios, además de ser el encargado de proporcionar las recomendaciones.
2. **Módulo de Película**: Encargado de gestionar la información relacionada con las películas.
3. **Módulo Seed**: Utilizado para poblar la base de datos con información inicial sobre usuarios y películas.

### Justificación
Aunque existen varias alternativas para crear aplicaciones de servidor con JavaScript, como Express y NestJS, opté por NestJS debido a su enfoque estructurado y la experiencia de desarrollo que ofrece. NestJS proporciona un marco de trabajo bien definido, lo que facilita la organización del código y promueve buenas prácticas desde el inicio del proyecto.

## Diseño del Sistema

### Controladores
 - **Controlador de Usuario**: Administra la creación de usuarios, preferencias, valoraciones y proporciona recomendaciones. 
 -  **Controlador de Película**: Permite buscar y actualizar información de películas y valoraciones.
 - **Controlador de Carga de Datos**: Inicializa la base de datos con datos relevantes.

### Servicios 
Cada controlador utiliza servicios que contienen la lógica de negocio, gestionan operaciones CRUD y aplican la lógica de recomendación.

### Base de Datos
 Se utiliza PostgreSQL para almacenar datos de usuarios, películas y valoraciones.

### Algoritmo de Recomendación

Aunque existen múltiples algoritmos para implementar un sistema de recomendación, en esta solución se ha optado por un enfoque sencillo y directo. El algoritmo realiza una consulta a la base de datos para obtener todas las películas que coincidan con al menos uno de los géneros preferidos por el usuario o que incluyan al menos uno de sus actores favoritos. Independientemente de si hay coincidencias de género o actor, el sistema siempre devolverá las 10 películas mejor valoradas en orden descendente. Si el usuario no tiene géneros o actores específicos en sus preferencias, también se le mostrarán las 10 películas mejor valoradas sin importar género o actores.

## Documentación de la API

Para la documentación de la API, se ha utilizado OpenAPI y Swagger. Swagger proporciona una interfaz interactiva que permite explorar y probar los endpoints disponibles. Para poder acceder a esta documentación se debe acceder desde el navegador al url `localhost:3000/api`

## Conclusión

El sistema de recomendación de películas ha sido diseñado para ser escalable y fácil de mantener, aprovechando la arquitectura modular de NestJS. Con una clara separación de responsabilidades y una robusta documentación de API

## Guía para desarrollo

Para poder seguir la guía de desarrollo del sistema de recomendación de películas, se deben cumplir los siguientes requisitos:

### Requisitos Previos

1. **Git**: Tener instalado Git para clonar el repositorio del proyecto.
2. **Node.js**: Contar con Node.js instalado en tu máquina (versión 18 o superior) junto con npm, el gestor de paquetes de Node.js.
3. **Docker**: Tener Docker y Docker Compose instalados y configurados, ya que se utilizarán para levantar la base de datos y otros servicios necesarios.

### Pasos para Ejecutar la aplicación
1. Clonar repositorio `gh repo clone JDCodeWork/recomendaciones-pelicula`.
2. Renombrar el archivo `.env.template` a `.env`.
3. Modificar las variables de entorno de acuerdo a las necesidades.
4. Levantar la base de datos (`docker-compose up -d`).
5. Instalar dependencias (`npm install` o `pnpm install`)
6. Iniciar la aplicación (`npm start:dev`).
7. Ejecutar una petición `GET /api/seed` para tener datos de prueba 
8. Ingresar desde el navegador a la url `/api` para la documentación
