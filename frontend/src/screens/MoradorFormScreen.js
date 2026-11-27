import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import moradoresService from '../services/moradoresService';

export default function MoradorFormScreen({ navigation, route }) {
  const moradorEdicao = route.params?.morador;
  const isEditing = Boolean(moradorEdicao);

  const [nome, setNome] = useState(moradorEdicao?.nome || '');
  const [chavePix, setChavePix] = useState(moradorEdicao?.chavePix || '');
  const [salvando, setSalvando] = useState(false);
  const [erroValidacao, setErroValidacao] = useState('');

  const handleSalvar = async () => {
    // Validação de campo obrigatório conforme especificado no escopo
    if (!nome || !nome.trim()) {
      setErroValidacao('O nome do morador é obrigatório.');
      return;
    }

    setErroValidacao('');
    setSalvando(true);

    const payload = {
      nome: nome.trim(),
      chavePix: chavePix ? chavePix.trim() : null,
    };

    try {
      if (isEditing) {
        await moradoresService.atualizar(moradorEdicao.id, payload);
        Alert.alert('Sucesso', 'Morador atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await moradoresService.cadastrar(payload);
        Alert.alert('Sucesso', 'Morador cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      Alert.alert('Erro ao salvar', err.message || 'Ocorreu um erro ao salvar o morador.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>
            {isEditing ? 'Editar Dados do Morador' : 'Cadastrar Novo Morador'}
          </Text>
          <Text style={styles.cardDescricao}>
            Informe o nome do morador e opcionalmente uma chave Pix para facilitar o recebimento de rateios.
          </Text>

          {/* Campo Nome (Obrigatório) */}
          <Text style={styles.label}>
            Nome completo <Text style={styles.obrigatorio}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, erroValidacao ? styles.inputErro : null]}
            placeholder="Ex: João da Silva"
            placeholderTextColor={colors.muted}
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
              if (erroValidacao) setErroValidacao('');
            }}
            editable={!salvando}
          />
          {erroValidacao ? <Text style={styles.textoErro}>{erroValidacao}</Text> : null}

          {/* Campo Chave Pix (Opcional) */}
          <Text style={styles.label}>Chave Pix (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="CPF, e-mail, telefone ou chave aleatória"
            placeholderTextColor={colors.muted}
            value={chavePix}
            onChangeText={setChavePix}
            autoCapitalize="none"
            editable={!salvando}
          />

          {/* Botão de Salvar */}
          <Pressable
            style={({ pressed }) => [
              styles.botaoSalvar,
              salvando && styles.botaoDesabilitado,
              pressed && styles.botaoPressionado,
            ]}
            onPress={handleSalvar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.botaoSalvarTexto}>
                {isEditing ? 'Atualizar Morador' : 'Cadastrar Morador'}
              </Text>
            )}
          </Pressable>

          {/* Botão Cancelar */}
          <Pressable
            style={({ pressed }) => [
              styles.botaoCancelar,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => navigation.goBack()}
            disabled={salvando}
          >
            <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 4,
  },
  cardDescricao: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 20,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
    marginBottom: 6,
  },
  obrigatorio: {
    color: colors.danger,
  },
  input: {
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 16,
  },
  inputErro: {
    borderColor: colors.danger,
  },
  textoErro: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 14,
  },
  botaoSalvar: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  botaoSalvarTexto: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  botaoCancelar: {
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCancelarTexto: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoPressionado: {
    opacity: 0.75,
  },
});
