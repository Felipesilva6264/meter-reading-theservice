import { measureService } from '../services/measureService';
import { MeasureModel } from '../models/measureModel';

jest.mock('../models/measureModel');

describe('Measure Service Tests', () => {
  it('should create a new measure', async () => {
    (MeasureModel.findOne as jest.Mock).mockResolvedValue(null);
    (MeasureModel.create as jest.Mock).mockResolvedValue({});

    const result = await measureService.createMeasure({
      image: 'imageData',
      customer_code: '123456',
      measure_datetime: new Date(),
      measure_type: 'WATER',
    });

    expect(result).toHaveProperty('measure_uuid');
    expect(result).toHaveProperty('measure_value');
  });
});
