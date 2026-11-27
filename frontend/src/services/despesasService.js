import { request } from './api';

/**
 * Serviços de integração com os endpoints REST de Despesas.
 */
export const despesasService = {
  /**
   * Lista despesas com filtro de pesquisa por título e ordenação.
   * ordenarPor: 'titulo' | 'valor' | 'data'
   * direcao: 'asc' | 'desc'
   */
  async listar(pesquisa = '', ordenarPor = 'data', direcao = 'desc') {
    const params = new URLSearchParams();
    if (pesquisa && pesquisa.trim()) {
      params.append('pesquisa', pesquisa.trim());
    }
    if (ordenarPor) {
      params.append('ordenarPor', ordenarPor);
    }
    if (direcao) {
      params.append('direcao', direcao);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/despesas${query}`, { method: 'GET' });
  },

  /**
   * Busca os detalhes completos de uma despesa, incluindo cálculo do rateio por pessoa e lista de participantes.
   */
  async buscarPorId(id) {
    return request(`/despesas/${id}`, { method: 'GET' });
  },

  /**
   * Cadastra uma nova despesa com pagador e participantes.
   * despesa: { titulo, valor, data, descricao, pagadorId, participantesIds }
   */
  async cadastrar(despesa) {
    return request('/despesas', {
      method: 'POST',
      body: despesa,
    });
  },

  /**
   * Atualiza uma despesa existente.
   */
  async atualizar(id, despesa) {
    return request(`/despesas/${id}`, {
      method: 'PUT',
      body: despesa,
    });
  },

  /**
   * Exclui uma despesa pelo ID.
   */
  async excluir(id) {
    return request(`/despesas/${id}`, { method: 'DELETE' });
  },
};

export default despesasService;
