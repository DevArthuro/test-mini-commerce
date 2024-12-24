# Proyecto Base: Monodominio con Vite y NestJS

Este proyecto es un template que combina Vite y NestJS para servir aplicaciones bajo un mismo dominio, aprovechando la configuración de proxy de Vite y las capacidades de generación estática de NestJS (Server-Side Generation, SSG). Todo el entorno está diseñado para ejecutarse en Docker Compose, facilitando la construcción y despliegue de la aplicación con un único comando.

## Arquitectura

El proyecto está desarrollado siguiendo principios de **Clean Code** y la **Arquitectura Hexagonal**, lo que garantiza un diseño modular y fácil de mantener. La estructura principal del proyecto incluye las siguientes carpetas:

- **interfaces**: Contiene la definición de contratos y puntos de interacción con el sistema.
- **payments**: Organizado en capas:
  - **aplicación**: Lógica de casos de uso.
  - **dominio**: Modelos y reglas de negocio.
  - **infraestructura**: Implementación de conectores, enrutamiento, pasarelas de pago y repositorios.
    - Dentro de la carpeta `config`, se orquesta toda la comunicación entre los componentes.
- **prisma**: Administración de la base de datos mediante Prisma ORM.
- **shared**: Componentes reutilizables y utilidades comunes.

## Configuración y Ejecución

### Pre-requisitos

- Docker y Docker Compose instalados.

### Variables de Entorno

El archivo `.env` debe ser creado a nivel de `apps/api` y contener las configuraciones necesarias. Un ejemplo de archivo `.env` es el siguiente:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/minicommerce?schema=public
PUBLIC_WOMPI_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
PRIVATE_WOMPI_KEY=prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg
BASE_URL_WOMPI=https://api-sandbox.co.uat.wompi.dev/v1
INTEGRITY_KEY_WOMPI=stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp
```

### Comando de Ejecución

Para construir y levantar el proyecto, utiliza el siguiente comando:

```bash
docker compose up --build -d
```

Este comando crea las imágenes Docker personalizadas del proyecto, las redes y servicios definidos en `docker-compose.yml`.

## Esquema de Base de Datos

El proyecto utiliza **Prisma ORM** para la gestión de datos, con un esquema que define entidades como `Product`, `Delivery`, `Card`, `Customer`, `Order` y `Transaction`. Cada entidad está diseñada para representar un aspecto específico del dominio del negocio:

<img src="./assets/commerce-MER.png" />

- **Product**: Representa los productos disponibles en la aplicación, incluyendo atributos como nombre, descripción, precio, y stock.
- **Delivery**: Contiene información relacionada con la dirección de envío de los clientes.
- **Card**: Almacena detalles de las tarjetas de pago asociadas a los clientes.
- **Customer**: Representa a los usuarios de la aplicación con sus datos personales, direcciones y métodos de pago.
- **Order**: Gestiona los pedidos realizados por los clientes, incluyendo cantidades, referencias y estado de las transacciones.
- **Transaction**: Rastrea las transacciones asociadas a los pedidos, incluyendo referencias de pago y estados.

### Relación Entre Entidades

- **Product** está relacionado con múltiples órdenes.
- **Delivery** está asociado a un cliente.
- **Card** está asociado a un cliente.
- **Customer** está relacionado con órdenes, tarjeta y detalles de entrega.
- **Order** está relacionado con productos, clientes y transacciones.
- **Transaction** está asociada a una orden específica.

**Nota:** La entidad `Order` se diseñó para gestionar automáticamente las relaciones entre clientes, direcciones de entrega y tarjetas, simplificando la interacción y reduciendo la necesidad de gestionar estos elementos de forma independiente.

## Endpoints

### Obtener Productos

**URL:** `http://localhost:8080/api/v1/products`\
**Método:** `GET`

**Descripción:** Devuelve la lista de productos disponibles con la siguiente estructura:

```json
[
  {
    "id": "4841faa4-fad2-4d6b-b0cc-d345965697ec",
    "name": "T-Shirt",
    "description": "Majestic Mountain Graphic",
    "stock": 10,
    "price": 10000,
    "imageUrl": "https://i.imgur.com/QkIa5tT.jpeg"
  },
  {
    "id": "d2da2069-38a4-47b0-b8d8-2d8bb36bce05",
    "name": "Hoodie",
    "description": "Classic Red Pullover",
    "stock": 22,
    "price": 14000,
    "imageUrl": "https://i.imgur.com/1twoaDy.jpeg"
  }
]
```


<img src="./assets/products.png" />


### Crear Orden

**URL:** `http://localhost:8080/api/v1/orders/create`\
**Método:** `POST`

**Body:**

```json
{
  "productId": "4841faa4-fad2-4d6b-b0cc-d345965697ec",
  "cardInfo": {
    "number": "4242424242424242",
    "cvc": "123",
    "expMonth": "08",
    "expYear": "28",
    "cardName": "Jose perez"
  },
  "customer": {
    "name": "Carlos",
    "lastname": "Orrego",
    "email": "carlos@gmail.com",
    "phoneNumber": "+573207515166",
    "typeDocument": "CC",
    "document": "10899313"
  },
  "delivery": {
    "countryCode": "CO",
    "country": "Colombia",
    "region": "region",
    "city": "Pereira",
    "address": "m3c2"
  },
  "quantity": 1
}
```

**Respuesta:**

```json
{
  "customer": {
    "id": "dd18d1af-2cda-421e-aa15-d75301a253c8",
    "delivery": {
      "id": "183d13a1-8fb1-4a7c-9599-3fe66bddfb38",
      "country": "m3c2",
      "region": "region",
      "city": "Pereira",
      "address": "m3c2"
    },
    "card": {
      "number": "4242",
      "exp_date": "08/28",
      "cardName": "Jose perez"
    },
    "fullName": "Carlos Orrego",
    "email": "carlos@gmail.com",
    "phoneNumber": "+573207515166",
    "fullDocument": "CC-10899313"
  },
  "product": {
    "id": "4841faa4-fad2-4d6b-b0cc-d345965697ec",
    "name": "T-Shirt",
    "description": "Majestic Mountain Graphic",
    "stock": 10,
    "price": 10000,
    "imageUrl": "https://i.imgur.com/QkIa5tT.jpeg"
  },
  "totalOrder": 20000,
  "reference": "Mini_commerce_38ddf8b7",
  "quantity": 1,
  "status": "PENDING"
}
```

**Nota:** Copiar el valor del atributo `reference` para realizar el siguiente paso.

<img src="./assets/order.png" />

### Crear Transacción

**URL:** `http://localhost:8080/api/v1/transactions/create`\
**Método:** `POST`

**Body:**

```json
{
  "orderReference": "Mini_commerce_38ddf8b7"
}
```

**Respuesta:**

```json
{
  "id": "15113-1735071284-36129",
  "order": {
    "customer": {
      "id": "dd18d1af-2cda-421e-aa15-d75301a253c8",
      "delivery": {
        "id": "183d13a1-8fb1-4a7c-9599-3fe66bddfb38",
        "country": "m3c2",
        "region": "region",
        "city": "Pereira",
        "address": "m3c2"
      },
      "card": {
        "number": "4242",
        "exp_date": "08/28",
        "cardName": "Jose perez"
      },
      "fullName": "Carlos Orrego",
      "email": "carlos@gmail.com",
      "phoneNumber": "+573207515166",
      "fullDocument": "CC-10899313"
    },
    "product": {
      "id": "4841faa4-fad2-4d6b-b0cc-d345965697ec",
      "name": "T-Shirt",
      "description": "Majestic Mountain Graphic",
      "stock": 10,
      "price": 10000,
      "imageUrl": "https://i.imgur.com/QkIa5tT.jpeg"
    },
    "totalOrder": 20000,
    "reference": "Mini_commerce_38ddf8b7",
    "quantity": 1,
    "status": "PENDING"
  },
  "status": "PENDING",
  "finalizedAt": null
}
```

<img src="./assets/transaction.png.png" />

### Consultar Transacción

**URL:** `https://api-sandbox.co.uat.wompi.dev/v1/transactions/{id}`\
**Método:** `GET`

**Descripción:** Recupera los detalles de una transacción utilizando el `id` devuelto por el endpoint de creación de transacción.

<img src="./assets/reqTransaction.png" />

## Pruebas

Se incluyen pruebas para validar las relaciones y operaciones de las entidades definidas en el esquema de Prisma. Estas pruebas están adjuntas en la carpeta `tests` dentro del repositorio.

<img src="./assets/test_entities.png" />

