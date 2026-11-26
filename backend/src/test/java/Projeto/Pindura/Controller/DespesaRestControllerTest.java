package Projeto.Pindura.Controller;

import Projeto.Pindura.DTO.DespesaDetalhesResponse;
import Projeto.Pindura.DTO.DespesaRequest;
import Projeto.Pindura.DTO.SaldoParticipanteResponse;
import Projeto.Pindura.Exception.ApiExceptionHandler;
import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Service.DespesaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DespesaRestController.class)
@Import(ApiExceptionHandler.class)
class DespesaRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DespesaService despesaService;

    @Test
    void deveListarDespesasComOrdenacaoEPesquisa() throws Exception {
        Morador pagador = new Morador("Guilherme", "pix-gui");
        pagador.setId(1L);
        Morador p2 = new Morador("Marcos", "pix-marcos");
        p2.setId(2L);

        Despesa despesa = new Despesa(
                "Conta de Luz",
                new BigDecimal("150.00"),
                LocalDate.of(2026, 11, 24),
                "Outubro",
                pagador,
                List.of(pagador, p2)
        );
        despesa.setId(10L);

        when(despesaService.listar("Luz", "valor", "desc")).thenReturn(List.of(despesa));

        mockMvc.perform(get("/api/despesas")
                        .param("pesquisa", "Luz")
                        .param("ordenarPor", "valor")
                        .param("direcao", "desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(10))
                .andExpect(jsonPath("$[0].titulo").value("Conta de Luz"))
                .andExpect(jsonPath("$[0].valorPorParticipante").value(75.00));
    }

    @Test
    void deveRetornarDetalhesComSaldosCalculados() throws Exception {
        Morador pagador = new Morador("Guilherme", "pix-gui");
        pagador.setId(1L);
        Morador p2 = new Morador("Marcos", "pix-marcos");
        p2.setId(2L);

        DespesaDetalhesResponse detalhes = new DespesaDetalhesResponse();
        detalhes.setId(10L);
        detalhes.setTitulo("Conta de Luz");
        detalhes.setValor(new BigDecimal("150.00"));
        detalhes.setData(LocalDate.of(2026, 11, 24));
        detalhes.setPagador(pagador);
        detalhes.setParticipantes(List.of(pagador, p2));
        detalhes.setValorPorParticipante(new BigDecimal("75.00"));
        detalhes.setSaldos(List.of(new SaldoParticipanteResponse(2L, "Marcos", "pix-marcos", new BigDecimal("75.00"))));

        when(despesaService.buscarDetalhesPorId(10L)).thenReturn(detalhes);

        mockMvc.perform(get("/api/despesas/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valorPorParticipante").value(75.00))
                .andExpect(jsonPath("$.saldos[0].nome").value("Marcos"))
                .andExpect(jsonPath("$.saldos[0].valorDevido").value(75.00));
    }

    @Test
    void deveCadastrarAtualizarEExcluirDespesa() throws Exception {
        DespesaDetalhesResponse resposta = new DespesaDetalhesResponse();
        resposta.setId(10L);
        resposta.setTitulo("Internet");
        resposta.setValor(new BigDecimal("100.00"));

        when(despesaService.cadastrar(any(DespesaRequest.class))).thenReturn(resposta);
        when(despesaService.atualizar(eq(10L), any(DespesaRequest.class))).thenReturn(resposta);
        doNothing().when(despesaService).excluir(10L);

        DespesaRequest request = new DespesaRequest();
        request.setTitulo("Internet");
        request.setValor(new BigDecimal("100.00"));
        request.setData(LocalDate.of(2026, 11, 24));
        request.setPagadorId(1L);
        request.setParticipantesIds(List.of(1L, 2L));

        mockMvc.perform(post("/api/despesas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10));

        mockMvc.perform(put("/api/despesas/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Internet"));

        mockMvc.perform(delete("/api/despesas/10"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deveValidarCamposObrigatoriosDaDespesa() throws Exception {
        DespesaRequest invalido = new DespesaRequest();

        mockMvc.perform(post("/api/despesas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalido)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.titulo").value("O título é obrigatório"))
                .andExpect(jsonPath("$.errors.valor").value("O valor é obrigatório"))
                .andExpect(jsonPath("$.errors.data").value("A data é obrigatória"))
                .andExpect(jsonPath("$.errors.pagadorId").value("O pagador é obrigatório"))
                .andExpect(jsonPath("$.errors.participantesIds").value("Selecione ao menos um participante"));
    }

    @Test
    void deveRetornar404QuandoDespesaNaoExistir() throws Exception {
        when(despesaService.buscarDetalhesPorId(77L))
                .thenThrow(new NoSuchElementException("Despesa não encontrada (id: 77)"));

        mockMvc.perform(get("/api/despesas/77"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Despesa não encontrada (id: 77)"));
    }
}
