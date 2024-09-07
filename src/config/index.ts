import { config } from 'dotenv';
config({ path: '.env' });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const SYNTHETICS_CONFIG = {
  apiAuthKey: process.env.API_KEY || 'SENTINEL_AUTH_KEY',
  apiAuthValue: process.env.API_KEY_VALUE || 'bd39004d-e21d-4a0b-ab93-eafa4d27de2e',
  location: process.env.LOCATION || 'default',
}
export const { NODE_ENV, PORT, SECRET_KEY, ORIGIN } = process.env;
