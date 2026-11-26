package Projeto.Pindura.Service;

import Projeto.Pindura.DTO.DespesaDetalhesResponse;
import Projeto.Pindura.DTO.DespesaRequest;
import Projeto.Pindura.Model.Despesa;
import Projeto.Pindura.Model.Morador;
import Projeto.Pindura.Repository.DespesaRepository;
import Projeto.Pindura.Repository.MoradorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyIterable;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DespesaServiceTest {

    @Mock
    private DespesaRepository despesaRepository;

    @Mock
    private MoradorRepository moradorRepository;

    @InjectMocks
    private DespesaService despesaService;

    @Test
    void deveCadastrarECalcularDivisaoDeSaldosCorretamente() {
        Morador pagador = new Morador("Guilherme", "pix-1");
        pagador.setId(1L);
        Morador m2 = new Morador("Marcos", "pix-2");
        m2.setId(2L);
        Morador m3 = new Morador("Ana", "pix-3");
        m3.setId(3L);

        when(moradorRepository.findById(1L)).thenReturn(Optional.of(pagador));
        when(moradorRepository.findAllById(anyIterable())).thenReturn(List.of(pagador, m2, m3));
        when(despesaRepository.save(any(Despesa.class))).thenAnswer(inv -> {
            Despesa d = inv.getArgument(0);
            d.setId(5L);
            return d;
        });

        DespesaRequest request = new DespesaRequest();
        request.setTitulo("Mercado");
        request.setValor(new BigDecimal("100.00"));
        request.setData(LocalDate.of(2026, 11, 25));
        request.setPagadorId(1L);
        request.setParticipantesIds(List.of(1L, 2L, 3L));

        DespesaDetalhesResponse response = despesaService.cadastrar(request);

        assertEquals(new BigDecimal("33.33"), response.getValorPorParticipante());
        assertEquals(2, response.getSaldos().size());
        assertEquals("Marcos", response.getSaldos().get(0).getNome());
        assertEquals(new BigDecimal("33.33"), response.getSaldos().get(0).getValorDevido());
    }

    @Test
    void deveFalharQuandoParticipanteInformadoNaoExistir() {
        Morador pagador = new Morador("Guilherme", "pix-1");
        pagador.setId(1L);

        when(moradorRepository.findById(1L)).thenReturn(Optional.of(pagador));
        when(moradorRepository.findAllById(anyIterable())).thenReturn(List.of(pagador));

        DespesaRequest request = new DespesaRequest();
        request.setTitulo("Mercado");
        request.setValor(new BigDecimal("50.00"));
        request.setData(LocalDate.of(2026, 11, 25));
        request.setPagadorId(1L);
        request.setParticipantesIds(List.of(1L, 999L));

        assertThrows(IllegalArgumentException.class, () -> despesaService.cadastrar(request));
    }
}
