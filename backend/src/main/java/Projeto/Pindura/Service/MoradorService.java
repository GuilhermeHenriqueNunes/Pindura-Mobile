package Projeto.Pindura.Service;

import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Repository.DespesaRepository;
import Projeto.Pindura.Repository.MoradorRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MoradorService {

    private final MoradorRepository moradorRepository;
    private final DespesaRepository despesaRepository;

    public MoradorService(MoradorRepository moradorRepository, DespesaRepository despesaRepository) {
        this.moradorRepository = moradorRepository;
        this.despesaRepository = despesaRepository;
    }

    /**
     * Lista moradores, aplicando pesquisa por nome (se informada) e ordenação por nome.
     *
     * @param nome    termo de pesquisa; null/vazio retorna todos
     * @param direcao "asc" (padrão) ou "desc"
     */
    public List<Morador> listar(String nome, String direcao) {
        Sort sort = Sort.by("nome");
        sort = "desc".equalsIgnoreCase(direcao) ? sort.descending() : sort.ascending();

        if (nome != null && !nome.isBlank()) {
            return moradorRepository.findByNomeContainingIgnoreCase(nome, sort);
        }
        return moradorRepository.findAll(sort);
    }

    public Morador buscarPorId(Long id) {
        return moradorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Morador não encontrado (id: " + id + ")"));
    }

    public Morador salvar(Morador morador) {
        return moradorRepository.save(morador);
    }

    /**
     * Atualiza um morador existente garantindo que o ID informado exista no banco.
     */
    public Morador atualizar(Long id, Morador dadosAtualizados) {
        Morador existente = buscarPorId(id);
        existente.setNome(dadosAtualizados.getNome());
        existente.setChavePix(dadosAtualizados.getChavePix());
        return moradorRepository.save(existente);
    }

    public void excluir(Long id) {
        if (!moradorRepository.existsById(id)) {
            throw new NoSuchElementException("Morador não encontrado (id: " + id + ")");
        }
        if (despesaRepository.existsByPagadorId(id) || despesaRepository.existsByParticipantesId(id)) {
            throw new DataIntegrityViolationException(
                    "Não é possível excluir este morador pois ele está vinculado a uma ou mais despesas."
            );
        }
        moradorRepository.deleteById(id);
    }
}
