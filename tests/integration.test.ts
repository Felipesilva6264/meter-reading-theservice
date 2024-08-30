const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Integration Tests', () => {
  it('should create a new measure', async () => {
    const response = await request(app)
      .post('/api/measures')
      .send({
        image: 'imageData',
        customer_code: '123456',
        measure_datetime: new Date(),
        measure_type: 'WATER',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('measure_uuid');
  });
});
