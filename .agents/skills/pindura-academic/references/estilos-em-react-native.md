# Estilos em React Native

**Arquivo original:** Estilos em React Native.pdf | **Total de slides/páginas:** 35

---

### Slide/Página 1
Estilos em React Native
12 de novembro de 2026

### Slide/Página 2
Objetivos da Aula
• Compreender como o React Native lida com estilos.
• Entender a lógica do layout Flexbox.
• Aprender os principais atributos de estilo utilizados em
componentes.
• Aplicar os conceitos de estilo na construção de um Profile
Card.

### Slide/Página 3
Introdução 3 de 35
Introdução

### Slide/Página 4
Introdução 4 de 35
Introdução
• A parte de estilo em React Native lembra alguns aspectos
do CSS.
• No entanto, é importante entender o funcionamento do
estilo no React Native sem se prender a noções de CSS.
• A parte de estilo também é escrita em JavaScript.

### Slide/Página 5
Introdução 5 de 35
Introdução
• StyleSheet é um módulo do React Native para definir
estilos em JavaScript.
• A função StyleSheet.create:
• Organiza estilos em um objeto único (semelhante a um
“arquivo de CSS”).
• Permite verificação de tipos e autocompletar das proprie-
dades de estilo (especialmente com TypeScript).
• Define os estilos uma única vez, fora da função de rende-
rização do componente.

### Slide/Página 6
Layout Flexbox 6 de 35
Layout Flexbox

### Slide/Página 7
Layout Flexbox 7 de 35
Layout Flexbox
• O React Native utiliza Flexbox como sistema principal de
layout.
• Permite organizar componentes em linhas ou colunas.
• Facilita criar interfaces responsivas sem uso de medidas
fixas.
• Difere um pouco do CSS tradicional, mas mantém os mes-
mos princípios.
• O Flexbox é disponibilizado especificamente no compo-
nente View.

### Slide/Página 8
Layout Flexbox 8 de 35
Layout Flexbox
• O layout Flexbox usa dois eixos:
• Eixo principal: depende do flexDirection.
• Eixo secundário: perpendicular ao eixo principal.
• Direções possíveis:
• flexDirection: row – eixo principal na horizontal.
• flexDirection: column – eixo principal na vertical
(padrão).

### Slide/Página 9
Layout Flexbox 9 de 35
Layout Flexbox
• Atributo flex: Especifica como um componente pode al-
terar seu tamanho para preencher o espaço disponibilizado
a ele pelo componente pai.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 10
Layout Flexbox 10 de 35
Layout Flexbox
• Atributo flexDirection: Define a direção em que os
componentes serão organizados na tela. O valor padrão é
column.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 11
Layout Flexbox 11 de 35
Layout Flexbox
• Atributo flexDirection: Define a direção em que os
componentes serão organizados na tela. O valor padrão é
column.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 12
Layout Flexbox 12 de 35
Layout Flexbox
• Atributo justifyContent: Alinha os componentes ao
longo do eixo principal dentro do contêiner onde estão lo-
calizados. O valor padrão é flex-start.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 13
Layout Flexbox 13 de 35
Layout Flexbox
• Atributo justifyContent: Alinha os componentes ao
longo do eixo principal dentro do contêiner onde estão lo-
calizados. O valor padrão é flex-start.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 14
Layout Flexbox 14 de 35
Layout Flexbox
• Atributo alignItems: Alinha os componentes ao longo
do eixo secundário. O valor padrão é stretch.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 15
Layout Flexbox 15 de 35
Layout Flexbox
• Atributo alignItems: Alinha os componentes ao longo
do eixo secundário. O valor padrão é stretch.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 16
Layout Flexbox 16 de 35
Layout Flexbox
• Atributo alignSelf: Determina como o próprio compo-
nente vai se posicionar. O valor padrão é auto.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 17
Layout Flexbox 17 de 35
Layout Flexbox
• Atributo alignSelf: Determina como o próprio compo-
nente vai se posicionar. O valor padrão é auto.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 18
Layout Flexbox 18 de 35
Layout Flexbox
• Atributo flexWrap: Evita que o componente ultrapasse
os limites da tela.
Fonte: https://archive.reactnative.dev/docs/flexbox

### Slide/Página 19
Atributos de Estilos 19 de 35
Atributos de Estilos

### Slide/Página 20
Atributos de Estilos 20 de 35
Atributos de Estilos
Atributos Comuns a Vários Componentes
• backgroundColor: cor de fundo do componente.
• padding/margin: espaçamento interno e externo.
• width/height: largura e altura.
• borderWidth, borderColor, borderRadius,
borderStyle: controle das bordas.

### Slide/Página 21
Atributos de Estilos 21 de 35
Atributos de Estilos
Componente Text
• fontSize: tamanho da fonte.
• fontWeight: espessura da fonte.
• color: cor do texto.
• textAlign: alinhamento.
• lineHeight: altura das linhas.
• textDecorationLine: underline ou line-through.
• fontStyle: normal ou itálico.
• textShadowColor: cor da sombra do texto.
• textShadowRadius: intensidade da sombra.
• textShadowOffset: deslocamento da sombra.

### Slide/Página 22
Atributos de Estilos 22 de 35
Atributos de Estilos
Componente Image
• width/height: dimensões da imagem.
• borderRadius: arredonda as bordas.
• tintColor: aplica cor sobre ícones e imagens monocro-
máticas.
• opacity: transparência da imagem.

### Slide/Página 23
Atributos de Estilos 23 de 35
Atributos de Estilos
Componente TextInput
• borderWidth/borderColor: bordas do campo.
• padding: espaçamento interno do texto.
• fontSize: tamanho da fonte digitada.
• color: cor do texto digitado.

### Slide/Página 24
Atributos de Estilos 24 de 35
Atributos de Estilos
Componente Pressable
• padding: área útil para o toque.
• borderRadius: botões arredondados.
• backgroundColor: cor do botão.
• opacity: usado em estados pressionados/desabilitados.

### Slide/Página 25
Exemplo Prático 25 de 35
Exemplo Prático

### Slide/Página 26
Exemplo Prático 26 de 35
Profile Card
Objetivo
Vamos construir um Profile Card para aplicar estilos em React
Native.
Figura 1: Profile Card
Fonte: Dabit (2019)

### Slide/Página 27
Exemplo Prático 27 de 35
Profile Card
App.js: Estrutura inicial
import { View, StyleSheet, Text } from 'react−native'
import { Component } from 'react'
export default class App extends Component {
render(){
return (
<View style={styles.container}>
<View style={styles.cardContainer}>
</View>
</View>
);
}
}

### Slide/Página 28
Exemplo Prático 28 de 35
Profile Card
App.js: Estrutura inicial
const profileCardColor = 'dodgerblue';
const styles = StyleSheet.create({
container:{
flex: 1,
justifyContent: 'center',
alignItems: 'center'
},
cardContainer:{
backgroundColor: profileCardColor,
width: 300,
height: 400
}
});

### Slide/Página 29
Exemplo Prático 29 de 35
Profile Card
App.js: Adicionando configurações de estilo de borda
import { View, StyleSheet, Image } from 'react−native'
import { Component } from 'react'
export default class App extends Component {
render(){
return (
<View style={styles.container}>
<View style={styles.cardContainer}>
<View style={styles.cardImageContainer}>
<Image style={styles.cardImage}
source={require('./assets/user.jpeg')}>
</Image>
</View>
</View>
</View>
);
}
}

### Slide/Página 30
Exemplo Prático 30 de 35
Profile Card
App.js: Adicionando configurações de estilo de borda
const profileCardColor = 'dodgerblue';
const styles = StyleSheet.create({
container:{ ... },
cardContainer:{
borderColor: 'black', borderWidth: 3,
borderStyle: 'solid', borderRadius: 20,
...
},
cardImageContainer: {
backgroundColor: 'white', borderWidth: 3,
borderColor: 'black', width: 120,
height: 120, borderRadius: 60
},
cardImage: {
width: 114, height: 114, borderRadius: 57
}
});

### Slide/Página 31
Exemplo Prático 31 de 35
Profile Card
App.js: Melhorando o posicionamento dos componentes
const profileCardColor = 'dodgerblue';
const styles = StyleSheet.create({
container: { ... },
cardContainer: {
alignItems: 'center',
...
},
cardImageContainer: {
alignItems: 'center',
marginTop: 30,
...
},
cardImage: { ... }
});

### Slide/Página 32
Exemplo Prático 32 de 35
Profile Card
App.js: Incorporando texto e estilos
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View} from 'react−native';
export default class App extends Component {
render() {
return (
<View style={styles.container}>
<View style={styles.cardContainer}>
<View style={styles.cardImageContainer}>
<Image style={styles.cardImage}
source={require('./assets/user.jpeg')}/>
</View>
<View>
<Text style={styles.cardTitle}>John Doe</Text>
</View>
<View style={styles.cardSubtitleContainer}>
<Text style={styles.cardSubtitle}>
React Native Developer
</Text>
</View>

### Slide/Página 33
Exemplo Prático 33 de 35
Profile Card
App.js: Incorporando texto e estilos
<View>
<Text style={styles.cardDescription}>
John is a really great JavaScript developer. He
loves using JS to build React Native
applications for iOS and Android.
</Text>
</View>
</View>
</View>
);
}
}

### Slide/Página 34
Exemplo Prático 34 de 35
Profile Card
App.js: Incorporando texto e estilos
const profileCardColor = 'dodgerblue';
const styles = StyleSheet.create({
container: { ... }, cardContainer: { ... },
cardImageContainer: { ... }, cardImage: { ... },
cardTitle: {
color: 'white', fontWeight: 'bold', fontSize: 24,
marginTop: 30, textShadowColor: 'black', textShadowRadius: 3,
textShadowOffset: { height: 2, width: 2 }
},
cardSubtitleContainer: {
borderColor: 'black', borderBottomWidth: 3
},
cardSubtitle: {
fontWeight: 'bold', marginTop: 10, marginBottom: 10,
},
cardDescription: {
fontStyle: 'italic', marginTop: 10, marginRight: 40,
marginLeft: 40, marginBottom: 10
}
});

### Slide/Página 35
Exemplo Prático 35 de 35
Bibliografia
• FACEBOOK. React Native Documentation. Disponível
em: https://reactnative.dev/docs/getting-start
ed.
• DABIT, Nader. React Native in Action. New York:
Manning Publications, 2019.

