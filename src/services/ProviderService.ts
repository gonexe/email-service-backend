import { injectable } from 'inversify';
import { ProviderResponse, ProviderType } from 'shared';
import { currentProvider, setCurrentProvider } from '../config/providerConfig';

@injectable()
class ProviderService {
  public getProviders(): ProviderResponse[] {
    return [
      {
        name: ProviderType.SendGrid,
        active: currentProvider === ProviderType.SendGrid,
      },
      {
        name: ProviderType.Mailgun,
        active: currentProvider === ProviderType.Mailgun,
      },
    ];
  }

  public switchProvider(provider: ProviderType): void {
    setCurrentProvider(provider);
  }
}

export default ProviderService;
