import { inject, injectable, named } from 'inversify';
import { IEmailProvider } from '../providers/IEmailProvider';
import { EmailData } from 'shared';
import { currentProvider } from '../config/providerConfig';
import { ICircuitBreaker } from '../utils/ICircuitBreaker';

interface ProviderConfig {
  provider: IEmailProvider;
  breaker: ICircuitBreaker;
}

@injectable()
class EmailService {
  private readonly providers: ProviderConfig[];

  constructor(
    @inject('IEmailProvider')
    @named('SendGrid')
    sendGridProvider: IEmailProvider,
    @inject('IEmailProvider') @named('Mailgun') mailgunProvider: IEmailProvider,
    @inject('ICircuitBreaker')
    @named('SendGrid')
    sendGridBreaker: ICircuitBreaker,
    @inject('ICircuitBreaker')
    @named('Mailgun')
    mailgunBreaker: ICircuitBreaker,
  ) {
    this.providers = [
      { provider: sendGridProvider, breaker: sendGridBreaker },
      { provider: mailgunProvider, breaker: mailgunBreaker },
    ];
  }

  private prioritizeProviders(): ProviderConfig[] {
    return [
      ...this.providers.filter(
        ({ provider }) => provider.getName() === currentProvider,
      ),
      ...this.providers.filter(
        ({ provider }) => provider.getName() !== currentProvider,
      ),
    ];
  }

  public async sendEmail(emailData: EmailData): Promise<void> {
    const prioritizedProviders = this.prioritizeProviders();

    for (const { provider, breaker } of prioritizedProviders) {
      try {
        await breaker.call(() => provider.sendEmail(emailData));
        return;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            `Provider ${provider.getName()} failed with error: ${error.message}`,
          );
        } else {
          console.error(
            `Provider ${provider.getName()} failed with an unknown error`,
          );
        }
      }
    }

    throw new Error('All email providers failed');
  }
}

export default EmailService;
