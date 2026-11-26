package Projeto.Pindura.Repository;

import Projeto.Pindura.Model.Despesa;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Override
    @EntityGraph(attributePaths = {"pagador", "participantes"})
    List<Despesa> findAll(Sort sort);

    @Override
    @EntityGraph(attributePaths = {"pagador", "participantes"})
    Optional<Despesa> findById(Long id);

    // Pesquisa por título, já aceitando Sort para atender ordenação (título, valor ou data)
    @EntityGraph(attributePaths = {"pagador", "participantes"})
    List<Despesa> findByTituloContainingIgnoreCase(String titulo, Sort sort);

    boolean existsByPagadorId(Long pagadorId);

    boolean existsByParticipantesId(Long moradorId);
}
