import { Request, Response } from 'express';
import { CustomRequest, CustomResponse } from '../types'; // Importe a interface personalizada
import { measureService } from '../services/measureService';
import { GeminiResponse } from '../services/geminiService';

// Função para criar uma nova medida
export const createMeasure = async (req: CustomRequest, res: CustomResponse): Promise<Response> => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validação dos campos obrigatórios
    if (typeof image !== 'string' || typeof customer_code !== 'string' ||
        !(typeof measure_datetime === 'string' && !isNaN(Date.parse(measure_datetime))) ||
        (measure_type !== 'WATER' && measure_type !== 'GAS')) {
      return res.status(400).json({
        error_code: 'INVALID_INPUT',
        error_description: 'Dados de entrada inválidos ou ausentes.',
      });
    }

    // Conversão do campo measure_datetime para Date
    const formattedDate = new Date(measure_datetime);

    // Chama o serviço para criar uma nova leitura
    const result: GeminiResponse = await measureService.createMeasure({
      image,
      customer_code,
      measure_datetime: formattedDate,
      measure_type: measure_type as 'WATER' | 'GAS',
    });

    return res.status(200).json(result);
  } catch (error) {
    // Garantir que error seja do tipo Error
    if (error instanceof Error) {
      return res.status(400).json({
        error_code: 'UNKNOWN_ERROR',
        error_description: error.message,
      });
    } else {
      return res.status(400).json({
        error_code: 'UNKNOWN_ERROR',
        error_description: 'Ocorreu um erro desconhecido.',
      });
    }
  }
};

// Função para confirmar uma medida existente
export const confirmMeasure = async (req: CustomRequest, res: CustomResponse): Promise<Response> => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    // Validação dos campos obrigatórios
    if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
      return res.status(400).json({
        error_code: 'INVALID_INPUT',
        error_description: 'Dados de entrada inválidos ou ausentes.',
      });
    }

    // Chama o serviço para confirmar ou corrigir a leitura
    await measureService.confirmMeasure(measure_uuid, confirmed_value);

    return res.status(200).json({ success: true });
  } catch (error) {
    // Garantir que error seja do tipo Error
    if (error instanceof Error) {
      return res.status(400).json({
        error_code: 'UNKNOWN_ERROR',
        error_description: error.message,
      });
    } else {
      return res.status(400).json({
        error_code: 'UNKNOWN_ERROR',
        error_description: 'Ocorreu um erro desconhecido.',
      });
    }
  }
};

// Função para listar medidas com base no código do cliente
export const listMeasures = async (req: CustomRequest, res: CustomResponse): Promise<Response> => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Validação dos parâmetros
    if (typeof customer_code !== 'string' || (measure_type && typeof measure_type !== 'string')) {
      return res.status(400).json({
        error_code: 'INVALID_INPUT',
        error_description: 'Dados de entrada inválidos ou ausentes.',
      });
    }

    // Chama o serviço para listar as medidas
    const measures = await measureService.listMeasures(customer_code, measure_type as string);

    return res.status(200).json({ customer_code, measures });
  } catch (error) {
    // Garantir que error seja do tipo Error
    if (error instanceof Error) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: error.message,
      });
    } else {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Ocorreu um erro desconhecido.',
      });
    }
  }
};
