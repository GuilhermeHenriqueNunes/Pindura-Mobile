package Projeto.Pindura.Controller;

import Projeto.Pindura.DTO.DespesaDetalhesResponse;
import Projeto.Pindura.DTO.DespesaRequest;
import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Service.DespesaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API REST para gerenciamento e rateio de despesas consumida pelo aplicativo mobile.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/despesas")
public class DespesaRestController {

    private final DespesaService despesaService;

    public DespesaRestController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    @GetMapping
    public ResponseEntity<List<Despesa>> listar(@RequestParam(required = false) String pesquisa,
                                                @RequestParam(defaultValue = "titulo") String ordenarPor,
                                                @RequestParam(defaultValue = "asc") String direcao) {
        return ResponseEntity.ok(despesaService.listar(pesquisa, ordenarPor, direcao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DespesaDetalhesResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(despesaService.buscarDetalhesPorId(id));
    }

    @PostMapping
    public ResponseEntity<DespesaDetalhesResponse> cadastrar(@Valid @RequestBody DespesaRequest request) {
        DespesaDetalhesResponse salva = despesaService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DespesaDetalhesResponse> atualizar(@PathVariable Long id,
                                                             @Valid @RequestBody DespesaRequest request) {
        return ResponseEntity.ok(despesaService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        despesaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
