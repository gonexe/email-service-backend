import { ProviderType } from 'shared';
import envVars from './validateEnv';

const sendGridApiKey = envVars.SENDGRID_API_KEY;
const senderEmail = envVars.SENDGRID_SENDER_EMAIL;
const predefinedProvider =
  envVars.PREDEFINED_PROVIDER as keyof typeof ProviderType;

if (!sendGridApiKey) {
  throw new Error('SENDGRID_API_KEY is not defined');
}
if (!senderEmail) {
  throw new Error('SENDGRID_SENDER_EMAIL is not defined');
}
if (
  !predefinedProvider ||
  !Object.values(ProviderType).includes(ProviderType[predefinedProvider])
) {
  throw new Error('PREDEFINED_PROVIDER is not defined or invalid');
}

export const activeProvider: ProviderType = ProviderType[predefinedProvider];
export let currentProvider: ProviderType = activeProvider;

export const setCurrentProvider = (provider: ProviderType): void => {
  currentProvider = provider;
};
