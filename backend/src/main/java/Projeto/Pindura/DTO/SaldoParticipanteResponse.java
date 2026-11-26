package Projeto.Pindura.DTO;

import java.math.BigDecimal;

/**
 * Representa o valor devido por um participante ao pagador da despesa.
 */
public class SaldoParticipanteResponse {

    private Long moradorId;
    private String nome;
    private String chavePix;
    private BigDecimal valorDevido;

    public SaldoParticipanteResponse() {
    }

    public SaldoParticipanteResponse(Long moradorId, String nome, String chavePix, BigDecimal valorDevido) {
        this.moradorId = moradorId;
        this.nome = nome;
        this.chavePix = chavePix;
        this.valorDevido = valorDevido;
    }

    public Long getMoradorId() {
        return moradorId;
    }

    public void setMoradorId(Long moradorId) {
        this.moradorId = moradorId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public BigDecimal getValorDevido() {
        return valorDevido;
    }

    public void setValorDevido(BigDecimal valorDevido) {
        this.valorDevido = valorDevido;
    }
}
