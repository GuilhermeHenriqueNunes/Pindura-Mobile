# Hooks em React Native e Integração com Back-end

**Arquivo original:** Hooks em React Native e Integração com Back-end.pdf | **Total de slides/páginas:** 42

---

### Slide/Página 1
Hooks em React Native e Integração com Back-end
19 de novembro de 2026

### Slide/Página 2
Objetivos da Aula
• Relembrar a estrutura da API RESTful de Gerenciamento
de Clientes em Spring Boot.
• Identificar os ajustes necessários no back-end para per-
mitir a integração com o app em React Native.
• Compreender o papel dos Hooks em componentes funci-
onais.
• Construir o front-end em React Native que consome a
API de Gerenciamento de Clientes.

### Slide/Página 3
Relembrando a API de Gerenciamento de Clientes 3 de 42
Relembrando a API deGerenciamento de Clientes

### Slide/Página 4
Relembrando a API de Gerenciamento de Clientes 4 de 42
Relembrando a API de Gerenciamento de Clientes
Arquitetura em Camadas
• Controller
• Service
• Repository
• Model
Endpoints
• GET /api/clientes
• POST /api/clientes
• PUT /api/clientes/{id}
• DELETE /api/clientes/{id}

### Slide/Página 5
Relembrando a API de Gerenciamento de Clientes 5 de 42
Tabela clientes
CREATE DATABASE gerenciamento_clientes;
USE gerenciamento_clientes;
CREATE TABLE clientes (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
idade INT
);

### Slide/Página 6
Relembrando a API de Gerenciamento de Clientes 6 de 42
Model Cliente
@Entity
@Table(name = "clientes")
public class Cliente {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
@NotBlank(message = "O nome não pode estar em branco.")
@Size(max = 100,
message = "O nome deve ter no máximo 100 caracteres.")
private String nome;
@Email(message = "O e−mail deve ser válido.")
@NotBlank(message = "O e−mail é obrigatório.")
@Size(max = 150,
message = "O e−mail deve ter no máximo 150 caracteres.")
private String email;
@Positive(message = "A idade deve ser um número positivo.")
private Integer idade;
// Getters e setters
}

### Slide/Página 7
Relembrando a API de Gerenciamento de Clientes 7 de 42
Repository ClienteRepository
public interface ClienteRepository
extends JpaRepository<Cliente, Long> {
boolean existsByEmail(String email);
boolean existsByEmailAndIdNot(String email, Long id);
}

### Slide/Página 8
Relembrando a API de Gerenciamento de Clientes 8 de 42
Service ClienteService (Parte 1)
@Service
public class ClienteService {
private final ClienteRepository clienteRepository;
public ClienteService(ClienteRepository clienteRepository) {
this.clienteRepository = clienteRepository;
}
public List<Cliente> listarClientes() {
return clienteRepository.findAll(Sort.by("nome").ascending());
}
public Cliente cadastrarCliente(Cliente c) {
if (clienteRepository.existsByEmail(c.getEmail())) {
throw new DataIntegrityViolationException("Já existe um
cliente com esse e−mail.");
}
return clienteRepository.save(c);
}
}

### Slide/Página 9
Relembrando a API de Gerenciamento de Clientes 9 de 42
Service ClienteService (Parte 2)
@Service
public class ClienteService {
public Cliente atualizarCliente(Long id, Cliente clienteAtualizado)
{
Cliente cliente = clienteRepository.findById(id)
.orElseThrow(() −> new ClienteNaoEncontradoException(id));
if (clienteRepository.existsByEmailAndIdNot(clienteAtualizado.
getEmail(), id)) {
throw new DataIntegrityViolationException("Já existe outro
cliente com esse e−mail.");
}
cliente.setNome(clienteAtualizado.getNome());
cliente.setEmail(clienteAtualizado.getEmail());
cliente.setIdade(clienteAtualizado.getIdade());
return clienteRepository.save(cliente);
}
}

### Slide/Página 10
Relembrando a API de Gerenciamento de Clientes 10 de 42
Service ClienteService (Parte 3)
@Service
public class ClienteService {
public void excluirCliente(Long id) {
if (!clienteRepository.existsById(id)) {
throw new ClienteNaoEncontradoException(id);
}
clienteRepository.deleteById(id);
}
}

### Slide/Página 11
Relembrando a API de Gerenciamento de Clientes 11 de 42
Controller ClienteController (Parte 1)
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
private final ClienteService clienteService;
@Autowired
public ClienteController(ClienteService clienteService) {
this.clienteService = clienteService;
}
@GetMapping
public ResponseEntity<List<Cliente>> listar() {
return ResponseEntity.ok(clienteService.listarClientes());
}
@PostMapping
public ResponseEntity<Cliente> cadastrar(@Valid @RequestBody Cliente
c) {
Cliente salvo = clienteService.cadastrarCliente(c);
return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
}
}

### Slide/Página 12
Relembrando a API de Gerenciamento de Clientes 12 de 42
Controller ClienteController (Parte 2)
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
@PutMapping("/{id}")
public ResponseEntity<Cliente> atualizar(
@PathVariable Long id,
@Valid @RequestBody Cliente clienteAtualizado) {
Cliente atualizado = clienteService.atualizarCliente(id,
clienteAtualizado);
return ResponseEntity.ok(atualizado);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> excluir(@PathVariable Long id) {
clienteService.excluirCliente(id);
return ResponseEntity.noContent().build();
}
}

### Slide/Página 13
Ajustes no Back-end para Integração 13 de 42
Ajustes no Back-end para
Integração

### Slide/Página 14
Ajustes no Back-end para Integração 14 de 42
Ajustes no Back-end para Integração
• Para que o app em React Native consiga consumir a API
de Gerenciamento de Clientes, alguns ajustes no back-
end são necessários.
• Dois ajustes principais:
• Configuração de CORS∗.
• Criação de um Exception Handler .
• Esses ajustes tornam a API mais segura e fácil de consumir
pelo front-end.
∗Cross-Origin Resource Sharing

### Slide/Página 15
Ajustes no Back-end para Integração 15 de 42
Configuração de CORS
• O navegador (ou o ambiente do Expo) aplica políticas de
mesma origem por segurança.
• Essas políticas impedem que uma página acesse recursos
de outra origem para proteger o usuário.
• Quando o app tenta acessar a API em outro domínio/
porta, o navegador pode bloquear a requisição por causa
do CORS.
• Precisamos configurar a API para permitir essas origens,
métodos e cabeçalhos.

### Slide/Página 16
Ajustes no Back-end para Integração 16 de 42
Configuração de CORS
• Vamos criar uma classe de configuração no Spring Boot
para registrar as regras de CORS.
• Devemos especificar:
• Origens permitidas.
• Métodos permitidos: GET, POST, PUT, DELETE.
• Cabeçalhos permitidos.
• A configuração pode ser feita implementando
WebMvcConfigurer.

### Slide/Página 17
Ajustes no Back-end para Integração 17 de 42
Configuração de CORS
@Configuration
public class CorsConfig {
@Bean
public WebMvcConfigurer corsConfigurer() {
return new WebMvcConfigurer() {
@Override
public void addCorsMappings(@NonNull CorsRegistry registry) {
registry.addMapping("/api/∗∗")
.allowedOrigins(
"http://localhost:8081",
"http://<IP−DO−COMPUTADOR>:8081"
)
.allowedMethods("GET", "POST", "PUT", "DELETE", "
OPTIONS")
.allowedHeaders("∗");
}
};
}
}

### Slide/Página 18
Ajustes no Back-end para Integração 18 de 42
Exception Handler
• O front-end precisa de respostas padronizadas para dis-
tinguir erros de validação, recursos não encontrados, erros
internos, etc.
• Sem um tratamento centralizado, cada erro pode gerar
uma resposta diferente e pouco informativa.
• Vamos criar um @RestControllerAdvice que permite:
• Capturar exceções da aplicação em um único ponto;
• Construir um formato de resposta consistente.

### Slide/Página 19
Ajustes no Back-end para Integração 19 de 42
Exception Handler
• Exemplos de campos de resposta para erros:
• timestamp: Data e hora do erro
• status: Código HTTP
• error: Tipo de erro
• message: Mensagem para o usuário
• path: Endpoint chamado

### Slide/Página 20
Ajustes no Back-end para Integração 20 de 42
Exception Handler (Parte 1)
@RestControllerAdvice
public class ApiExceptionHandler {
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Object> handleValidation(
MethodArgumentNotValidException ex) {
Map<String, Object> body = new HashMap<>();
body.put("timestamp", LocalDateTime.now());
body.put("status", HttpStatus.BAD_REQUEST.value());
Map<String, String> errors = new HashMap<>();
ex.getBindingResult().getFieldErrors().forEach(error −>
errors.put(error.getField(), error.getDefaultMessage())
);
body.put("errors", errors);
return ResponseEntity.badRequest().body(body);
}
}

### Slide/Página 21
Ajustes no Back-end para Integração 21 de 42
Exception Handler (Parte 2)
@RestControllerAdvice
public class ApiExceptionHandler {
@ExceptionHandler(DataIntegrityViolationException.class)
public ResponseEntity<Object> handleDataIntegrity(
DataIntegrityViolationException ex) {
Map<String, Object> body = new HashMap<>();
body.put("timestamp", LocalDateTime.now());
body.put("status", HttpStatus.BAD_REQUEST.value());
Map<String, String> errors = new HashMap<>();
errors.put("email", ex.getMessage());
body.put("errors", errors);
return ResponseEntity.badRequest().body(body);
}
}

### Slide/Página 22
Ajustes no Back-end para Integração 22 de 42
Exceção ClienteNaoEncontradoException
public class ClienteNaoEncontradoException extends RuntimeException {
public ClienteNaoEncontradoException(Long id) {
super("Cliente não encontrado com id: " + id);
}
}

### Slide/Página 23
Ajustes no Back-end para Integração 23 de 42
Exception Handler (Parte 3)
@RestControllerAdvice
public class ApiExceptionHandler {
@ExceptionHandler(ClienteNaoEncontradoException.class)
public ResponseEntity<Object> handleClienteNaoEncontrado(
ClienteNaoEncontradoException ex) {
Map<String, Object> body = new HashMap<>();
body.put("timestamp", LocalDateTime.now());
body.put("status", HttpStatus.NOT_FOUND.value());
Map<String, String> errors = new HashMap<>();
errors.put("general", ex.getMessage());
body.put("errors", errors);
return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
}
}

### Slide/Página 24
Hooks em React Native 24 de 42
Hooks em React Native

### Slide/Página 25
Hooks em React Native 25 de 42
Hooks em React Native
• Hooks são funções especiais que permitem usar recursos
do React em componentes funcionais.
• Principais motivações:
• Evitar componentes de classe.
• Reutilizar lógica de estado de forma mais simples.
• Deixar os componentes mais enxutos e fáceis de testar.

### Slide/Página 26
Hooks em React Native 26 de 42
Regras Básicas dos Hooks
• Hooks só podem ser chamados em componentes funci-
onais ou em custom hooks.
• Hooks não podem ser chamados dentro de:
• Estruturas condicionais.
• Estruturas de repetição.
• Funções comuns que não sejam hooks.

### Slide/Página 27
Hooks em React Native 27 de 42
useState
• Permite criar variáveis de estado dentro de um compo-
nente funcional.
• Assinatura básica:
const [valor, setValor] = useState(valorInicial);
• Sempre que chamamos setValor(...), o estado é atua-
lizado, e o componente é re-renderizado.

### Slide/Página 28
Hooks em React Native 28 de 42
useState: Exemplo
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react−native';
export default function ContadorScreen() {
const [contador, setContador] = useState(0);
return (
<View>
<Text>Valor atual: {contador}</Text>
<Pressable
onPress={() => setContador(contador + 1)}>
<Text>Incrementar</Text>
</Pressable>
</View>
);
}

### Slide/Página 29
Hooks em React Native 29 de 42
useEffect
• Usado para executar efeitos colaterais:
• Chamadas a uma API;
• Configurar listeners, timers, etc.
• Efeitos colaterais são qualquer ação que afeta algo fora da
função atual, ou que depende de algo externo ao código
que está sendo executado.
• Assinatura básica:
useEffect(efeito, [dependencias]);
• Dependências:
• Array vazio [] ⇒ Executa só uma vez (ao montar o com-
ponente).
• Array com variáveis ⇒ Executa quando essas variáveis
mudam.

### Slide/Página 30
Hooks em React Native 30 de 42
useEffect: Exemplo
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react−
native';
export default function MensagemScreen() {
const [mensagem, setMensagem] = useState('');
const [carregando, setCarregando] = useState(true);
useEffect(() => {
// Simula buscar dados de uma API
setTimeout(() => {
setMensagem('Bem−vindo(a) ao app!');
setCarregando(false);
}, 3000);
}, []);

### Slide/Página 31
Hooks em React Native 31 de 42
useEffect: Exemplo
if (carregando) {
return <ActivityIndicator />;
}
return (
<View>
<Text>{mensagem}</Text>
</View>
);
}

### Slide/Página 32
Hooks em React Native 32 de 42
useCallback
• Serve para memorizar uma função, evitando que ela seja
criada novamente a cada renderização.
• Útil principalmente quando essa função é passada como
prop para componentes filhos ou usada como dependência
em outros hooks.
• Assinatura:
const func = useCallback(() => {...}, [dependencias]);
• A função só é recriada quando uma das dependências
muda.

### Slide/Página 33
Hooks em React Native 33 de 42
useCallback: Exemplo
import React, { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react−native';
export default function SaudacaoScreen() {
const [nome, setNome] = useState('Gustavo');
const [contador, setContador] = useState(0);
const handlePress = useCallback(() => {
console.log('Olá, ' + nome);
setContador((valorAnterior) => valorAnterior + 1);
}, [nome]);
return (
<View>
<Text>Saudacoes enviadas: {contador}</Text>
<Pressable onPress={handlePress}>
<Text>Enviar saudacao</Text>
</Pressable>
</View>
);
}

### Slide/Página 34
Hooks em React Native 34 de 42
useRef
• Cria um objeto mutável que persiste entre renderizações.
• Ao atualizar o valor do objeto, não ocorre re-renderização.
• Usos comuns:
• Acessar elementos de interface;
• Evitar variáveis globais;
• Armazenar contadores, timers, estados anteriores.
• Assinatura básica:
const referencia = useRef(valorInicial);

### Slide/Página 35
Hooks em React Native 35 de 42
useRef: Exemplo
import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react−native';
export default function ContadorInterno() {
const contador = useRef(0);
const [renderizacoes, setRenderizacoes] = useState(0);
function incrementar() {
contador.current += 1; // Nao causa re−renderizacao
}
function atualizarTela() {
setRenderizacoes(r => r + 1); // Causa re−renderizacao
}

### Slide/Página 36
Hooks em React Native 36 de 42
useRef: Exemplo
return (
<View>
<Text>Valor exibido: {contador.current}</Text>
<Pressable onPress={incrementar}><Text>Incrementar</Text></
Pressable>
<Pressable onPress={atualizarTela}><Text>Atualizar tela</Text></
Pressable>
</View>
);
}

### Slide/Página 37
Construção do App 37 de 42
Construção do App

### Slide/Página 38
Construção do App 38 de 42
Construção do App
Objetivo
Vamos construir o front-end em React Native que consome a
API de Gerenciamento de Clientes.

### Slide/Página 39
Construção do App 39 de 42
Criação do Projeto e Instalação das Dependências
1 Crie o projeto que vamos chamar de ClientesApp:
npx create−expo−app ClientesApp −−template blank
2 Navegue para a pasta criada e instale as bibliotecas neces-
sárias:
npm install @react−navigation/native
npx expo install react−native−screens react−native−
safe−area−context
npm install @react−navigation/native−stack
npm install axios

### Slide/Página 40
Construção do App 40 de 42
Organização do Projeto
App.js
src/
components/
ClienteItem.js
screens/
ClienteFormScreen.js
ClienteListScreen.js
services/
api.js

### Slide/Página 41
Demonstração Prática no Visual Studio Code 41 de 42
Demonstração Prática no
Visual Studio Code

### Slide/Página 42
Demonstração Prática no Visual Studio Code 42 de 42
Bibliografia
• ANDERSON, Nader Dabit. React Native in Action. Manning
Publications, New York, 2019.
• REACT. React Documentation – Hooks. Meta Platforms, Inc.,
2025. Disponível em: https://react.dev/.
• REACTNAVIGATION.ReactNavigationDocumentation. Soft-
ware Mansion, 2025. Disponível em: https://reactnavig
ation.org/docs/getting-started/.
• AXIOS. Axios Documentation. Axios Project Contributors,
2025. Disponível em: https://axios-http.com/docs/i
ntro.
• SPRING. Spring Framework Documentation. VMware, 2025.
Disponível em: https://spring.io/projects/spring-b
oot.

