package Projeto.Pindura.Controller;

import Projeto.Pindura.DTO.ResumoResidenciaResponse;
import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Service.DespesaService;
import Projeto.Pindura.Service.MoradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

/**
 * Endpoint de resumo com KPIs da república para o dashboard do aplicativo mobile.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/resumo")
public class ResidenciaRestController {

    private final MoradorService moradorService;
    private final DespesaService despesaService;

    public ResidenciaRestController(MoradorService moradorService, DespesaService despesaService) {
        this.moradorService = moradorService;
        this.despesaService = despesaService;
    }

    @GetMapping
    public ResponseEntity<ResumoResidenciaResponse> obterResumo() {
        List<Despesa> despesas = despesaService.listar(null, "data", "desc");
        long totalMoradores = moradorService.listar(null, "asc").size();
        long totalDespesas = despesas.size();

        BigDecimal valorTotal = despesas.stream()
                .map(Despesa::getValor)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Despesa> ultimasDespesas = despesas.stream()
                .limit(5)
                .toList();

        return ResponseEntity.ok(new ResumoResidenciaResponse(
                "República Pindura",
                totalMoradores,
                totalDespesas,
                valorTotal,
                ultimasDespesas
        ));
    }
}
