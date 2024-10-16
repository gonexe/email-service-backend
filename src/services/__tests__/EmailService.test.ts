import 'reflect-metadata';
import { Container } from 'inversify';
import { EmailData } from 'shared';
import { IEmailProvider } from '../../providers/IEmailProvider';
import { ICircuitBreaker } from '../../utils/ICircuitBreaker';
import EmailService from '../EmailService';

const mockSendGridProvider: IEmailProvider = {
  getName: jest.fn().mockReturnValue('SendGrid'),
  sendEmail: jest.fn().mockResolvedValue(undefined),
};

const mockMailgunProvider: IEmailProvider = {
  getName: jest.fn().mockReturnValue('Mailgun'),
  sendEmail: jest.fn().mockResolvedValue(undefined),
};

const mockCircuitBreaker: ICircuitBreaker = {
  call: jest.fn().mockImplementation((action) => action()),
};

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<IEmailProvider>('IEmailProvider')
      .toConstantValue(mockSendGridProvider)
      .whenTargetNamed('SendGrid');
    container
      .bind<IEmailProvider>('IEmailProvider')
      .toConstantValue(mockMailgunProvider)
      .whenTargetNamed('Mailgun');
    container
      .bind<ICircuitBreaker>('ICircuitBreaker')
      .toConstantValue(mockCircuitBreaker)
      .whenTargetNamed('SendGrid');
    container
      .bind<ICircuitBreaker>('ICircuitBreaker')
      .toConstantValue(mockCircuitBreaker)
      .whenTargetNamed('Mailgun');
    container.bind<EmailService>(EmailService).toSelf();

    emailService = container.get(EmailService);
  });

  it('should send email using the primary provider', async () => {
    const emailData: EmailData = {
      to: 'test@example.com',
      subject: 'Test',
      text: 'Test email',
      html: '<p>Test email</p>',
    };
    await emailService.sendEmail(emailData);
    expect(mockSendGridProvider.sendEmail).toHaveBeenCalledWith(emailData);
  });

  it('should fallback to secondary provider if primary fails', async () => {
    mockSendGridProvider.sendEmail = jest
      .fn()
      .mockRejectedValue(new Error('SendGrid failed'));
    const emailData: EmailData = {
      to: 'test@example.com',
      subject: 'Test',
      text: 'Test email',
      html: '<p>Test email</p>',
    };
    await emailService.sendEmail(emailData);
    expect(mockMailgunProvider.sendEmail).toHaveBeenCalledWith(emailData);
  });
});
