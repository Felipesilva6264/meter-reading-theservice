// types.d.ts
import { Request, Response } from 'express';

// Interface CustomRequest estende Request para adicionar propriedades personalizadas
export interface CustomRequest extends Request {
  body: {
    image?: string;
    customer_code?: string;
    measure_datetime?: string;
    measure_type?: string;
    measure_uuid?: string;
    confirmed_value?: number;
    [key: string]: any; // Para suportar propriedades dinâmicas
  };
  params: {
    customer_code?: string;
    [key: string]: any; // Para suportar propriedades dinâmicas
  };
  query: {
    measure_type?: string;
    [key: string]: any; // Para suportar propriedades dinâmicas
  };
}

// Interface CustomResponse estende Response para garantir que json está disponível
export interface CustomResponse extends Response {
  json(body: any): this; // Garantir que json está corretamente tipado
  status(code: number): this; // Garantir que status está corretamente tipado
}

// Interface para o retorno do serviço Gemini
export interface GeminiResponse {
  measure_uuid: string;
  image_url: string;
  measure_value: number;
}

// Interface para os atributos do modelo Measure
export interface MeasureAttributes {
  id?: number;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  image_url: string;
  measure_value: number;
  measure_uuid: string;
  has_confirmed?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Interface para os parâmetros necessários para criar uma nova medida
export interface CreateMeasureParams {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}
