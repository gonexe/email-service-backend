import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import EmailService from '../services/EmailService';
import { emailValidationRules } from '../validators/emailValidator';
import { validationResult } from 'express-validator';

@controller('/email')
export class EmailController {
  constructor(@inject(EmailService) private emailService: EmailService) {}

  @httpPost('/send', ...emailValidationRules)
  public async sendEmailHandler(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { to, subject, text, html } = req.body;

    try {
      await this.emailService.sendEmail({ to, subject, text, html });
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res
        .status(500)
        .send(
          'Failed to send email: ' +
            (error instanceof Error ? error.message : 'Unknown error'),
        );
    }
  }
}
