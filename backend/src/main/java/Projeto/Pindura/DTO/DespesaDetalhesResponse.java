package Projeto.Pindura.DTO;

import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Model.Morador;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Resposta detalhada de uma despesa, incluindo valor por participante e saldos a acertar.
 */
public class DespesaDetalhesResponse {

    private Long id;
    private String titulo;
    private BigDecimal valor;
    private LocalDate data;
    private String descricao;
    private Morador pagador;
    private List<Morador> participantes;
    private BigDecimal valorPorParticipante;
    private List<SaldoParticipanteResponse> saldos;

    public DespesaDetalhesResponse() {
    }

    /**
     * Constrói o DTO de detalhes a partir da entidade e do mapa de saldos calculado no service.
     */
    public static DespesaDetalhesResponse from(Despesa despesa, Map<Morador, BigDecimal> saldosMap) {
        DespesaDetalhesResponse response = new DespesaDetalhesResponse();
        response.setId(despesa.getId());
        response.setTitulo(despesa.getTitulo());
        response.setValor(despesa.getValor());
        response.setData(despesa.getData());
        response.setDescricao(despesa.getDescricao());
        response.setPagador(despesa.getPagador());
        response.setParticipantes(despesa.getParticipantes());
        response.setValorPorParticipante(despesa.getValorPorParticipante());
        response.setSaldos(saldosMap.entrySet().stream()
                .map(entry -> new SaldoParticipanteResponse(
                        entry.getKey().getId(),
                        entry.getKey().getNome(),
                        entry.getKey().getChavePix(),
                        entry.getValue()
                ))
                .toList());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Morador getPagador() {
        return pagador;
    }

    public void setPagador(Morador pagador) {
        this.pagador = pagador;
    }

    public List<Morador> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<Morador> participantes) {
        this.participantes = participantes;
    }

    public BigDecimal getValorPorParticipante() {
        return valorPorParticipante;
    }

    public void setValorPorParticipante(BigDecimal valorPorParticipante) {
        this.valorPorParticipante = valorPorParticipante;
    }

    public List<SaldoParticipanteResponse> getSaldos() {
        return saldos;
    }

    public void setSaldos(List<SaldoParticipanteResponse> saldos) {
        this.saldos = saldos;
    }
}
