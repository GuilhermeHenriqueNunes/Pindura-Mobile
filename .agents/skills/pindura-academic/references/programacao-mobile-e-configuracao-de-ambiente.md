# Programação Mobile e Configuração de Ambiente

**Arquivo original:** Programação Mobile e Configuração de Ambiente.pdf | **Total de slides/páginas:** 25

---

### Slide/Página 1
Programação Mobile e Configuração de Ambiente
24 de outubro de 2026

### Slide/Página 2
Objetivos da Aula
• Explicar por que utilizar Expo no ecossistema React Na-
tive.
• Introduzir as ferramentas que serão utilizadas.
• Realizar a configuração inicial do ambiente de desenvolvi-
mento e criar um projeto.

### Slide/Página 3
Introdução 3 de 25
Introdução

### Slide/Página 4
Introdução 4 de 25
App Nativo
• Desenvolvimento direto na linguagem oficial de cada pla-
taforma:
• Kotlin para Android.
• Swift para iOS.
• Vantagens:
• Acesso total aos recursos do dispositivo.
• Melhor desempenho e integração profunda com o sistema.
• Desafios:
• Duas versões do app.
• Mais tempo de desenvolvimento e curva de aprendizado
por plataforma.

### Slide/Página 5
Introdução 5 de 25
React Native
• DesenvolvimentocomJavaScript/TypeScript+Reactpara
criar telas que se tornam componentes nativos.
• Vantagens:
• Uma base de código para Android e iOS.
• Atualização rápida da tela ao salvar (Fast Refresh).
• Quando precisar, pode-se usar módulos nativos para aces-
sar APIs∗ do dispositivo.
∗Application Programming Interfaces

### Slide/Página 6
Introdução 6 de 25
JavaScript × TypeScript
JavaScript
function sum(a, b) {
return a + b;
// pode concatenar strings
}
const user = { name: 'Ana',
age: '20' };
// age é string
TypeScript
function sum(a: number, b:
number): number {
return a + b;
// evita "1" + 2 −> "12"
}
interface User {
name: string;
age: number;
}
const user: User = { name: '
Ana', age: 20 };
const userErr: User = { name
: 'Ana', age: '20' };
// ERRO

### Slide/Página 7
Introdução 7 de 25
JavaScript × TypeScript
JavaScript
function getFirst(arr) {
return arr[0];
}
const x = getFirst([1, 2,
3]);
const y = getFirst(['a', 'b'
]);
// Sem garantia estática do
tipo de x e y
TypeScript
function getFirst<T>(arr: T
[]): T {
return arr[0];
}
const x = getFirst<number
>([1, 2, 3]);
// x: number
const y = getFirst(['a', 'b'
]);
// y: string (inferido)

### Slide/Página 8
Introdução 8 de 25
Exemplo de Código em React.js
import { useState } from "react";
function App() {
const [count, setCount] = useState(0);
function handleAdd() {
setCount(count + 1);
}
return (
<main>
<h1>Olá, React!</h1>
<p>Você clicou {count} vez(es).</p>
<button onClick={handleAdd}>+1</button>
</main>
);
}
export default App;

### Slide/Página 9
Introdução 9 de 25
Exemplo de Código em React Native
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react−native';
export default function App() {
const [count, setCount] = useState(0);
return (
<View>
<Text>Olá, React Native!</Text>
<Text>Você clicou {count} vez(es).</Text>
<Pressable onPress={() => setCount(count + 1)}>
<Text>+1</Text>
</Pressable>
<Pressable onPress={() => setCount(0)}>
<Text>Reset</Text>
</Pressable>
</View>
);
}

### Slide/Página 10
Introdução 10 de 25
Expo
• É um conjunto de ferramentas e APIs prontas que facilitam
criar e testar apps em React Native.
• Vantagens:
• Criar o projeto em poucos comandos e executar no dispo-
sitivo com Expo Go.
• Muitos recursos prontos, como câmera, sensores, notifica-
ções, ...
• Se precisar de algo muito específico, é possível migrar para
um projeto mais “nativo” sem perder o que já fez.

### Slide/Página 11
Introdução 11 de 25
RN “Puro” × RN com Expo
React Native “Puro”
• Possui mais controle nativo através de integrações especí-
ficas com Android/iOS.
• Usa Android Studio/Xcode para builds locais.
• Flexibilidade em adicionar ou escrever módulos nativos sob
medida.
• Exige configuração do ambiente de cada plataforma.

### Slide/Página 12
Introdução 12 de 25
RN “Puro” × RN com Expo
React Native com Expo
• Criação rápida do projeto e execução no celular.
• Não precisa usar Android Studio/Xcode.
• SDKdoExpo(câmera, sensores, notificações)jáintegrado.
• Fácil publicação com EAS∗ Build, que gera os arquivos
binários para as lojas.
∗Expo Application Services

### Slide/Página 13
Introdução 13 de 25
Relacionamento entre as Camadas
Seu app: componentes React, navegação e regra
de negócio.
Expo: cria o projeto, executa o app e oferece
SDKs (Software Development Kits) prontos.
React Native: transforma código JavaScript/Ty-
peScript em telas nativas.
Camada nativa: botões, listas e controles do
Android/iOS, além do acesso aos recursos do dis-
positivo.
Sistema operacional (Android/iOS): provê as
funcionalidades do dispositivo.
Você escreve
Ecossistema
JavaScript
Plataforma
do dispositivo

### Slide/Página 14
Configuração de Ambiente 14 de 25
Configuração de Ambiente

### Slide/Página 15
Configuração de Ambiente 15 de 25
Ferramentas e Tecnologias para Programação
Mobile
• nvm∗ e Node.js
• Expo CLI† e Expo Go
• Visual Studio Code com extensões:
• JavaScript and TypeScript Nightly
• Prettier – Code Formatter
• ESLint
• Expo Tools
• React Native Tools
∗Node Version Manager
†Command Line Interface

### Slide/Página 16
Configuração de Ambiente 16 de 25
nvm e Node.js
• nvm (Node Version Manager ): Permite instalar e alter-
nar versões do Node.js facilmente, sendo útil quando cada
projeto usa uma versão diferente.
• Node.js: AmbientedeexecuçãopararodarJavaScriptfora
do navegador.
• npm (Node Package Manager ): Gerenciador de pacotes
que instala bibliotecas (dependências) e roda scripts do
projeto.
• npx (Node Package Execute): Executa ferramentas a
partir do npm sem instalar globalmente.

### Slide/Página 17
Configuração de Ambiente 17 de 25
Expo CLI e Expo Go
Expo CLI
• Ferramenta para criar, rodar e gerenciar projetos Expo com
React Native.
• Permite iniciar o Dev Server, abrir emulador, limpar cache,
configurar builds.
Expo Go
• Aplicativo para rodar projetos no celular via QR code, sem
instalar SDKs nativos.
• Permite testar rapidamente em dispositivo físico (An-
droid/iOS) com Fast Refresh.

### Slide/Página 18
Configuração de Ambiente 18 de 25
Configuração do Node.js e Expo
Seguir instruções do “Tutorial para Criação de Projetos com
Expo-CLI” disponível no Google Classroom.

### Slide/Página 19
Configuração de Ambiente 19 de 25
Visual Studio Code
• Editor leve, rápido, com terminal integrado, extensões e
ótimo suporte a JavaScript/TypeScript.
• Vantagens:
• Produtividade: formataçãoautomática, correçõesde lint,
autocompletar.
• Qualidade: padrão de código consistente e feedback ime-
diato de erros.
• Integração: rodar o Expo no terminal, visualizar proble-
mas.

### Slide/Página 20
Configuração de Ambiente 20 de 25
Extensões do VS Code
• JavaScript and TypeScript Nightly: Usa as funcionali-
dades mais recentes do JS/TS direto no VS Code.
• Prettier – Code Formatter: Formata o código automa-
ticamente para manter o estilo consistente.
• ESLint: Aponta problemas de qualidade/padrões e sugere
correções automática.
• Expo Tools: Ajuda com projetos Expo, sendo útil para
criar e rodar apps rapidamente.
• React Native Tools: Suporte a debug, inspeção e utili-
dades para RN.

### Slide/Página 21
Configuração de Ambiente 21 de 25
Configuração do VS Code com Extensões
1 Baixar e instalar o Visual Studio Code: https://code
.visualstudio.com/Download
2 No VS Code, abrir Extensions, buscar as extensões e ins-
talar:
• JavaScript and TypeScript Nightly
• Prettier – Code Formatter
• ESLint
• Expo Tools
• React Native Tools

### Slide/Página 22
Criando e Executando um Projeto Expo 22 de 25
Criando e Executando umProjeto Expo

### Slide/Página 23
Criando e Executando um Projeto Expo 23 de 25
Criando e Executando um Projeto Expo
Objetivo
Criar um projeto base com Expo e executá-lo no dispositivo
(Expo Go).
1 No terminal integrado do VS Code, escolha uma pasta de
trabalho e rode:
npx create−expo−app@latest meu−projeto −−template
blank
cd meu−projeto
2 Ainda dentro da pasta do projeto rode:
npx expo start

### Slide/Página 24
Criando e Executando um Projeto Expo 24 de 25
Criando e Executando um Projeto Expo
3 Abra o Expo Go e escaneie o QR code do terminal.
4 Edite o arquivo principal (App.js):
import { Text, View } from 'react−native';
export default function App() {
return (
<View style={{ flex: 1, alignItems: 'center',
justifyContent: 'center' }}>
<Text>Olá, Meu Primeiro Projeto!</Text>
</View>
);
}
5 Salve o arquivo, e o app deve atualizar instantaneamente
(Fast Refresh).

### Slide/Página 25
Criando e Executando um Projeto Expo 25 de 25
Bibliografia
• EXPO. Get started with Expo. Disponível em: https:
//docs.expo.dev/get-started/.
• REACT NATIVE. Environment Setup (Expo). Disponível
em: https://reactnative.dev/docs/environment-s
etup.
• REACT. React Documentation. Disponível em: https:
//react.dev/.
• NODE.JS FOUNDATION. Node.js Documentation. Dis-
ponível em: https://nodejs.org/en/docs.
• MICROSOFT. Visual Studio Code Docs. Disponível em:
https://code.visualstudio.com/docs.

