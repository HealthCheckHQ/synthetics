import request from 'supertest';
import { App } from '@/app';
import { HealthRoute } from '@/routes/health.router';
import { SYNTHETICS_CONFIG } from '@/config';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Health Check API', () => {
  const route = new HealthRoute();
  const app = new App([route]);

  describe('[GET] /', () => {
    it('response should have response ok', async () => {
      const response =  await request(app.getServer()).get('/');
      expect(response.body.status).toEqual('OK')
    });
  });

  describe('[GET] /health', () => {
    it('response should have the Create userData', async () => {
      const response =  await request(app.getServer()).get('/health').set(SYNTHETICS_CONFIG.apiAuthKey, SYNTHETICS_CONFIG.apiAuthValue);
      expect(response.body.status).toEqual('OK')
    });
  });
});
