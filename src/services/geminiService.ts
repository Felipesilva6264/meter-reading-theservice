export interface GeminiResponse {
  measure_uuid: string;
  image_url: string;
  measure_value: number;
}

export const GeminiService = {
  // Método para processar a imagem e obter a leitura simulada
  async processImage(image: string): Promise<GeminiResponse> {
    // Simulação do processamento de imagem
    return {
      measure_uuid: '123e4567-e89b-12d3-a456-426614174000',
      image_url: 'http://example.com/image.jpg',
      measure_value: Math.floor(Math.random() * 1000), // Valor simulado da leitura
    };
  },
};
