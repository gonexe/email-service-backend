import { IEmailProvider } from './IEmailProvider';
import { EmailData } from 'shared';
import sgMail from '@sendgrid/mail';
import envVars from '../config/validateEnv';
import { injectable } from 'inversify';

const sendGridApiKey = envVars.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridApiKey);

const senderEmail = envVars.SENDGRID_SENDER_EMAIL;

@injectable()
export class SendGridProvider implements IEmailProvider {
  getName(): string {
    return 'SendGrid';
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    const msg = {
      to: emailData.to,
      from: senderEmail,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };

    try {
      console.log('Sending with SendGrid:', emailData);
      await sgMail.send(msg);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error sending email with SendGrid:', error);
        throw new Error('Failed to send email: ' + error.message);
      } else {
        console.error('Unknown error sending email with SendGrid:', error);
        throw new Error('Failed to send email due to an unknown error');
      }
    }
  }
}
