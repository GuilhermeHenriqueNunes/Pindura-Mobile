import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import HomeScreen from '../screens/HomeScreen';
import MoradoresListScreen from '../screens/MoradoresListScreen';
import MoradorFormScreen from '../screens/MoradorFormScreen';
import DespesasListScreen from '../screens/DespesasListScreen';
import DespesaFormScreen from '../screens/DespesaFormScreen';
import DespesaDetailsScreen from '../screens/DespesaDetailsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MoradoresStack = createStackNavigator();
const DespesasStack = createStackNavigator();

const commonScreenOptions = {
  headerStyle: {
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  headerTintColor: colors.ink,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.ink,
  },
  headerBackTitle: 'Voltar',
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={commonScreenOptions}>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Pindura' }}
      />
    </HomeStack.Navigator>
  );
}

function MoradoresStackNavigator() {
  return (
    <MoradoresStack.Navigator screenOptions={commonScreenOptions}>
      <MoradoresStack.Screen
        name="MoradoresList"
        component={MoradoresListScreen}
        options={{ title: 'Moradores' }}
      />
      <MoradoresStack.Screen
        name="MoradorForm"
        component={MoradorFormScreen}
        options={({ route }) => ({
          title: route.params?.morador ? 'Editar Morador' : 'Novo Morador',
        })}
      />
    </MoradoresStack.Navigator>
  );
}

function DespesasStackNavigator() {
  return (
    <DespesasStack.Navigator screenOptions={commonScreenOptions}>
      <DespesasStack.Screen
        name="DespesasList"
        component={DespesasListScreen}
        options={{ title: 'Despesas' }}
      />
      <DespesasStack.Screen
        name="DespesaForm"
        component={DespesaFormScreen}
        options={({ route }) => ({
          title: route.params?.despesa ? 'Editar Despesa' : 'Nova Despesa',
        })}
      />
      <DespesasStack.Screen
        name="DespesaDetails"
        component={DespesaDetailsScreen}
        options={{ title: 'Detalhes da Despesa' }}
      />
    </DespesasStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused }) => {
            let iconText = '🏠';
            if (route.name === 'MoradoresTab') iconText = '👥';
            if (route.name === 'DespesasTab') iconText = '💸';

            return (
              <Text
                style={[
                  styles.tabIcon,
                  { opacity: focused ? 1 : 0.65 },
                ]}
              >
                {iconText}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ tabBarLabel: 'Início' }}
        />
        <Tab.Screen
          name="MoradoresTab"
          component={MoradoresStackNavigator}
          options={{ tabBarLabel: 'Moradores' }}
        />
        <Tab.Screen
          name="DespesasTab"
          component={DespesasStackNavigator}
          options={{ tabBarLabel: 'Despesas' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
});
