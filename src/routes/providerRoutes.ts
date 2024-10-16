import { Router } from 'express';
import { container } from '../inversify.config';
import { ProviderController } from '../controller/ProviderController';

const router = Router();
const providerController =
  container.get<ProviderController>(ProviderController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - name
 *         - active
 *       properties:
 *         name:
 *           type: string
 *           description: The provider name
 *         active:
 *           type: boolean
 *           description: Whether the provider is active
 *       example:
 *         name: 'SendGrid'
 *         active: true
 */

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Get all providers
 *     responses:
 *       200:
 *         description: A list of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 */

/**
 * @swagger
 * /api/providers/switch:
 *   put:
 *     summary: Switch the current provider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 description: The provider name
 *             example:
 *               provider: 'SendGrid'
 *     responses:
 *       200:
 *         description: Provider switched successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to switch provider
 */
router.get('/', (req, res) => providerController.getProvidersHandler(req, res));
router.put('/switch', (req, res) =>
  providerController.switchProviderHandler(req, res),
);

export default router;
