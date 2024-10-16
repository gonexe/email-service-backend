import { IEmailProvider } from './IEmailProvider';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import envVars from '../config/validateEnv';
import { EmailData } from 'shared';
import { injectable } from 'inversify';

const mailgunApiKey = envVars.MAILGUN_API_KEY;
const senderEmail = envVars.MAILGUN_SENDER_EMAIL;
const mailgunDomain = envVars.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: mailgunApiKey,
});

@injectable()
export class MailgunProvider implements IEmailProvider {
  getName(): string {
    return 'Mailgun';
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    const msg = {
      from: senderEmail,
      to: [emailData.to],
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };

    try {
      console.log('Sending with Mailgun:', emailData);
      await mg.messages.create(mailgunDomain, msg);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error sending email with Mailgun:', error);
        throw new Error('Failed to send email: ' + error.message);
      } else {
        console.error('Unknown error sending email with Mailgun:', error);
        throw new Error('Failed to send email due to an unknown error');
      }
    }
  }
}
