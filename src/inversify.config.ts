import 'reflect-metadata';
import { Container } from 'inversify';
import { IEmailProvider } from './providers/IEmailProvider';
import { SendGridProvider } from './providers/SendGridProvider';
import { MailgunProvider } from './providers/MailgunProvider';
import { CircuitBreaker, CircuitBreakerConfig } from './utils/CircuitBreaker';
import { ICircuitBreaker } from './utils/ICircuitBreaker';
import ProviderService from './services/ProviderService';
import { ProviderController } from './controller/ProviderController';
import { EmailController } from './controller/EmailController';
import EmailService from './services/EmailService';

const container = new Container();

container
  .bind<IEmailProvider>('IEmailProvider')
  .to(SendGridProvider)
  .whenTargetNamed('SendGrid');
container
  .bind<IEmailProvider>('IEmailProvider')
  .to(MailgunProvider)
  .whenTargetNamed('Mailgun');

const sendGridConfig: CircuitBreakerConfig = {
  failureThreshold: 3,
  successThreshold: 2,
  timeout: 10000,
};

const mailgunConfig: CircuitBreakerConfig = {
  failureThreshold: 5,
  successThreshold: 3,
  timeout: 15000,
};

container
  .bind<ICircuitBreaker>('ICircuitBreaker')
  .toDynamicValue(() => new CircuitBreaker(sendGridConfig))
  .whenTargetNamed('SendGrid');
container
  .bind<ICircuitBreaker>('ICircuitBreaker')
  .toDynamicValue(() => new CircuitBreaker(mailgunConfig))
  .whenTargetNamed('Mailgun');

container.bind<EmailService>(EmailService).toSelf();
container.bind<ProviderService>(ProviderService).toSelf();
container.bind<ProviderController>(ProviderController).toSelf();
container.bind<EmailController>(EmailController).toSelf();

export { container };
