import { request } from './api';

/**
 * Serviço para obtenção do resumo da república (KPIs e últimas despesas).
 */
export const resumoService = {
  /**
   * Retorna os dados consolidados: totalMoradores, totalDespesas, valorTotal e ultimasDespesas.
   */
  async obterResumo() {
    return request('/resumo', { method: 'GET' });
  },
};

export default resumoService;
