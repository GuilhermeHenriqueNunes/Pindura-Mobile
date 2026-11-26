package Projeto.Pindura.Controller;

import Projeto.Pindura.Exception.ApiExceptionHandler;
import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Service.MoradorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MoradorRestController.class)
@Import(ApiExceptionHandler.class)
class MoradorRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MoradorService moradorService;

    @Test
    void deveListarMoradoresComFiltroEOrdenacao() throws Exception {
        Morador guilherme = new Morador("Guilherme", "12345678900");
        guilherme.setId(1L);
        when(moradorService.listar("Gui", "desc")).thenReturn(List.of(guilherme));

        mockMvc.perform(get("/api/moradores")
                        .param("pesquisa", "Gui")
                        .param("direcao", "desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nome").value("Guilherme"))
                .andExpect(jsonPath("$[0].chavePix").value("12345678900"));
    }

    @Test
    void deveRetornar404QuandoMoradorNaoExistir() throws Exception {
        when(moradorService.buscarPorId(99L))
                .thenThrow(new NoSuchElementException("Morador não encontrado (id: 99)"));

        mockMvc.perform(get("/api/moradores/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Morador não encontrado (id: 99)"));
    }

    @Test
    void deveCadastrarMoradorValido() throws Exception {
        Morador salvo = new Morador("Marcos", "marcos@pix.com");
        salvo.setId(2L);
        when(moradorService.salvar(any(Morador.class))).thenReturn(salvo);

        Morador payload = new Morador("Marcos", "marcos@pix.com");

        mockMvc.perform(post("/api/moradores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.nome").value("Marcos"));
    }

    @Test
    void deveRetornar400QuandoNomeEstiverEmBranco() throws Exception {
        Morador payload = new Morador("", "pix");

        mockMvc.perform(post("/api/moradores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.nome").value("O nome é obrigatório"));
    }

    @Test
    void deveAtualizarEExcluirMorador() throws Exception {
        Morador atualizado = new Morador("Marcos Editado", "nova-chave");
        atualizado.setId(2L);
        when(moradorService.atualizar(eq(2L), any(Morador.class))).thenReturn(atualizado);
        doNothing().when(moradorService).excluir(2L);

        mockMvc.perform(put("/api/moradores/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(atualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Marcos Editado"));

        mockMvc.perform(delete("/api/moradores/2"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deveRetornar409AoExcluirMoradorComDespesas() throws Exception {
        doThrow(new DataIntegrityViolationException("Morador vinculado a despesas."))
                .when(moradorService).excluir(1L);

        mockMvc.perform(delete("/api/moradores/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.message").value("Morador vinculado a despesas."));
    }
}
