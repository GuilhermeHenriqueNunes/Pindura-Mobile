package Projeto.Pindura.Service;

import Projeto.Pindura.DTO.DespesaDetalhesResponse;
import Projeto.Pindura.DTO.DespesaRequest;
import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Repository.DespesaRepository;
import Projeto.Pindura.Repository.MoradorRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class DespesaService {

    private final DespesaRepository despesaRepository;
    private final MoradorRepository moradorRepository;

    public DespesaService(DespesaRepository despesaRepository, MoradorRepository moradorRepository) {
        this.despesaRepository = despesaRepository;
        this.moradorRepository = moradorRepository;
    }

    /**
     * Lista despesas, aplicando pesquisa por título (se informada) e ordenação.
     *
     * @param titulo          termo de pesquisa; null/vazio retorna todas
     * @param campoOrdenacao "titulo" (padrão), "valor" ou "data"
     * @param direcao         "asc" (padrão) ou "desc"
     */
    public List<Despesa> listar(String titulo, String campoOrdenacao, String direcao) {
        Sort sort = Sort.by(campoValido(campoOrdenacao));
        sort = "desc".equalsIgnoreCase(direcao) ? sort.descending() : sort.ascending();

        if (titulo != null && !titulo.isBlank()) {
            return despesaRepository.findByTituloContainingIgnoreCase(titulo, sort);
        }
        return despesaRepository.findAll(sort);
    }

    private String campoValido(String campo) {
        // Protege contra Sort de um campo inexistente vindo de um parametro de URL
        if ("valor".equalsIgnoreCase(campo)) {
            return "valor";
        }
        if ("data".equalsIgnoreCase(campo)) {
            return "data";
        }
        return "titulo";
    }

    public Despesa buscarPorId(Long id) {
        return despesaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Despesa não encontrada (id: " + id + ")"));
    }

    /**
     * Retorna a despesa detalhada com o valor por participante e os saldos devidos ao pagador.
     */
    public DespesaDetalhesResponse buscarDetalhesPorId(Long id) {
        Despesa despesa = buscarPorId(id);
        return DespesaDetalhesResponse.from(despesa, calcularSaldos(despesa));
    }

    /**
     * Cadastra uma nova despesa a partir do payload JSON da API REST.
     */
    public DespesaDetalhesResponse cadastrar(DespesaRequest request) {
        Despesa despesa = new Despesa();
        aplicarDados(despesa, request);
        Despesa salva = salvar(despesa, request.getPagadorId(), request.getParticipantesIds());
        return DespesaDetalhesResponse.from(salva, calcularSaldos(salva));
    }

    /**
     * Atualiza uma despesa existente a partir do payload JSON da API REST.
     */
    public DespesaDetalhesResponse atualizar(Long id, DespesaRequest request) {
        Despesa existente = buscarPorId(id);
        aplicarDados(existente, request);
        Despesa salva = salvar(existente, request.getPagadorId(), request.getParticipantesIds());
        return DespesaDetalhesResponse.from(salva, calcularSaldos(salva));
    }

    private void aplicarDados(Despesa despesa, DespesaRequest request) {
        despesa.setTitulo(request.getTitulo());
        despesa.setValor(request.getValor());
        despesa.setData(request.getData());
        despesa.setDescricao(request.getDescricao());
    }

    /**
     * Salva uma despesa (nova ou existente), resolvendo pagador e participantes
     * a partir dos IDs vindos do formulário ou da API REST.
     */
    public Despesa salvar(Despesa despesa, Long pagadorId, List<Long> participantesIds) {
        if (pagadorId == null) {
            throw new IllegalArgumentException("O pagador é obrigatório");
        }
        Morador pagador = moradorRepository.findById(pagadorId)
                .orElseThrow(() -> new NoSuchElementException("Pagador inválido"));
        despesa.setPagador(pagador);

        if (participantesIds == null || participantesIds.isEmpty()) {
            throw new IllegalArgumentException("Selecione ao menos um participante");
        }
        Set<Long> idsUnicos = new HashSet<>(participantesIds);
        List<Morador> participantes = moradorRepository.findAllById(idsUnicos);
        if (participantes.size() != idsUnicos.size()) {
            throw new IllegalArgumentException("Um ou mais participantes informados são inválidos");
        }
        despesa.setParticipantes(participantes);

        return despesaRepository.save(despesa);
    }

    public void excluir(Long id) {
        if (!despesaRepository.existsById(id)) {
            throw new NoSuchElementException("Despesa não encontrada (id: " + id + ")");
        }
        despesaRepository.deleteById(id);
    }

    /**
     * Regra de negócio principal (Fase 4): calcula quanto cada participante deve
     * ao pagador. O próprio pagador não aparece no mapa, pois sua parcela já foi
     * coberta ao pagar o total da despesa.
     */
    public Map<Morador, BigDecimal> calcularSaldos(Despesa despesa) {
        BigDecimal parcela = despesa.getValorPorParticipante();
        Map<Morador, BigDecimal> saldos = new LinkedHashMap<>();

        for (Morador participante : despesa.getParticipantes()) {
            if (participante.equals(despesa.getPagador())) {
                continue;
            }
            saldos.put(participante, parcela);
        }
        return saldos;
    }
}
