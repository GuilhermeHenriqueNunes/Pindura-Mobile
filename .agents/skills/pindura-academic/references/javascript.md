# JavaScript

**Arquivo original:** JavaScript.pdf | **Total de slides/páginas:** 44

---

### Slide/Página 1
JavaScript
18 de outubro de 2026

### Slide/Página 2
Objetivos da Aula
• Compreender os tipos primitivos, variáveis e operadores em
JavaScript.
• Aplicar controle de fluxo e laços de repetição.
• Definir e utilizar funções para organizar e reutilizar código.
• Manipular arrays e objetos.
• Interagir com o Document Object Model (DOM).

### Slide/Página 3
Introdução 3 de 44
Introdução

### Slide/Página 4
Introdução 4 de 44
Introdução
• EstesslidesforambaseadosnosslidesdoestudantedeMes-
trado Leandro M. Tosta.
• Todos os exemplos práticos estão disponíveis neste reposi-
tório:
https://github.com/iRocktys/Introduction-Jav
aScript

### Slide/Página 5
Introdução 5 de 44
Introdução
• JavaScriptéumalinguagemdeprogramaçãodealtonível,
interpretada e dinâmica. Em termos simples, ela permite
que você crie páginas web interativas, animações, jogos e
etc.
• JavaScriptfoicriadopararodarnosnavegadoresweb. Hoje,
graças a ambientes como o Node.js, ele também pode ser
executado em servidores.
• A forma mais comum de usar JavaScript em um projeto é
criando um arquivo externo .js e incorporando-o no seu
arquivo HTML.

### Slide/Página 6
Introdução 6 de 44
Inserindo JavaScript em uma Página HTML
<!DOCTYPE html>
<html lang="pt−BR">
<head>
<meta charset="UTF−8"/>
<title>Minha Primeira Página JS</title>
</head>
<body>
<h1>Bem−vindos àAula de JS!</h1>
<script src="script.js"></script>
</body>
</html>

### Slide/Página 7
Fundamentos da Linguagem 7 de 44
Fundamentos daLinguagem

### Slide/Página 8
Fundamentos da Linguagem 8 de 44
Fundamentos da Linguagem
• Para trabalhar com dados em JavaScript, precisamos co-
nhecer os tipos primitivos que a linguagem utiliza para
armazenar a informação.
• Tipos de dados:
• string: Textos
• number: Números
• boolean: Valores lógicos
• Valores especiais:
• null: Variável sem valor
• undefined: Variável que nunca foi inicializada

### Slide/Página 9
Fundamentos da Linguagem 9 de 44
Fundamentos da Linguagem
• Em JavaScript, podemos declarar variáveis de três for-
mas:
• var: Tem um escopo de função ou global.
• let: Declara variáveis que podem ter seu valor alterado.
• const: Declara variáveis que não podem ser reatribuídas.

### Slide/Página 10
Fundamentos da Linguagem 10 de 44
Fundamentos da Linguagem: Exemplo
• Exemplo de código que armazena informações pessoais bá-
sicas:
const nome = "Maria";
let idade = 30;
const cidade = "São Paulo";
let estaAtivo = true;
let variavelNaoAtribuida; // undefined: Definido pelo JavaScript
let valorEsvaziado = null; // null: Definido pelo Programador
console.log(nome);
console.log(idade);
console.log(cidade);
console.log(estaAtivo);
console.log(variavelNaoAtribuida === valorEsvaziado);
idade = 31;
console.log("Nova idade:", idade);

### Slide/Página 11
Fundamentos da Linguagem 11 de 44
Fundamentos da Linguagem
• NoJavaScript, éimportanteentendercomoos operadores
lidam com os diferentes tipos de dados.
Tabela 1: Operadores aritméticos
Operador Significado Exemplo Resultado
+ Adição/Concatenação 5 + 3 8
- Subtração 10 - 5 5
* Multiplicação 3 * 4 12
/ Divisão 10 / 2 5

### Slide/Página 12
Fundamentos da Linguagem 12 de 44
Fundamentos da Linguagem
Tabela 2: Operadores de comparação
Operador Significado Exemplo Resultado
== Igualdade (valor) 10 == '10' true
=== Igualdade estrita 10 === '10' false
!= Diferente (valor) 10 != 10 false
>/< Maior/menor que 7 > 5 true
Tabela 3: Operadores lógicos
Operador Significado Exemplo Resultado
&& AND true && false false
|| OR true || false true
! NOT !true false

### Slide/Página 13
Fundamentos da Linguagem 13 de 44
Fundamentos da Linguagem
Tabela 4: Principais funções Math
Função Significado Exemplo Resultado
Math.floor() Arredonda para baixo Math.floor(4.9) 4
Math.ceil() Arredonda para cima Math.ceil(4.1) 5
Math.random() Gera decimal aleatório (0 a 1) Math.random() Ex.: 0.873
Math.max() Maior valor Math.max(10,20) 20
Math.min() Menor valor Math.min(10,5) 5
Math.pow(b,e) Potência be Math.pow(2,3) 8
Math.sqrt() Raiz quadrada Math.sqrt(9) 3
Math.abs() Valor absoluto Math.abs(-5) 5

### Slide/Página 14
Fundamentos da Linguagem 14 de 44
Fundamentos da Linguagem: Exemplos
• Diferença entre == e ===:
// Coerção de tipos e operadores
const numero = 10;
const numeroComoTexto = "10";
// Coerção implícita
console.log(numero == numeroComoTexto);
// Coerção estrita
console.log(numero === numeroComoTexto);
• Fórmula para gerar um inteiro entre 1 e 10:
const numeroAleatorio = Math.floor(Math.random() ∗ 10)
+ 1;
console.log(numeroAleatorio);

### Slide/Página 15
Controle de Fluxo 15 de 44
Controle de Fluxo

### Slide/Página 16
Controle de Fluxo 16 de 44
Controle de Fluxo
• O controle de fluxo permite que seu código tome deci-
sões.
• Estruturas condicionais: executam blocos de código
com base em condições.
• switch: alternativa ao if...else if para múltiplos ca-
sos.
• Operador ternário: forma curta de um if...else sim-
ples.

### Slide/Página 17
Controle de Fluxo 17 de 44
Controle de Fluxo: Exemplo
• Comparação entre os tipos de controle de fluxo:
// Estruturas condicionais
const nota = 7.5;
if (nota >= 7) {
console.log("Passou!");
} else {
console.log("Desempenho: Insuficiente.");
}

### Slide/Página 18
Controle de Fluxo 18 de 44
Controle de Fluxo: Exemplo
• Comparação entre os tipos de controle de fluxo:
// Switch
const bebida = "chá";
switch (bebida) {
case "café ":
console.log("Preço: R$ 5,00");
break;
case "chá":
console.log("Preço: R$ 4,00");
break;
default:
console.log("Opção não disponível.");
}

### Slide/Página 19
Controle de Fluxo 19 de 44
Controle de Fluxo: Exemplo
• Comparação entre os tipos de controle de fluxo:
// Operador ternário
const notaMinima = 6;
const notaAluno = 7.5;
const resultado = notaAluno >= notaMinima ? "Aprovado"
: "Reprovado";
console.log(`Status do Aluno: ${resultado}`);

### Slide/Página 20
Estruturas de Repetição 20 de 44
Estruturas de Repetição

### Slide/Página 21
Estruturas de Repetição 21 de 44
Estruturas de Repetição
• As estruturas de repetição (laços) permitem executar
um bloco de código várias vezes.
• for: quando você sabe o número de repetições.
• while: repete enquanto a condição for verdadeira.
• for...of: itera valores de coleções iteráveis (Arrays,
Strings).
• for...in: itera propriedades de Objetos e Arrays.

### Slide/Página 22
Estruturas de Repetição 22 de 44
Estruturas de Repetição: Exemplos
• Laços for e while:
for (let i = 1; i <= 5; i++) {
console.log("Contagem:", i);
}
let i = 10;
while (i >= 1) {
console.log(i);
i−−;
}

### Slide/Página 23
Estruturas de Repetição 23 de 44
Estruturas de Repetição: Exemplos
• Gerar uma senha aleatória de 10 caracteres:
const caracteresBase = "
abcdefghijKLMNOPQRSTUV123456789!@#$";
const tamanhoSenha = 10;
let senhaGerada = "";
for (let i = 0; i < tamanhoSenha; i++) {
const indiceAleatorio = Math.floor(Math.random() ∗
caracteresBase.length);
senhaGerada += caracteresBase[indiceAleatorio];
}
console.log("A senha gerada é :", senhaGerada);

### Slide/Página 24
Funções 24 de 44
Funções

### Slide/Página 25
Funções 25 de 44
Funções
• Funções são blocos de código reutilizáveis para organizar,
nomear e executar tarefas.
Tabela 5: Categorias de funções
Categoria Sintaxe (Exemplo) Quando usar
Clássica function f(){} Para funções que podem ser chamadas
antes de serem definidas no código.
Expressão/Anônima const f = function(){} Quando a função precisa ser passada
como valor para uma variável ou parâ-
metro.
Arrow const f = () => {} Para sintaxe curta, especialmente em
callbacks.
Ordem Superior function f1(f2){} Funções que recebem outras funções
(callbacks) ou retornam uma nova
função (closures).
Assíncrona async function f(){} Para trabalhar com operações demo-
radas de forma não bloqueante.

### Slide/Página 26
Funções 26 de 44
Funções: Exemplos
• Comparação entre os tipos de funções:
// Classica
function somar(a, b) {
return a + b;
}
console.log("Soma (Declaração):", somar(10, 5));
// Anonima
const subtrair = function(a, b) {
return a − b;
};
console.log("Subtração (Expressão):", subtrair(10,5));

### Slide/Página 27
Funções 27 de 44
Funções: Exemplos
• Comparação entre os tipos de funções:
// Arrow
const multiplicar = (a, b) => a ∗ b;
console.log("Multiplicação (Arrow):", multiplicar(10,
5));
// Ordem superior
const numeros = [1, 2, 3];
const dobrados = numeros.map(item => item ∗ 2);
console.log("Números dobrados (Callback):", dobrados);

### Slide/Página 28
Funções 28 de 44
Funções: Exemplos
• Comparação entre os tipos de funções:
async function buscarPrecoAtual() {
const displayPreco = document.getElementById('precoAtual');
displayPreco.textContent = "Carregando...";
const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?
ids=bitcoin&vs_currencies=usd';
try {
const resposta = await fetch(apiUrl);
const dados = await resposta.json();
const preco = dados.bitcoin.usd.toFixed(2);
displayPreco.textContent = `US$ ${preco}`;
} catch (erro) {
displayPreco.textContent = "Erro ao buscar preço.";
console.error("Erro:", erro);
}
}
const botao = document.getElementById('botaoBusca');
botao.addEventListener('click', buscarPrecoAtual);

### Slide/Página 29
Arrays e Objetos 29 de 44
Arrays e Objetos

### Slide/Página 30
Arrays e Objetos 30 de 44
Arrays e Objetos
• Arrays são a estrutura de dados fundamental para lidar
com listas ordenadas no JavaScript.
Tabela 6: Métodos mutáveis (modificam o array original)
Método Propósito Sintaxe (Exemplo)
push() Adiciona elementos ao fi-
nal
array.push(novoItem)
pop() Remove e retorna o último
elemento
array.pop()
shift() Remove e retorna o pri-
meiro elemento
array.shift()
unshift() Adiciona elementos ao iní-
cio
array.unshift(novoItem)
reverse() Inverte a ordem dos ele-
mentos
array.reverse()

### Slide/Página 31
Arrays e Objetos 31 de 44
Arrays e Objetos
Tabela 7: Métodos imutáveis (criam um novo array )
Método Propósito Sintaxe (Exemplo)
map() Mapeia itens array.map(item => item * 2)
filter() Filtra itens array.filter(item => item > 10)
reduce() Aplica uma função acumu-
ladora para reduzir o Array
a um valor
array.reduce(acc, item => ...)
forEach() Executa uma função para
cada elemento do Array
array.forEach(item => console.log(item))
concat() Concatena arrays array.concat(array2, array3)

### Slide/Página 32
Arrays e Objetos 32 de 44
Arrays e Objetos: Exemplo
• Diferença entre o uso de métodos mutáveis e imutáveis:
let tarefas = [
{ id: 1, descricao: "Estudar JS", concluida: true,
prioridade: 1 },
{ id: 2, descricao: "Fazer Compras", concluida: false,
prioridade: 2 },
{ id: 3, descricao: "Pagar Contas", concluida: false,
prioridade: 1 }
];
console.log(tarefas);
// Metodos mutaveis
tarefas.push({ id: 4, descricao: "Ligar para Cliente", concluida:
false, prioridade: 3 });
console.log(tarefas.length);
const removidaInicio = tarefas.shift();
console.log("Removida:", removidaInicio.descricao);
console.log(tarefas.length);

### Slide/Página 33
Arrays e Objetos 33 de 44
Arrays e Objetos: Exemplo
• Diferença entre o uso de métodos mutáveis e imutáveis:
// Metodos imutaveis
const prioridadeAjustada = tarefas.map(tarefa => ({
...tarefa,
prioridade: tarefa.prioridade − 1
}));
console.log(prioridadeAjustada.map(t=>t.prioridade));
const tarefasPrioritarias = tarefas.filter(tarefa =>
tarefa.prioridade === 1);
console.log(tarefasPrioritarias.map(t=>t.descricao));

### Slide/Página 34
Arrays e Objetos 34 de 44
Arrays e Objetos: Exemplo
• Diferença entre o uso de métodos mutáveis e imutáveis:
// Metodos imutaveis (cont.)
const tarefasPendentes = tarefas.reduce((total, tarefa
) => {
if (tarefa.concluida === false) {
return total + 1;
}
return total;
}, 0);
console.log("Total de pendentes:", tarefasPendentes);
tarefas.forEach(tarefa => {
console.log(`[${tarefa.concluida ? 'OK' : 'X'}] ${
tarefa.descricao}`);
});

### Slide/Página 35
Arrays e Objetos 35 de 44
Arrays e Objetos
• Objetos são o pilar do JavaScript, servindo como “recipi-
entes” para dados relacionados. Para trabalhar com eles de
forma eficiente, focamos em três ações principais: aces-
sar/modificar, copiar/mesclar e iterar suas chaves.
• Métodos de objeto:
• ... (Spread Operator ): Retorna um novo objeto (cópia
rasa)
• Object.keys() : Retorna um array de strings com as
chaves do objeto
• Object.values(): Retorna um array com os valores das
propriedades do objeto
• Object.entries(): Retornaum array depares [chave,
valor]

### Slide/Página 36
Arrays e Objetos 36 de 44
Arrays e Objetos: Exemplo
• Clonagem, Mesclagem e Iteração de Objetos:
const usuario = { nome: "Alice", email: "alice@exemplo.com",
ativo: true };
const endereco = { rua: "Rua X", numero: 10 };
// Clonagem e Mesclagem
const usuarioCompleto = { ...usuario, ...endereco, ativo: false };
console.log(usuarioCompleto);
// Iteração
const chaves = Object.keys(usuario);
console.log(chaves);
for (const [chave, valor] of Object.entries(usuario)) {
console.log(`${chave}: ${valor}`);
}

### Slide/Página 37
Document Object Model (DOM) 37 de 44
Document Object Model
(DOM)

### Slide/Página 38
Document Object Model (DOM) 38 de 44
Document Object Model (DOM)
• O DOM é a representação em árvore da página HTML
no navegador. O JavaScript usa essa estrutura hierárquica
para selecionar e manipular elementos, tornando a interface
interativa.
• Seletores:
• document.getElementById('id'): Busca rápida por
um único elemento através do seu ID.
• document.querySelector('seletor-css'): Retorna
o primeiro elemento que corresponde ao seletor CSS for-
necido.
• document.querySelectorAll('seletor-css'): Retorna
uma NodeList (que é como um Array ) com todos os ele-
mentos que correspondem ao seletor.

### Slide/Página 39
Document Object Model (DOM) 39 de 44
Document Object Model (DOM)
• Manipulação de conteúdo e atributos:
• elemento.textContent: Define ou obtém o conteúdo
de texto puro.
• elemento.innerHTML: Define ou obtém o conteúdo, per-
mitindo que você injete código HTML (use com cautela!).
• elemento.getAttribute('nome'): Obtém o valor de
um atributo (src, href, class...).
• elemento.setAttribute('nome','valor'): Defineou
altera o valor de um atributo HTML.

### Slide/Página 40
Document Object Model (DOM) 40 de 44
Document Object Model (DOM)
• Manipulação de classes e estilos:
• elemento.classList: Essencial para gerenciar as clas-
ses CSS.
• elemento.classList.add('nome-classe'): Adiciona
uma nova classe.
• elemento.classList.remove('nome-classe'): Remove
uma classe.
• elemento.classList.toggle('nome-classe'): Adi-
ciona a classe se não existir e remove se existir.
• elemento.style.propriedadeCSS:DefineumestiloCSS
diretamente no elemento.
• Eventos:
• elemento.addEventListener('evento', callback):
Anexa uma função que será executada quando o evento
especificado ocorrer. O evento mais comum é o 'click'.

### Slide/Página 41
Document Object Model (DOM) 41 de 44
Document Object Model (DOM)
• Gerenciar elementos:
• document.createElement('tag'): Cria um novo ele-
mento HTML na memória do navegador.
• pai.appendChild(filho): Adiciona o novo elemento
como o último filho de um elemento pai existente.
• pai.removeChild(filho): Remove um elemento filho
da página.

### Slide/Página 42
Document Object Model (DOM) 42 de 44
DOM: Exemplo
• Contador de clicks com dois botões: um para aumentar e
outro para diminuir o valor:
<!DOCTYPE html>
<html lang="pt−BR">
<head>
<meta charset="UTF−8">
<title>Contador JS</title>
</head>
<body>
<h1>Contador de Cliques</h1>
<p id="valorContador">0</p>
<button id="botaoDiminuir">Diminuir</button>
<button id="botaoAumentar">Aumentar</button>
<script src="script.js"></script>
</body>
</html>

### Slide/Página 43
Document Object Model (DOM) 43 de 44
DOM: Exemplo
• Contador de clicks com dois botões: um para aumentar e
outro para diminuir o valor:
let contador = 0;
const displayValor = document.getElementById('valorContador');
const botaoAumentar = document.getElementById('botaoAumentar');
const botaoDiminuir = document.getElementById('botaoDiminuir');
function aumentarContador() {
contador = contador + 1;
displayValor.textContent = contador;
}
function diminuirContador() {
contador = contador − 1;
displayValor.textContent = contador;
}
botaoAumentar.addEventListener('click', aumentarContador);
botaoDiminuir.addEventListener('click', diminuirContador);

### Slide/Página 44
Document Object Model (DOM) 44 de 44
Bibliografia
• FLANAGAN, David. JavaScript: The Definitive Guide:
Master the World’s Most-Used Programming Language.
7. ed. Sebastopol: O’Reilly Media, 2020.
• HAVERBEKE, Marijn. Eloquent JavaScript: A Modern
Introduction to Programming. 4. ed. San Francisco: No
Starch Press, 2024.
• MOZILLA FOUNDATION; MDN WEB DOCS. JavaScript
Guide. Disponível em: https://developer.mozilla.
org/docs/Web/JavaScript/Guide.

