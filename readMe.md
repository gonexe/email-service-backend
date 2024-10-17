# Email Service - Backend

## Objective

The objective of this repository is to provide a robust backend service for sending emails using different email
providers. This service ensures high availability and reliability by abstracting the email sending process and allowing
failover between multiple email providers. If one provider goes down, the service can quickly switch to another provider
without affecting the end-users.

## Technologies Used

- **Languages**: TypeScript, Node.js
- **Package Management**: npm
- **Testing**: Jest (for unit tests)
- **Containerization**: Docker

## API Documentation

The OpenAPI documentation for the endpoints can be
accessed [here](https://email-service-backend-e5cf2a6fc011.herokuapp.com/api-docs/).

## Design Patterns

1. **Circuit Breaker**: The Circuit Breaker pattern is applied to manage the failover between different email providers.
   This pattern helps to prevent the system from repeatedly trying to use a failing service, which can lead to cascading
   failures. The `CircuitBreaker.ts` utility handles this logic by monitoring the success and failure rates of email
   sending operations, allowing switching providers when necessary.


2. **Interface**: The Interface pattern is used to define a common contract for all email providers. The
   `IEmailProvider.ts`
   file contains the interface that all email provider implementations (e.g., `SendGridProvider.ts`,
   `MailgunProvider.ts`)
   must
   adhere to. This ensures that the EmailService.ts can interact with any email provider in a
   consistent manner, promoting flexibility and extensibility.

## Shared Libraries

This project consumes a [shared repository](https://github.com/gonexe/shared-project) created by the same author that
exposes an NPM library with TypeScript types
to ensure consistency across multiple projects. These types help maintain type safety and uniformity when handling
common data structures.

## Project Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/gonexe/email-service-backend
    cd email-service-backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add the required environment variables (see the Environment
   Variables section).

4. **Run the application**:
    ```sh
    docker-compose up --build
    ```

## Running Tests

To run the tests inside the `app` Docker container, use the following command:

```sh
docker-compose exec backend npm test
```

## Environment Variables

```sh
PORT: Port for the backend server.
PREDEFINED_PROVIDER: Default email provider (e.g., SendGrid).
SENDGRID_API_KEY: API key for SendGrid.
SENDGRID_SENDER_EMAIL: Sender email for SendGrid.
MAILGUN_DOMAIN: Domain for Mailgun.
MAILGUN_API_KEY: API key for Mailgun.
MAILGUN_SENDER_EMAIL: Sender email for Mailgun.
```

## Routes

- **`Email`**:
    - **`POST /api/email/send`**: Send an email using the configured providers.
- **`Provider`**:
    - **`GET /api/providers`**: Get a list of available email providers.
    - **`PUT /api/providers/switch`**: Switch the email provider.

## Controllers

- **`EmailController.ts`**: Handles email sending operations.
- **`ProviderController.ts`**: Handles provider-related operations.

## Services

- **`EmailService.ts`**: Handles email sending logic.
- **`ProviderService.ts`**: Handles provider-related logic.

## Providers

- **`IEmailProvider.ts`**: Interface for email providers.
- **`SendGridProvider.ts`**: Implementation for SendGrid email provider.
- **`MailgunProvider.ts`**: Implementation for Mailgun email provider.

## Middleware

- **`errorHandler.ts`**: Global error handling.

## Utils

- **`CircuitBreaker.ts`**: Manages circuit breaker pattern for email providers.
- **`timeout.ts`**: Manages timeouts for email sending operations.

## Test Files

- **`Services`**:
    - **`EmailService`**
    - **`ProviderService`**

## Dockerfile and Docker Compose Explanation

- **`Dockerfile`**: Build and run the backend application.

- **`docker-compose.yml`**: Defines the Docker services for the application.
    - **`backend`**: The main application service.

## Linter and Prettier

- **ESLint**: Linting tool for identifying and fixing problems in the code.
- **Prettier**: Code formatter for maintaining consistent code style.

## Author

This project was created by Gonzalo Avila.

## Disclaimer

This code should not be modified without the explicit approval of the author.

