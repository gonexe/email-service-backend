# Email Service System

## Technologies Used

- **Languages**: TypeScript, Node.js
- **Package Management**: npm
- **Testing**: Jest (for unit tests)
- **Containerization**: Docker

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

