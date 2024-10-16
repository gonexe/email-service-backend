import { Router } from 'express';
import { container } from '../inversify.config';
import { EmailController } from '../controller/EmailController';

const router = Router();
const emailController = container.get<EmailController>(EmailController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Email:
 *       type: object
 *       required:
 *         - to
 *         - subject
 *         - text
 *       properties:
 *         to:
 *           type: string
 *           description: The recipient's email address
 *         subject:
 *           type: string
 *           description: The subject of the email
 *         text:
 *           type: string
 *           description: The text content of the email
 *       example:
 *         to: 'example@example.com'
 *         subject: 'Test Email'
 *         text: 'This is a test email'
 *         html: '<p>This is a <b>test</b> email</p>'
 */

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to send email
 */
router.post('/send', (req, res) => emailController.sendEmailHandler(req, res));

export default router;
