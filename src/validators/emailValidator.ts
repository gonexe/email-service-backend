import { body } from 'express-validator';

export const emailValidationRules = [
  body('to').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('subject').notEmpty().withMessage('Subject is required').escape(),
  body('text').notEmpty().withMessage('Text is required').escape(),
];
