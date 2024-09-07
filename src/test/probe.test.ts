import 'reflect-metadata';
import request from 'supertest';
import { App } from '@/app';
import { HealthRoute } from '@/routes/health.router';
import { SYNTHETICS_CONFIG } from '@/config';
import { ProbeOriginRoute } from '@/routes/probeOrigin.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Probe API', () => {
  const route = new ProbeOriginRoute();
  const app = new App([route]);

  describe('[POST] /probe', () => {
    it('response should have successresponse', async () => {
      const response =  await request(app.getServer()).post('/probe').set(SYNTHETICS_CONFIG.apiAuthKey, SYNTHETICS_CONFIG.apiAuthValue).send({
        "requestType": "get",
        "url": "https://service-api.mailmodo.com",
        "authentication": "BEARER",
        "timeout": 10000,
        "followRedirect": false,
        "token": "blahblah"
      });
      expect(response.body.success).toEqual(true)
      expect(response.status).toEqual(200)
    });
  });
});

