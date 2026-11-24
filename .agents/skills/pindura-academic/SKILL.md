---
name: pindura-academic
description: Diretrizes acadêmicas, requisitos obrigatórios do Projeto Mobile (UEL - Prof. Gustavo T. Naozuka), regras de entrega, critérios da prova oral e referências técnicas de React Native, Expo, Hooks, React Navigation, Flexbox e integração com o back-end Spring Boot do Pindura. Use sempre que precisar consultar requisitos, regras de negócio, arquitetura ou implementação do aplicativo mobile Pindura.
---

# Skill Acadêmica: Projeto Mobile Pindura (UEL)

Esta skill reúne todos os requisitos oficiais do trabalho prático e prova oral da disciplina de **Laboratório de Programação** (Ciência de Dados e Inteligência Artificial - UEL, Prof. Gustavo T. Naozuka) e as apostilas de aula, servindo como base de conhecimento consultada sob demanda.

---

## 1. Requisitos Mínimos Obrigatórios (PDF Projeto Mobile)

O aplicativo mobile deve ser desenvolvido em **React Native + Expo**, integrado ao back-end em **Java + Spring Boot + JPA/Hibernate + MySQL**.

### Requisitos Funcionais:
1. **Cadastro de Registros:** Inserção de novos dados com campos obrigatórios e opcionais, com validação no front-end e back-end.
2. **Listagem de Registros:** Exibição obrigatória utilizando o componente nativo `FlatList`.
3. **Edição/Atualização:** Alteração de registros existentes mantendo dados preenchidos no formulário.
4. **Exclusão:** Remoção individual de registros com feedback.
5. **Pesquisa:** Busca por campo-chave (ex: nome do morador, título da despesa).
6. **Ordenação:** Ordenação crescente e decrescente com base em campo do tema (ex: nome, valor, data).
7. **Tratamento de Erros:** Exibir mensagens amigáveis de sucesso e de erro no front-end (registro não encontrado, validações, falha de conexão).

### Requisitos Técnicos:
- **Front-end:** React Native + Expo. Estilos aplicados **exclusivamente com StyleSheet** e navegação implementada com **React Navigation**.
- **Back-end:** Java + Spring Boot organizado em camadas estritas: `Model`, `Repository`, `Service`, `Controller`.
- **Persistência:** JPA/Hibernate + MySQL.
- **Controle de Versão:** Repositório público no GitHub com histórico de commits.

### Regras de Entrega e Prova Oral:
- Arquivos compactados:
  - `ProjetoMobile_Backend_Nome1_Nome2.zip`
  - `ProjetoMobile_Frontend_Nome1_Nome2.zip` (sem a pasta `node_modules`).
  - Link do repositório no GitHub.
- **Prova Oral:** Demonstração ao vivo do funcionamento e arguição individual de ambos os integrantes sobre teoria e código de qualquer parte do projeto.

---

## 2. Índice de Referências Detalhadas (Progressive Disclosure)

Quando precisar de detalhes técnicos aprofundados, consulte os arquivos específicos na pasta `references/`:

- [Especificação Oficial do Projeto](./references/projeto-mobile.md): Enunciado completo, requisitos funcionais, técnicos e regras da prova oral.
- [Back-end Pindura & Adaptação REST](./references/backend-api-pindura.md): Mapeamento das entidades Morador/Despesa, regras de divisão de gastos e endpoints RESTful com CORS.
- [Hooks e Integração com Back-end](./references/hooks-em-react-native-e-integracao-com-back-end.md): `useState`, `useEffect`, chamadas com `fetch`/Axios, tratamento de erros, `ActivityIndicator` e `Alert`.
- [Navegação com React Navigation](./references/navegacao-em-react-native.md): `@react-navigation/native`, `@react-navigation/stack`, rotas (`Home`, `Lista`, `Formulario`, `Detalhes`), passagem de parâmetros (`navigation.navigate`, `route.params`).
- [Estilos e Flexbox](./references/estilos-em-react-native.md): `StyleSheet.create`, `flexDirection`, `justifyContent`, `alignItems`, espaçamentos e design responsivo.
- [Conceitos Básicos de React Native](./references/conceitos-basicos-de-react-native.md): Componentes nativos (`View`, `Text`, `TextInput`, `TouchableOpacity`, `FlatList`, `Image`), props e estados.
- [Programação Mobile e Ambiente Expo](./references/programacao-mobile-e-configuracao-de-ambiente.md): Configuração do Node, Expo CLI, execução no Expo Go ou emulador.
- [Fundamentos de JavaScript](./references/javascript.md): ES6+, destructuring, Arrow Functions, métodos funcionais de Array (`map`, `filter`, `reduce`), Promises e `async/await`.

---

## 3. Diretrizes de Implementação no Pindura Mobile

1. **Tema Escolhido:** Gerenciamento de despesas compartilhadas de moradia/república (Pindura).
2. **Entidades Principais:**
   - **Morador:** `id`, `nome` (obrigatório), `chavePix` (opcional).
   - **Despesa:** `id`, `titulo` (obrigatório), `valor` (obrigatório), `data` (obrigatória), `pagador` (obrigatório), `participantes` (mínimo 1), `descricao` (opcional).
3. **Regra de Negócio Central:** Divisão igualitária do valor total da despesa entre os participantes selecionados (`valor / participantes.length`), exibindo o saldo de cada participante e a chave Pix do pagador para acerto de contas.
