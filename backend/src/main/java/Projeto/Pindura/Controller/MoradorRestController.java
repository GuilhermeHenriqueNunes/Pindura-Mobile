package Projeto.Pindura.Controller;

import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Service.MoradorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API REST para gerenciamento de moradores consumida pelo aplicativo mobile.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/moradores")
public class MoradorRestController {

    private final MoradorService moradorService;

    public MoradorRestController(MoradorService moradorService) {
        this.moradorService = moradorService;
    }

    @GetMapping
    public ResponseEntity<List<Morador>> listar(@RequestParam(required = false) String pesquisa,
                                                @RequestParam(defaultValue = "asc") String direcao) {
        return ResponseEntity.ok(moradorService.listar(pesquisa, direcao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Morador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(moradorService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Morador> cadastrar(@Valid @RequestBody Morador morador) {
        // Garante criação de novo registro mesmo se o payload enviar id preenchido
        morador.setId(null);
        Morador salvo = moradorService.salvar(morador);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Morador> atualizar(@PathVariable Long id,
                                             @Valid @RequestBody Morador morador) {
        return ResponseEntity.ok(moradorService.atualizar(id, morador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        moradorService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
