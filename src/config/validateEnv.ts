import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_SENDER_EMAIL: Joi.string().email().required(),
  PREDEFINED_PROVIDER: Joi.string().valid('SendGrid', 'Mailgun').required(),
  PORT: Joi.number().default(3000),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
