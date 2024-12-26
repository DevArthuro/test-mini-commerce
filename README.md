# Mini commerce payments

# Configuration
## Local environment
### Pre-requirements

- Docker y Docker Compose must be installed.

### Variables de Entorno

The `.env` file should be created at the `apps/api` level and contain the necessary configurations. An example of a `.env` file is as follows:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/minicommerce?schema=public
PUBLIC_WOMPI_KEY=#pub key wompi
PRIVATE_WOMPI_KEY=#prv key wompi
BASE_URL_WOMPI=#base url api wompi
INTEGRITY_KEY_WOMPI=#integrity key wompi
```

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

## Database Schema

The project uses **Prisma ORM** for data management, with a schema that defines entities such as `Product`, `Delivery`, `Card`, `Customer`, `Order`, and `Transaction`. Each entity is designed to represent the entities in the domain layer:

<img src="./assets/commerce-MER.png" />


- **Product**: This entity contains the pre-seeded products.
- **Delivery**: Contains information related to the customers' shipping addresses.
- **Card**: Stores details of the payment cards associated with customers.
- **Customer**: Represents the application users with their personal data, addresses, and payment methods.
- **Order**: Manages the orders placed by customers, including quantities, references, and transaction statuses.
- **Transaction**: Tracks the transactions associated with orders, including payment references and statuses.

**Note**: The Order entity is designed to automatically manage the relationships between customers, delivery addresses, and cards, simplifying interaction and reducing the need to manage these elements independently.

## Endpoints

This project is set up on Swagger, so you should visit the following URL:

### Local
**URL:** `http://localhost:8080/api/v1/docs`


## Pruebas

<img src="./assets/test_entities.png" />

