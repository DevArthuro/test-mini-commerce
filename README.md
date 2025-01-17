# Mini commerce payments

# Configuration
## Local environment
### Pre-requirements

- Docker y Docker Compose must be installed.

### Variables de Entorno

attached to the email

### Cli execution

You should build with this command:

```bash
docker compose up --build -d
```


# Tecnologies: 
- **React** 
- **Nestjs**
- **Postgresql**
- **Prisma**
- **Turbo Respo**

## Description
This mini commerce will help manage your payments across multiple payment gateways. Currently, we only have the integration with **Wompi**.

Visually, it has 3 screens: *Products* > *Summary* > *Process Payment*.

On the backend, it has 5 different endpoints that manage a relational database with 5 tables using clean architecture.

# Backend

## Arquitectura

The project is developed following **Clean Code** principles and **Hexagonal Architecture**, ensuring a modular and easy-to-maintain design. Additionally, it is built on the **ROP** methodology based on **use cases**. The main structure of the project includes the following folders:

### Folder structure

- **payments**: this is the module:
    - **domain**: Models, business rules and abstract clases.
      - **dto**:  Class interfaces with validators that must be supplied to the different layers
      - **entities**:  Objects that simplify the way information is managed in an easier and safer way
      - **erros**: Custom errors that must be detected to personalize system error messages and avoid vulnerabilities  
      - **ports**: Abstract objects that the implementation does not depend on my system but is abstracted
      - **repositories**: Abstract classes that have an implementation of how the application should work, input information, and how it manages the models 
  - **aplicación**: Lógica de casos de uso.
    - **cases**: Casos de uso del sistema y acciones que se pueden ejecutar
    - **dto**: class interfaces que validan los tipos de datos que reciben las acciones 
  - **infraestructura**:  Implementation of connectors, routing, payment gateways, and repositories.
    - **adapters**: System adapters and how the user should communicate with it in a controlled way.
      - **controllers**: Endpoints with which the user can access the system and communicate with the different layers
      - **repositories**: These repositories are based on the application layer and how the business logic was defined to be adapted 
      - **services**:  External services or entities that I have no control over but are based on the application layer 
    - **config**: Defines how the different layers should communicate
- **prisma**: Database management using Prisma ORM.
- **app.module.ts**: This file calls the payments module that integrates everything.
