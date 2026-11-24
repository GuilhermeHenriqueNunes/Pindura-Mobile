# Mapeamento do Back-end Pindura & Adaptação para React Native

## 1. Visão Geral da Arquitetura
O back-end do Pindura está estruturado em camadas no pacote `Projeto.Pindura`:
- **Model:** `Morador.java`, `Despesa.java`
- **Repository:** `MoradorRepository.java`, `DespesaRepository.java`
- **Service:** `MoradorService.java`, `DespesaService.java`
- **Controller:** Inicialmente implementado com `@Controller` + Thymeleaf para a aplicação Web.

## 2. Adaptação Obrigatória para o Mobile (Conforme Aula de Hooks e Integração)
Para integrar ao app React Native, os controladores precisam expor uma API RESTful retornando JSON (`@RestController` ou novos controllers em `/api/...`) com anotação `@CrossOrigin` liberada para desenvolvimento mobile:

```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/moradores")
public class MoradorRestController { ... }

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/despesas")
public class DespesaRestController { ... }
```

## 3. Endpoints REST da API Pindura

### Moradores (`/api/moradores`)
- `GET /api/moradores`: Lista moradores. Suporta parâmetros `?pesquisa={nome}&direcao={asc|desc}`.
- `GET /api/moradores/{id}`: Busca um morador por ID. Retorna `404 Not Found` se não existir.
- `POST /api/moradores`: Cadastra novo morador. Payload JSON: `{"nome": "Guilherme", "chavePix": "12345678900"}`.
- `PUT /api/moradores/{id}`: Atualiza morador existente.
- `DELETE /api/moradores/{id}`: Exclui morador.

### Despesas (`/api/despesas`)
- `GET /api/despesas`: Lista despesas com suporte a `?pesquisa={titulo}&ordenarPor={titulo|valor|data}&direcao={asc|desc}`.
- `GET /api/despesas/{id}`: Retorna os detalhes da despesa e o cálculo de divisão de saldos.
- `POST /api/despesas`: Cadastra nova despesa.
  ```json
  {
    "titulo": "Conta de Luz",
    "valor": 150.00,
    "data": "2026-11-24",
    "descricao": "Referente a outubro",
    "pagadorId": 1,
    "participantesIds": [1, 2, 3]
  }
  ```
- `PUT /api/despesas/{id}`: Atualiza a despesa existente.
- `DELETE /api/despesas/{id}`: Exclui a despesa.

## 4. Regra de Negócio: Divisão de Saldos
No `DespesaService`:
`valorPorParticipante = valor.divide(BigDecimal.valueOf(participantes.size()), 2, RoundingMode.HALF_UP)`
Cada participante deve o valor de sua cota para o pagador da despesa. O morador pagador recebe a cota dos demais.
