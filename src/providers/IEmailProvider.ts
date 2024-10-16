import { EmailData } from 'shared';

export interface IEmailProvider {
  sendEmail(emailData: EmailData): Promise<void>;

  getName(): string;
}
