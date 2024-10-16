import { Request, Response } from 'express';
import { ProviderType } from 'shared';
import { inject } from 'inversify';
import { controller, httpGet, httpPut } from 'inversify-express-utils';
import ProviderService from '../services/ProviderService';

@controller('/providers')
export class ProviderController {
  constructor(
    @inject(ProviderService) private providerService: ProviderService,
  ) {}

  @httpGet('/')
  public getProvidersHandler(_req: Request, res: Response): void {
    const providers = this.providerService.getProviders();
    res.status(200).json(providers);
  }

  @httpPut('/switch')
  public switchProviderHandler(req: Request, res: Response): void {
    const { provider } = req.body;
    if (!provider || !Object.values(ProviderType).includes(provider)) {
      res.status(400).send('Invalid provider');
      return;
    }
    this.providerService.switchProvider(provider as ProviderType);
    res.status(200).send(`Switched to ${provider}`);
  }
}
