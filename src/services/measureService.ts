import { MeasureModel, MeasureAttributes } from '../models/measureModel';
import { Op } from 'sequelize';
import { GeminiService, GeminiResponse } from './geminiService';

// Interface para os parâmetros necessários para criar uma nova medida
interface CreateMeasureParams {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export const measureService = {
  // Método para criar uma nova leitura
  async createMeasure(params: CreateMeasureParams): Promise<GeminiResponse> {
    const { image, customer_code, measure_datetime, measure_type } = params;

    // Verifica se já existe uma leitura no mês atual para o tipo de medida
    const existingMeasure = await MeasureModel.findOne({
      where: {
        customer_code,
        measure_type,
        measure_datetime: {
          [Op.between]: [
            new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1),
            new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0),
          ],
        },
      },
    });

    if (existingMeasure) {
      throw { code: 'DOUBLE_REPORT', message: 'Leitura do mês já realizada' };
    }

    // Chama o serviço Gemini para processar a imagem e obter a leitura
    const geminiResult = await GeminiService.processImage(image);

    // Cria e salva a nova medida no banco de dados
    await MeasureModel.create({
      customer_code,
      measure_datetime,
      measure_type,
      image_url: geminiResult.image_url,
      measure_value: geminiResult.measure_value,
      measure_uuid: geminiResult.measure_uuid,
    });

    return geminiResult;
  },

  // Método para confirmar ou corrigir uma leitura existente
  async confirmMeasure(measure_uuid: string, confirmed_value: number): Promise<void> {
    const measure = await MeasureModel.findOne({ where: { measure_uuid } });

    if (!measure) {
      throw { code: 'MEASURE_NOT_FOUND', message: 'Leitura não encontrada' };
    }

    if (measure.has_confirmed) {
      throw { code: 'CONFIRMATION_DUPLICATE', message: 'Leitura já confirmada' };
    }

    // Atualiza a leitura com o valor confirmado e marca como confirmada
    measure.measure_value = confirmed_value;
    measure.has_confirmed = true;

    await measure.save();
  },

  // Método para listar as leituras realizadas por um cliente
  async listMeasures(customer_code: string, measure_type?: string): Promise<MeasureAttributes[]> {
    const whereClause: any = { customer_code };

    if (measure_type) {
      whereClause.measure_type = measure_type.toUpperCase();
    }

    const measures = await MeasureModel.findAll({ where: whereClause });

    if (measures.length === 0) {
      throw { code: 'MEASURES_NOT_FOUND', message: 'Nenhuma leitura encontrada' };
    }

    return measures.map(measure => measure.get({ plain: true }) as MeasureAttributes);
  },
};
