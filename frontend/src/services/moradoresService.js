import { request } from './api';

/**
 * Serviços de integração com os endpoints REST de Moradores.
 */
export const moradoresService = {
  /**
   * Lista moradores com filtro de pesquisa opcional e ordenação alfabética (asc/desc).
   */
  async listar(pesquisa = '', direcao = 'asc') {
    const params = new URLSearchParams();
    if (pesquisa && pesquisa.trim()) {
      params.append('pesquisa', pesquisa.trim());
    }
    if (direcao) {
      params.append('direcao', direcao);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/moradores${query}`, { method: 'GET' });
  },

  /**
   * Busca um morador específico por ID.
   */
  async buscarPorId(id) {
    return request(`/moradores/${id}`, { method: 'GET' });
  },

  /**
   * Cadastra um novo morador.
   * morador: { nome: string, chavePix: string }
   */
  async cadastrar(morador) {
    return request('/moradores', {
      method: 'POST',
      body: morador,
    });
  },

  /**
   * Atualiza os dados de um morador existente.
   */
  async atualizar(id, morador) {
    return request(`/moradores/${id}`, {
      method: 'PUT',
      body: morador,
    });
  },

  /**
   * Exclui um morador pelo ID.
   */
  async excluir(id) {
    return request(`/moradores/${id}`, { method: 'DELETE' });
  },
};

export default moradoresService;
