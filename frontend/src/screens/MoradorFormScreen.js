import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function MoradorFormScreen({ navigation, route }) {
  const isEditing = Boolean(route.params?.morador);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Morador' : 'Novo Morador'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
  },
});
