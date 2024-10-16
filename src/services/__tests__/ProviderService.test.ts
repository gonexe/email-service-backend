import 'reflect-metadata';
import { ProviderType } from 'shared';
import ProviderService from '../ProviderService';
import { setCurrentProvider } from '../../config/providerConfig';

jest.mock('../../config/providerConfig', () => ({
  currentProvider: ProviderType.SendGrid,
  setCurrentProvider: jest.fn(),
}));

describe('ProviderService', () => {
  let providerService: ProviderService;

  beforeEach(() => {
    providerService = new ProviderService();
  });

  it('should return the list of providers with correct active status', () => {
    const providers = providerService.getProviders();
    expect(providers).toEqual([
      { name: ProviderType.SendGrid, active: true },
      { name: ProviderType.Mailgun, active: false },
    ]);
  });

  it('should switch the current provider', () => {
    providerService.switchProvider(ProviderType.Mailgun);
    expect(setCurrentProvider).toHaveBeenCalledWith(ProviderType.Mailgun);
  });
});
