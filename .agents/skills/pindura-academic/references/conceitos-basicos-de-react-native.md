# Conceitos Básicos de React Native

**Arquivo original:** Conceitos Básicos de React Native.pdf | **Total de slides/páginas:** 41

---

### Slide/Página 1
Conceitos Básicos de React Native
5 de novembro de 2026

### Slide/Página 2
Objetivos da Aula
• Compreender o que são componentes em React Native e
sua importância.
• Entender o funcionamento do estado (state) e das pro-
priedades (props) dos componentes.
• Apresentarosprincipais componentes nativos esuas pro-
priedades.
• Explicar o ciclo de vida de um componente.

### Slide/Página 3
Componentes 3 de 41
Componentes

### Slide/Página 4
Componentes 4 de 41
Componentes
• Um componente é uma unidade reutilizável de interface
de usuário.
• Exemplos: botão, cabeçalho, formulário.
• Componentespodemsercriadoscomo funções ou classes
e retornam elementos que serão renderizados na tela.

### Slide/Página 5
Componentes 5 de 41
Componentes: Exemplo
• Exemplo de um componente funcional que exibe uma
mensagem:
import React from 'react';
import { Text, View } from 'react−native';
function MeuComponente() {
return (
<View>
<Text>
Olá, este é um componente React Native!
</Text>
</View>
);
}
export default MeuComponente;

### Slide/Página 6
Componentes 6 de 41
Componentes: Exemplo
• Passo a passo para executar este componente:
1 Criar um arquivo chamado MeuComponente.js com o có-
digo anterior.
2 Importe o componente no arquivo principal do seu projeto
(App.js) e use-o.
import { StatusBar } from 'expo−status−bar';
import { Text, View } from 'react−native';
import MeuComponente from './MeuComponente';
export default function App() {
return (
<View>
<MeuComponente />
</View>
);
}

### Slide/Página 7
Componentes 7 de 41
Componentes e Dados
• Osdadosemcomponentessãomanipuladosdeduasformas
principais:
1 Ocomponentepodeterum estado (state) quearmazena
informações importantes para o funcionamento e progra-
mação do componente.
2 O componente também pode ter propriedades (props)
que são fornecidas a partir de componentes pais e são
read-only.

### Slide/Página 8
Estado do Componente 8 de 41
Estado do Componente

### Slide/Página 9
Estado do Componente 9 de 41
Estado do Componente
• O estado é uma espécie de espaço de memória dedicado
a um determinado componente.
• Possui um estado inicial que pode ser manipulado por
outros trechos de código dentro do componente.

### Slide/Página 10
Estado do Componente 10 de 41
Métodos de um Componente
Método render()
• É obrigatório quando se cria um componente de classe.
• Deve retornar null, false ou um elemento filho.
• Elemento filho pode ser um componente que declaramos
ou construímos.

### Slide/Página 11
Estado do Componente 11 de 41
Métodos de um Componente
Método constructor()
• Não é obrigatório.
• Invocado no momento em que o componente é criado.
• Sempre deve incluir super() no início.

### Slide/Página 12
Estado do Componente 12 de 41
Estado do Componente: Exemplo 1
import React from 'react'
import { StyleSheet, Text, View } from 'react−native';
class MeuComponente extends React.Component {
state = {
year: 2016,
name: 'Nader Dabit',
colors: ['blue']
}
render() {
return (
<View>
<Text>My name is: { this.state.name }</Text>
<Text>The year is: { this.state.year }</Text>
<Text>My colors are { this.state.colors[0] }</Text>
</View>
)
}
}
export default MeuComponente

### Slide/Página 13
Estado do Componente 13 de 41
Estado do Componente: Exemplo 2
• O estado inicial também pode ser definido no construtor
da classe:
import React from 'react'
import { StyleSheet, Text, View } from 'react−native';
class MeuComponente extends React.Component {
constructor() {
super();
this.state = {
year: 2016,
name: 'Nader Dabit',
colors: ['blue'],
};
}
}

### Slide/Página 14
Estado do Componente 14 de 41
Estado do Componente: Exemplo 3
• Quando temos um componente funcional, o estado deve
ser definido utilizando a função useState:
import React, { useState } from 'react';
import { View, Text } from 'react−native';
const MeuComponente = () => {
const [state, setState] = useState({
year: 2016,
name: 'Nader Dabit',
colors: ['blue'],
});
return (
<View>
<Text>My name is: {state.name}</Text>
<Text>The year is: {state.year}</Text>
<Text>My colors are: {state.colors[0]}</Text>
</View>
);
};
export default MeuComponente;

### Slide/Página 15
Estado do Componente 15 de 41
Alterando o Estado do Componente
• Para alterar o estado de um componente, deve-se invocar
o método setState:
import {Component} from 'react';
import { View, Text } from 'react−native';
class MeuComponente extends Component {
constructor() {
super();
this.state = { year: 2016 };
}
updateYear() {
this.setState({ year: 2017 });
}
}

### Slide/Página 16
Estado do Componente 16 de 41
Alterando o Estado do Componente
class MeuComponente extends Component {
render() {
return (
<View>
<Text onPress={() => this.updateYear()}>
The year is: {this.state.year}
</Text>
</View>
);
}
}
export default MeuComponente
• O atributo onPress permite executar uma função quando
o usuário pressionar o componente na tela.
• Quando o método setState é invocado, o React reage,
renderizando novamente o componente.

### Slide/Página 17
Propriedades do Componente 17 de 41
Propriedades do
Componente

### Slide/Página 18
Propriedades do Componente 18 de 41
Propriedades do Componente
• Propriedades (props) são dados passados de um compo-
nente pai para um componente filho.
• Permitem que os componentes sejam reutilizáveis e confi-
guráveis.
• Imutáveis no componente que as recebe.
• Acessadasusando this.props (emcomponentesdeclasse)
ou diretamente como argumentos (em componentes funci-
onais).

### Slide/Página 19
Propriedades do Componente 19 de 41
Propriedades Estáticas: Exemplo
// MeuComponente.js
import {Component} from 'react';
import BookDisplay from './BookDisplay';
class MeuComponente extends Component {
render() {
return (
<BookDisplay book="React Native in Action" />
)
}
}
export default MeuComponente

### Slide/Página 20
Propriedades do Componente 20 de 41
Propriedades Estáticas: Exemplo
// BookDisplay.js
import { View, Text } from 'react−native';
import {Component} from 'react';
class BookDisplay extends Component {
render() {
return (
<View>
<Text>{this.props.book}</Text>
</View>
)
}
}
export default BookDisplay

### Slide/Página 21
Propriedades do Componente 21 de 41
Propriedades Estáticas: Exemplo
• O componente BookDisplay também poderia ser escrito
como um componente funcional:
// Com desestruturação de objetos
const BookDisplay = ({ book }) => (
<View>
<Text>{book}</Text>
</View>
);
// Sem desestruturação de objetos
const BookDisplay = (props) => (
<View>
<Text>{props.book}</Text>
</View>
);

### Slide/Página 22
Propriedades do Componente 22 de 41
Propriedades Dinâmicas
• Nas props dinâmicas, os valores são derivados do estado
do componente pai.
• Ao atualizar o estado de um componente, podemos passar
os novos valores para os componentes filhos, garantindo
que eles reflitam as mudanças.

### Slide/Página 23
Propriedades do Componente 23 de 41
Propriedades Dinâmicas: Exemplo
// MeuComponente.js
import {Component} from 'react';
import BookDisplay from './BookDisplay';
class MeuComponente extends Component {
constructor(){
super()
this.state = { book: 'React Native in Action' }
}
updateBook() {
this.setState({ book: 'Express in Action' })
}
render() {
return (
<BookDisplay updateBook={ () => this.updateBook() }
book={ this.state.book } />
)
}
}
export default MeuComponente

### Slide/Página 24
Propriedades do Componente 24 de 41
Propriedades Dinâmicas: Exemplo
// BookDisplay.js
import { View, Text } from 'react−native';
import {Component} from 'react';
class BookDisplay extends Component {
render() {
return (
<View>
<Text onPress={ this.props.updateBook }>
{ this.props.book }
</Text>
</View>
)
}
}
export default BookDisplay

### Slide/Página 25
Componentes e Propriedades Nativos 25 de 41
Componentes e
Propriedades Nativos

### Slide/Página 26
Componentes e Propriedades Nativos 26 de 41
Componentes Nativos
Componentes-base
• View: contêiner flexível para layout, análogo a div.
• Text: texto com suporte a aninhamento e estilos.
• Image: imagens locais ou remotas.
• StyleSheet: organização de estilos.
Entrada e Interação
• TextInput: campo de texto com teclado nativo.
• Pressable: API moderna para gestos de toque.
• Switch: alternador on/off nativo.

### Slide/Página 27
Componentes e Propriedades Nativos 27 de 41
Componentes Nativos
Listas e Rolagem
• ScrollView: rolagem de conteúdo pequeno ou médio,
renderiza tudo.
• FlatList: lista performática com virtualization (renderiza
sob demanda).
• SectionList: lista seccionada com cabeçalhos por grupo.
• RefreshControl: pull-to-refresh para ScrollView e
FlatList.

### Slide/Página 28
Componentes e Propriedades Nativos 28 de 41
Componentes Nativos
Janelas e Navegação
• Modal: janela sobreposta nativa.
• Alert (API): diálogos nativos simples.
• SafeAreaView: respeita áreas seguras.
• StatusBar: controle de estilo e visibilidade da barra de
status.
• Linking (API): abrir URLs.

### Slide/Página 29
Componentes e Propriedades Nativos 29 de 41
Componentes Nativos
Figura 1: SafeAreaView e StatusBar
Fonte: https://www.bram.us/2018/02/20/react-native-and-iph
one-x-safeareaview/

### Slide/Página 30
Componentes e Propriedades Nativos 30 de 41
Propriedades dos Componentes Nativos
Text
• numberOfLines: limita o número de linhas exibidas.
• selectable: permite seleção de texto.
• onPress: função chamada ao clicar no texto.
Image
• source: define a origem da imagem.
• resizeMode: ajuste da imagem.
• onLoad, onError: eventos de carregamento e erro.

### Slide/Página 31
Componentes e Propriedades Nativos 31 de 41
Propriedades dos Componentes Nativos
TextInput
• value: valor atual do campo.
• onChangeText: função chamada a cada alteração.
• placeholder: texto exibido quando vazio.
• secureTextEntry: oculta o texto (senhas).
• keyboardType: tipo de teclado.
• maxLength: número máximo de caracteres.
• editable: habilita/desabilita edição.

### Slide/Página 32
Componentes e Propriedades Nativos 32 de 41
Propriedades dos Componentes Nativos
Pressable
• onPress: função executada ao toque.
• onLongPress: função executada ao toque longo.
• disabled: desativa interações.

### Slide/Página 33
Componentes e Propriedades Nativos 33 de 41
Propriedades dos Componentes Nativos
FlatList
• data: array de dados.
• renderItem: função que define como cada item será ren-
derizado.
• keyExtractor: função que define a chave única de cada
item.
• ListHeaderComponent e ListFooterComponent: ca-
beçalho e rodapé.
• horizontal: orientação horizontal.
• numColumns: número de colunas.
• refreshing e onRefresh: controle de atualização.

### Slide/Página 34
Componentes e Propriedades Nativos 34 de 41
Propriedades dos Componentes Nativos
Modal
• visible: controla a exibição do modal.
• transparent: define se o fundo é translúcido.
• animationType: tipo de animação.
• onRequestClose: callback para fechamento.
• presentationStyle: modo de exibição.

### Slide/Página 35
Ciclo de Vida de um Componente 35 de 41
Ciclo de Vida de umComponente

### Slide/Página 36
Ciclo de Vida de um Componente 36 de 41
Ciclo de Vida de um Componente
• O ciclo de vida define as etapas pelas quais um componente
passa:
1 Montagem (Mounting ): quandoocomponenteécriado
e inserido na tela.
2 Atualização (Updating ): quando ocorre uma mudança
de estado ou props.
3 Desmontagem (Unmounting ): quando o componente
é removido.
• Em componentes de classe, cada etapa possui métodos
específicos.
• Emcomponentesfuncionais, utilizamos useEffect() para
representar esses momentos.

### Slide/Página 37
Ciclo de Vida de um Componente 37 de 41
Ciclo de Vida de um Componente
Figura 2: Ciclo de vida de um componente
Fonte: https://retool.com/blog/the-react-lifecycle-methods
-and-hooks-explained

### Slide/Página 38
Ciclo de Vida de um Componente 38 de 41
Montagem (Mounting )
Métodos Principais (Classe)
• constructor(): inicializa estado.
• render(): retorna os elementos que serão exibidos.
• componentDidMount(): executado logo após o compo-
nente ser renderizado na tela.
• Uso típico:
• Inicializar dados e configurações.
• Buscar informações de uma API.

### Slide/Página 39
Ciclo de Vida de um Componente 39 de 41
Atualização (Updating )
Métodos Principais (Classe)
• shouldComponentUpdate(): decide se deve re-
renderizar.
• render(): re-renderiza o componente com novos dados.
• componentDidUpdate(prevProps, prevState): exe-
cutado após a atualização.
• Uso típico:
• Reagir a mudanças de estado ou props.
• Atualizar dados dependentes de alguma alteração.
• Disparar chamadas à API após atualização.

### Slide/Página 40
Ciclo de Vida de um Componente 40 de 41
Desmontagem (Unmounting )
Método Principal (Classe)
• componentWillUnmount(): executado antes de o com-
ponente sair da tela.
• Uso típico:
• Remover event listeners.
• Liberar recursos.

### Slide/Página 41
Ciclo de Vida de um Componente 41 de 41
Bibliografia
• FACEBOOK. React Native Documentation. Disponível
em: https://reactnative.dev/docs/getting-start
ed.
• DABIT, Nader. React Native in Action. New York:
Manning Publications, 2019.

