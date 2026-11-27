/**
 * Configuração central da API REST do Pindura.
 *
 * NOTA PARA APRESENTAÇÃO:
 * - No seu celular físico via Expo Go (conectado no mesmo Wi-Fi):
 *   Seu IP atual detectado é: 'http://192.168.0.7:8080/api'
 * - Em emulador Android oficial: utilize 'http://10.0.2.2:8080/api'
 */
export const API_BASE_URL = 'http://192.168.0.7:8080/api';

/**
 * Função utilitária para executar requisições HTTP com timeout e tratamento de erros amigável.
 */
export async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const timeoutMs = 8000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    clearTimeout(id);

    // Resposta 204 No Content (ex: exclusão bem-sucedida)
    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        (data && (data.mensagem || data.message || data.error)) ||
        `Erro na requisição (código ${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Tempo limite de conexão esgotado. Verifique se o servidor Spring Boot está em execução.');
    }
    if (error.message && error.message.includes('Network request failed')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique o IP configurado em api.js e se o backend está rodando.');
    }
    throw error;
  }
}
