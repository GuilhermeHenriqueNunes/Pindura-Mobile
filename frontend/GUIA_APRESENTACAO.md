# 📱 Pindura Mobile — Instruções para a Apresentação Oral

Este guia rápido explica como rodar o aplicativo de forma simples e rápida na frente do professor durante a avaliação.

---

## 🚀 Passo a Passo para Execução

### 1. Iniciar o Back-end (Spring Boot)
1. Abra um terminal na pasta `backend/`:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *(Ou execute a classe `PinduraApplication.java` diretamente pela sua IDE, como IntelliJ ou VS Code).*
2. O servidor iniciará na porta `8080` com os endpoints REST sob o caminho `/api`.

---

### 2. Configurar o IP do Front-end (`api.js`)
O front-end precisa saber o endereço IP do computador onde o Spring Boot está rodando:

1. No terminal do Windows, descubra o seu IP local digitando:
   ```cmd
   ipconfig
   ```
   Procure por **Endereço IPv4** do adaptador Wi-Fi (exemplo: `192.168.1.15`).

2. Abra o arquivo [src/services/api.js](file:///C:/Users/guilh/Desktop/Pindura%20Mobile/Pindura-Mobile/frontend/src/services/api.js) e ajuste a linha 11:
   - **No celular físico (Expo Go)**:
     ```javascript
     export const API_BASE_URL = 'http://SEU_IP_AQUI:8080/api';
     // Exemplo: 'http://192.168.1.15:8080/api'
     ```
   - **No emulador Android oficial**:
     ```javascript
     export const API_BASE_URL = 'http://10.0.2.2:8080/api';
     ```

---

### 3. Iniciar o Front-end (Expo)
1. Abra outro terminal na pasta `frontend/`:
   ```bash
   cd frontend
   npx expo start
   ```
2. Um QR Code aparecerá no terminal.
3. Abra o aplicativo **Expo Go** no celular (conectado na mesma rede Wi-Fi do computador) e escaneie o QR Code.

---

## 📋 Demonstração das Funcionalidades para o Professor

Durante a apresentação, você poderá demonstrar todo o escopo exigido:

1. **Aba Início**:
   - Visualização do logotipo com o mascote mico-leão-dourado.
   - Cards com total acumulado, total de moradores e de despesas.
   - Atalhos rápidos para adicionar morador ou despesa.
   - Lista das últimas despesas cadastradas.

2. **Aba Moradores**:
   - **Listagem em FlatList**: cards com avatar, nome e chave Pix.
   - **Pesquisa em tempo real**: digite na caixa de busca para filtrar por nome.
   - **Ordenação**: toque no botão `A-Z ↑ / Z-A ↓` para alternar ordem alfabética.
   - **Cadastro**: clique em `+ Novo Morador`, preencha nome (obrigatório) e chave Pix (opcional) e salve.
   - **Edição**: altere dados de um morador existente.
   - **Exclusão**: exclua um morador com confirmação nativa no alerta.

3. **Aba Despesas**:
   - **Listagem em FlatList**: cards completos com título, valor formatado, data, pagador e quantidade de participantes.
   - **Pesquisa**: filtro instantâneo por título.
   - **Ordenação**: escolha ordenar por Data, Valor ou Título, em ordem crescente ou decrescente.
   - **Cadastro**: informe título, valor, data, selecione o morador pagador e marque os moradores participantes. O card de rateio calcula ao vivo o valor por pessoa antes de salvar.
   - **Tela de Detalhes & Rateio**: clique em "Ver Rateio" para ver o cálculo exato por pessoa, a lista de participantes e o botão **"Copiar Chave Pix"** do pagador para facilitar o acerto da conta.
