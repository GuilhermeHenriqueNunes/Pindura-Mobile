# Navegação em React Native

**Arquivo original:** Navegação em React Native.pdf | **Total de slides/páginas:** 49

---

### Slide/Página 1
Navegação em React Native
16 de novembro de 2026

### Slide/Página 2
Objetivos da Aula
• Compreender os conceitos fundamentais da biblioteca Re-
act Navigation.
• Apresentar os navegadores mais utilizados e identificar os
principais componentes da navegação.
• Explicar as principais funções do objeto navigation.
• Desenvolver uma aplicação simples com múltiplas telas.

### Slide/Página 3
Introdução 3 de 49
Introdução

### Slide/Página 4
Introdução 4 de 49
Introdução
• A maioria dos aplicativos possui múltiplas telas.
• É necessário navegar entre telas, passar dados e controlar
o fluxo da aplicação.
• React Native não possui sistema de navegação embutido.
• React Navigation é a biblioteca mais utilizada para re-
solver esse problema.

### Slide/Página 5
Introdução 5 de 49
React Navigation
• Biblioteca oficial e mais popular para navegação em React
Native.
• Baseada em JavaScript, fácil de usar e altamente configu-
rável.
• Suporte a diferentes padrões de navegação.
• Suporta animações nativas (gesture handlers).

### Slide/Página 6
Padrões de Navegação 6 de 49
Padrões de Navegação

### Slide/Página 7
Padrões de Navegação 7 de 49
Padrões de Navegação
• A navegação funciona com navegadores (navigators).
• Cada navegador controla a forma de transição entre telas.
• Exemplos:
• Stack
• Bottom Tab
• Drawer
• Material Top Tab
• Telas são componentes em React Native.

### Slide/Página 8
Padrões de Navegação 8 de 49
Stack Navigator
• Navegação em pilha de telas.
• Cada nova tela é empilhada sobre a anterior.
Fonte: https://reactnavigation.org/docs/stack-navigator

### Slide/Página 9
Padrões de Navegação 9 de 49
Bottom Tab Navigator
• Cria um menu de abas na parte inferior do aplicativo.
• Permite ícones, rótulos e personalização do estilo.
Fonte:
https://reactnavigation.org/docs/bottom-tab-navigator

### Slide/Página 10
Padrões de Navegação 10 de 49
Drawer Navigator
• Cria um menu lateral deslizante (drawer ).
• Pode ser aberto por gesto ou ícone de menu.
Fonte: https://reactnavigation.org/docs/drawer-navigator

### Slide/Página 11
Padrões de Navegação 11 de 49
Material Top Tab Navigator
• Cria um menu de abas na parte superior da tela.
• Permite navegação por toque ou gesto de arrastar.
Fonte: https:
//reactnavigation.org/docs/material-top-tab-navigator

### Slide/Página 12
Componentes de Navegação 12 de 49
Componentes de
Navegação

### Slide/Página 13
Componentes de Navegação 13 de 49
NavigationContainer
• Componente principal da biblioteca React Navigation.
• É responsável por:
• Gerenciar o estado de navegação do aplicativo.
• Integrar a navegação com o ambiente nativo.
• Deve envolver toda a estrutura de navegação do apli-
cativo.
• Normalmente é usado no arquivo principal.

### Slide/Página 14
Componentes de Navegação 14 de 49
Navigator
• Um Navigator é um componente responsável por:
• Definir como o usuário navega entre telas.
• Controlar a pilha de telas, abas ou menus laterais.
• Cada tipo de navegação possui seu próprio Navigator:
• createStackNavigator() → Stack.Navigator
• createBottomTabNavigator() → Tab.Navigator
• createDrawerNavigator() → Drawer.Navigator
• createMaterialTopTabNavigator() → Tab.Navigator
• Dentrodeum Navigator, declaramosas telas com Screen.

### Slide/Página 15
Componentes de Navegação 15 de 49
Screen
• Screen representa uma tela/rota do aplicativo.
• Principais props:
• name: nome da rota.
• component: componente que será renderizado.
• options: configurações da tela (título, cabeçalho, íco-
nes).

### Slide/Página 16
Objeto navigation 16 de 49
Objeto navigation

### Slide/Página 17
Objeto navigation 17 de 49
Objeto navigation
• Disponível nas telas registradas em um Navigator.
• Fornecido via props:
function HomeScreen({ navigation }) { ... }
Métodos Principais
• navigation.navigate(nomeDaRota, params?):
• Navega para uma tela.
• Reutiliza a tela se ela já estiver na pilha (dependendo do
Navigator).
• navigation.push(nomeDaRota, params?): Sempre
adiciona uma nova instância da tela no topo da pilha.

### Slide/Página 18
Objeto navigation 18 de 49
Objeto navigation
Métodos Principais
• navigation.goBack(): Volta para a tela anterior na pi-
lha.
• navigation.pop(n?): Remove n telas do topo da pilha.
• navigation.popToTop(): Volta para a primeira tela da
pilha.
• navigation.replace(nomeDaRota, params?):
• Substitui a tela atual por outra.
• Útil em fluxos como login → home.
• navigation.reset(config):
• Redefine toda a pilha de navegação.
• Permite criar uma nova sequência de rotas.

### Slide/Página 19
Objeto navigation 19 de 49
Objeto navigation
Parâmetros de Navegação
• Parâmetros são enviados nas funções de navegação, como:
navigation.navigate('Details', { id: 5 });
• Na tela de destino, são acessados via route.params:
function DetailsScreen({ route }) {
const { id } = route.params;
}
• Útil para passar IDs, objetos ou filtros entre telas.

### Slide/Página 20
Exemplo Prático 20 de 49
Exemplo Prático

### Slide/Página 21
Exemplo Prático 21 de 49
CitiesApp
Objetivo
Vamos construir uma aplicação na qual o usuário possa cadas-
trar cidades e seus principais pontos de interesse.

### Slide/Página 22
Exemplo Prático 22 de 49
CitiesApp
Criação do Projeto e Instalação das Bibliotecas
1 Crie o projeto que vamos chamar de CitiesApp:
npx create−expo−app CitiesApp −−template blank
2 Navegue para a pasta criada e instale as bibliotecas neces-
sárias:
npm install @react−navigation/native
npx expo install react−native−screens react−native−
safe−area−context
npm install @react−navigation/stack
npx expo install react−native−gesture−handler
npx expo install expo−crypto
npm install @react−navigation/bottom−tabs

### Slide/Página 23
Exemplo Prático 23 de 49
CitiesApp
Parte 1
Arquivo CitiesApp_Parte1.zip

### Slide/Página 24
Exemplo Prático 24 de 49
CitiesApp
App.js: Utilizando Bottom Tab Bar para criar o esqueleto principal
import React, { Component } from "react";
import { NavigationContainer } from "@react−navigation/native";
import { createBottomTabNavigator } from "@react−navigation/bottom−tabs"
;
import AddCity from "./src/AddCity";
import CitiesNavScreen from "./src/CitiesNavScreen";
const Tab = createBottomTabNavigator();
export default class App extends Component {
state = {
cities: [],
};
addCity = (city) => {
const cities = this.state.cities;
cities.push(city);
this.setState({ cities });
console.log("estado do app.js: ", this.state);
};

### Slide/Página 25
Exemplo Prático 25 de 49
CitiesApp
App.js: Utilizando Bottom Tab Bar para criar o esqueleto principal
render() {
return (
<NavigationContainer>
<Tab.Navigator>
<Tab.Screen name="List Cities" component={CitiesNavScreen} />
<Tab.Screen name="Add City">
{() => <AddCity addCity={this.addCity} />}
</Tab.Screen>
</Tab.Navigator>
</NavigationContainer>
);
}
}

### Slide/Página 26
Exemplo Prático 26 de 49
CitiesApp
AddCity.js: Adicionando novas cidades a uma lista
import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react−
native'
import ∗ as Random from 'expo−crypto'
import { colors } from './theme'
class AddCity extends React.Component {
state = {
city: '',
country: ''
}
changeText = (key, value) => {
this.setState({ [key]: value })
}

### Slide/Página 27
Exemplo Prático 27 de 49
CitiesApp
AddCity.js: Adicionando novas cidades a uma lista
submit = () => {
if (this.state.city === '' || this.state.country === '')
alert('please complete form')
const city = {
city: this.state.city,
country: this.state.country,
id: String(Random.getRandomBytes(8)),
locations: []
}
this.props.addCity(city)
this.setState({ city: '', country: '' })
}

### Slide/Página 28
Exemplo Prático 28 de 49
CitiesApp
AddCity.js: Adicionando novas cidades a uma lista
render() {
return (
<View style={styles.container}>
<Text style={styles.heading}>Cities</Text>
<TextInput placeholder='City name' style={styles.input}
value={this.state.city}
onChangeText={val => this.changeText('city', val)} />
<TextInput placeholder='Country name' style={styles.input}
value={this.state.country}
onChangeText={val => this.changeText('country', val)} />
<Pressable onPress={this.submit}>
<View style={styles.button}>
<Text style={styles.buttonText}>Add City</Text>
</View>
</Pressable>
</View>
)
}
}
export default AddCity

### Slide/Página 29
Exemplo Prático 29 de 49
CitiesApp
CitiesNavScreen.js: Estrutura inicial
import { View, Text } from "react−native";
const CitiesNavScreen = () => (
<View>
<Text>Teste</Text>
</View>
);
export default CitiesNavScreen;

### Slide/Página 30
Exemplo Prático 30 de 49
CitiesApp
theme.js: Configuração de cor
const colors = {
primary: '#1976D2'
}
export { colors }

### Slide/Página 31
Exemplo Prático 31 de 49
CitiesApp
Parte 2
Arquivo CitiesApp_Parte2.zip

### Slide/Página 32
Exemplo Prático 32 de 49
CitiesApp
App.js: Incluindo o componente Stack na interface
import React, { Component } from 'react'
import { NavigationContainer } from '@react−navigation/native'
import { createBottomTabNavigator } from '@react−navigation/bottom−tabs'
;
import 'react−native−gesture−handler'; // New
import AddCity from './src/AddCity'
import CitiesNavScreen from './src/CitiesNavScreen'
const Tab = createBottomTabNavigator()
export default class App extends Component{
state = { ... }
addCity = (city) => { ... }

### Slide/Página 33
Exemplo Prático 33 de 49
CitiesApp
App.js: Incluindo o componente Stack na interface
render(){
return(
<NavigationContainer>
<Tab.Navigator>
<Tab.Screen name='List Cities'>
{props => <CitiesNavScreen {...props}
cities={this.state.cities} />}
</Tab.Screen>
<Tab.Screen name='Add City'>
{() => <AddCity addCity={this.addCity}/>}
</Tab.Screen>
</Tab.Navigator>
</NavigationContainer>
)
}
}
• Observação: props contém propriedades dos componentes de nave-
gação que podem ser utilizadas dentro dos componentes que imple-
mentam as telas, como CitiesNavScreen.

### Slide/Página 34
Exemplo Prático 34 de 49
CitiesApp
CitiesNavScreen.js: Implementando a navegação baseada em Stack
import { createStackNavigator } from '@react−navigation/stack'
import City from './City'
import Cities from './Cities'
const CitiesNav = createStackNavigator()
const CitiesNavScreen = ({cities, addLocation}) => (
<CitiesNav.Navigator >
<CitiesNav.Screen name="Cities">
{ props => <Cities {...props} cities={cities}/> }
</CitiesNav.Screen>
<CitiesNav.Screen name="City" component={City} />
</CitiesNav.Navigator>
)
export default CitiesNavScreen

### Slide/Página 35
Exemplo Prático 35 de 49
CitiesApp
City.js: Estrutura inicial
import { View, Text } from 'react−native'
const City = () => (
<View>
<Text>Teste</Text>
</View>
)
export default City

### Slide/Página 36
Exemplo Prático 36 de 49
CitiesApp
Cities.js: Listando as cidades cadastradas
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView }
from 'react−native'
import CenterMessage from './CenterMessage'
import { colors } from './theme'
export default class Cities extends React.Component {
navigate = (item) => {
this.props.navigation.navigate('City', { city: item })
}

### Slide/Página 37
Exemplo Prático 37 de 49
CitiesApp
Cities.js: Listando as cidades cadastradas
render() {
const { cities } = this.props
console.log('cities', this.props.cities)
return (
<ScrollView contentContainerStyle={[!cities.length &&
{ flex: 1 }]}>
<View style={[!cities.length &&
{ justifyContent: 'center', flex: 1 }]}>
{ !cities.length &&
<CenterMessage message='No saved cities!' /> }

### Slide/Página 38
Exemplo Prático 38 de 49
CitiesApp
Cities.js: Listando as cidades cadastradas
{ cities.map((item, index) => (
<TouchableWithoutFeedback onPress={() => this.navigate(item)}
key={index} >
<View style={styles.cityContainer}>
<Text style={styles.city}>{item.city}</Text>
<Text style={styles.country}>{item.country}</Text>
</View>
</TouchableWithoutFeedback>
)) }
</View>
</ScrollView>
)
}
}

### Slide/Página 39
Exemplo Prático 39 de 49
CitiesApp
CenterMessage.js: Apresentando uma mensagem ao usuário
import React from 'react'
import { Text, View, StyleSheet} from 'react−native'
import { colors } from './theme'
const CenterMessage = ({ message }) => (
<View style={StyleSheet.emptyContainer}>
<Text style={styles.message}>
{message}
</Text>
</View>
)
export default CenterMessage

### Slide/Página 40
Exemplo Prático 40 de 49
CitiesApp
Parte 3
Arquivo CitiesApp_Parte3.zip

### Slide/Página 41
Exemplo Prático 41 de 49
CitiesApp
App.js: Adicionando pontos de interesse às cidades
const Tab = createBottomTabNavigator();
export default class App extends Component {
state = { ... };
addCity = (city) => { ... };
addLocation = (location, city) => {
console.log("location ", location);
const index = this.state.cities.findIndex((item) => {
return item.id === city.id;
});
const newCity = {
city: this.state.cities[index].city,
country: this.state.cities[index].country,
id: this.state.cities[index].id,
locations: [...this.state.cities[index].locations, location],
};

### Slide/Página 42
Exemplo Prático 42 de 49
CitiesApp
App.js: Adicionando pontos de interesse às cidades
const cities = [
...this.state.cities.slice(0, index),
newCity,
...this.state.cities.slice(index + 1),
];
this.setState({
cities,
});
};

### Slide/Página 43
Exemplo Prático 43 de 49
CitiesApp
App.js: Adicionando pontos de interesse às cidades
render() {
return (
<NavigationContainer>
<Tab.Navigator>
<Tab.Screen name="List Cities">
{(props) => (
<CitiesNavScreen {...props} cities={this.state.cities}
addLocation={this.addLocation} />
)}
</Tab.Screen>
<Tab.Screen name="Add City">
{() => <AddCity addCity={this.addCity} />}
</Tab.Screen>
</Tab.Navigator>
</NavigationContainer>
);
}
}

### Slide/Página 44
Exemplo Prático 44 de 49
CitiesApp
CitiesNavScreen.js
const CitiesNav = createStackNavigator();
const CitiesNavScreen = ({ cities, addLocation }) => (
<CitiesNav.Navigator>
<CitiesNav.Screen name="Cities">
{(props) => <Cities {...props} cities={cities} />}
</CitiesNav.Screen>
<CitiesNav.Screen name="City"
options={({ route }) => ({ title: route.params.city.city })}>
{(props) => {
const { route } = props;
const city = cities.find((c) => c.id === route.params.city.id);
return <City {...props} city={city} addLocation={addLocation} />;
}}
</CitiesNav.Screen>
</CitiesNav.Navigator>
);
export default CitiesNavScreen;

### Slide/Página 45
Exemplo Prático 45 de 49
CitiesApp
City.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, }
from "react−native";
import CenterMessage from "./CenterMessage";
import { colors } from "./theme";
export default class City extends React.Component {
state = {
name: "",
info: "",
};
changeText = (key, value) => {
this.setState({ [key]: value });
};

### Slide/Página 46
Exemplo Prático 46 de 49
CitiesApp
City.js
addLocation = () => {
if (this.state.name === "" || this.state.info === "") return;
const location = {
name: this.state.name,
info: this.state.info,
};
this.props.addLocation(location, this.props.city);
this.setState({ name: "", info: "" });
};

### Slide/Página 47
Exemplo Prático 47 de 49
CitiesApp
City.js
render() {
const { city } = this.props;
return (
<View style={{ flex: 1 }}>
<ScrollView contentContainerStyle={[!city.locations.length &&
{ flex: 1 }]} >
<View style={[styles.locationsContainer, !city.locations.length
&& { flex: 1, justifyContent: "center" }]} >
{!city.locations.length &&
(<CenterMessage message="No locations for this city!" />)}
{city.locations.map((location, index) => (
<View key={index} style={styles.locationContainer}>
<Text style={styles.locationName}>{location.name}</Text>
<Text style={styles.locationInfo}>{location.info}</Text>
</View>
))}
</View>
</ScrollView>

### Slide/Página 48
Exemplo Prático 48 de 49
CitiesApp
City.js
<TextInput
onChangeText={(val) => this.changeText("name", val)}
placeholder="Location name" value={this.state.name}
style={styles.input} placeholderTextColor="white"
/>
<TextInput
onChangeText={(val) => this.changeText("info", val)}
placeholder="Location info" value={this.state.info}
style={[styles.input, styles.input2]}
placeholderTextColor="white"
/>
<View style={styles.buttonContainer}>
<Pressable onPress={this.addLocation}>
<View style={styles.button}>
<Text style={styles.buttonText}>Add Location</Text>
</View>
</Pressable>
</View>
</View>
);
}}

### Slide/Página 49
Exemplo Prático 49 de 49
Bibliografia
• FACEBOOK. React Native Documentation. Disponível
em: https://reactnative.dev/docs/getting-start
ed.
• DABIT, Nader. React Native in Action. New York:
Manning Publications, 2019.
• REACT NAVIGATION. React Navigation Documentation.
Disponível em: https://reactnavigation.org/.

