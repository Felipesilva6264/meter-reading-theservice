import { measureService } from '../services/measureService';
import { Request, Response } from 'express';
import measureController from '../controllers/measureController';

jest.mock('../services/measureService');

describe('Measure Controller Tests', () => {
  it('should return 200 and the created measure', async () => {
    const req = {
      body: {
        image: 'imageData',
        customer_code: '123456',
        measure_datetime: new Date(),
        measure_type: 'WATER',
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (measureService.createMeasure as jest.Mock).mockResolvedValue({
      measure_uuid: 'uuid',
      image_url: 'url',
      measure_value: 100,
    });

    await measureController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      measure_uuid: 'uuid',
      image_url: 'url',
      measure_value: 100,
    });
  });
});
