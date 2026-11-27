import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function DespesaFormScreen({ navigation, route }) {
  const isEditing = Boolean(route.params?.despesa);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Despesa' : 'Nova Despesa'}</Text>
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
