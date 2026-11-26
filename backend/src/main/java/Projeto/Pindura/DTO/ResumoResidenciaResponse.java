package Projeto.Pindura.DTO;

import Projeto.Pindura.Model.Despesa;

import java.math.BigDecimal;
import java.util.List;

/**
 * Resumo da residência para a tela inicial do aplicativo mobile.
 */
public class ResumoResidenciaResponse {

    private String nomeResidencia;
    private long totalMoradores;
    private long totalDespesas;
    private BigDecimal valorTotal;
    private List<Despesa> ultimasDespesas;

    public ResumoResidenciaResponse() {
    }

    public ResumoResidenciaResponse(String nomeResidencia,
                                    long totalMoradores,
                                    long totalDespesas,
                                    BigDecimal valorTotal,
                                    List<Despesa> ultimasDespesas) {
        this.nomeResidencia = nomeResidencia;
        this.totalMoradores = totalMoradores;
        this.totalDespesas = totalDespesas;
        this.valorTotal = valorTotal;
        this.ultimasDespesas = ultimasDespesas;
    }

    public String getNomeResidencia() {
        return nomeResidencia;
    }

    public void setNomeResidencia(String nomeResidencia) {
        this.nomeResidencia = nomeResidencia;
    }

    public long getTotalMoradores() {
        return totalMoradores;
    }

    public void setTotalMoradores(long totalMoradores) {
        this.totalMoradores = totalMoradores;
    }

    public long getTotalDespesas() {
        return totalDespesas;
    }

    public void setTotalDespesas(long totalDespesas) {
        this.totalDespesas = totalDespesas;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<Despesa> getUltimasDespesas() {
        return ultimasDespesas;
    }

    public void setUltimasDespesas(List<Despesa> ultimasDespesas) {
        this.ultimasDespesas = ultimasDespesas;
    }
}
