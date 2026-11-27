import React, { useState, useEffect } from 'react';
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
import despesasService from '../services/despesasService';
import moradoresService from '../services/moradoresService';

export default function DespesaFormScreen({ navigation, route }) {
  const despesaEdicao = route.params?.despesa;
  const isEditing = Boolean(despesaEdicao);

  const hoje = new Date().toISOString().split('T')[0];

  const [titulo, setTitulo] = useState(despesaEdicao?.titulo || '');
  const [valor, setValor] = useState(
    despesaEdicao?.valor != null ? String(despesaEdicao.valor) : ''
  );
  const [data, setData] = useState(despesaEdicao?.data || hoje);
  const [descricao, setDescricao] = useState(despesaEdicao?.descricao || '');
  const [pagadorId, setPagadorId] = useState(
    despesaEdicao?.pagador?.id || null
  );
  const [participantesIds, setParticipantesIds] = useState(
    despesaEdicao?.participantes?.map((p) => p.id) || []
  );

  const [moradores, setMoradores] = useState([]);
  const [carregandoMoradores, setCarregandoMoradores] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroValidacao, setErroValidacao] = useState('');

  useEffect(() => {
    async function carregarMoradores() {
      try {
        const dados = await moradoresService.listar();
        const lista = Array.isArray(dados) ? dados : [];
        setMoradores(lista);

        // Se for cadastro novo e houver moradores, inicializa com pagador padrão e todos participantes
        if (!isEditing && lista.length > 0) {
          if (!pagadorId) setPagadorId(lista[0].id);
          if (participantesIds.length === 0) {
            setParticipantesIds(lista.map((m) => m.id));
          }
        }
      } catch (err) {
        Alert.alert('Aviso', 'Não foi possível carregar a lista de moradores: ' + err.message);
      } finally {
        setCarregandoMoradores(false);
      }
    }
    carregarMoradores();
  }, []);

  const toggleParticipante = (id) => {
    if (participantesIds.includes(id)) {
      setParticipantesIds(participantesIds.filter((item) => item !== id));
    } else {
      setParticipantesIds([...participantesIds, id]);
    }
  };

  const selecionarTodosParticipantes = () => {
    if (participantesIds.length === moradores.length) {
      setParticipantesIds([]);
    } else {
      setParticipantesIds(moradores.map((m) => m.id));
    }
  };

  // Cálculo ao vivo do rateio por pessoa
  const valorNum = parseFloat(valor.replace(',', '.'));
  const rateioCalculado =
    !isNaN(valorNum) && valorNum > 0 && participantesIds.length > 0
      ? (valorNum / participantesIds.length).toFixed(2)
      : null;

  const handleSalvar = async () => {
    if (!titulo || !titulo.trim()) {
      setErroValidacao('O título da despesa é obrigatório.');
      return;
    }

    if (isNaN(valorNum) || valorNum <= 0) {
      setErroValidacao('Informe um valor válido maior que zero.');
      return;
    }

    if (!data || !data.trim()) {
      setErroValidacao('A data é obrigatória (formato AAAA-MM-DD).');
      return;
    }

    if (!pagadorId) {
      setErroValidacao('Selecione quem realizou o pagamento.');
      return;
    }

    if (participantesIds.length === 0) {
      setErroValidacao('Selecione pelo menos um participante para dividir.');
      return;
    }

    setErroValidacao('');
    setSalvando(true);

    const payload = {
      titulo: titulo.trim(),
      valor: valorNum,
      data: data.trim(),
      descricao: descricao ? descricao.trim() : null,
      pagadorId: Number(pagadorId),
      participantesIds: participantesIds.map((id) => Number(id)),
    };

    try {
      if (isEditing) {
        await despesasService.atualizar(despesaEdicao.id, payload);
        Alert.alert('Sucesso', 'Despesa atualizada com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await despesasService.cadastrar(payload);
        Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      Alert.alert('Erro ao salvar', err.message || 'Falha ao processar despesa.');
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
            {isEditing ? 'Editar Despesa' : 'Cadastrar Nova Despesa'}
          </Text>

          {erroValidacao ? (
            <View style={styles.bannerErro}>
              <Text style={styles.bannerErroTexto}>{erroValidacao}</Text>
            </View>
          ) : null}

          {/* Campo Título */}
          <Text style={styles.label}>
            Título da despesa <Text style={styles.obrigatorio}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Compra do Mês, Internet, Luz"
            placeholderTextColor={colors.muted}
            value={titulo}
            onChangeText={setTitulo}
            editable={!salvando}
          />

          {/* Campo Valor e Data */}
          <View style={styles.duplaCampos}>
            <View style={styles.meioCampo}>
              <Text style={styles.label}>
                Valor total (R$) <Text style={styles.obrigatorio}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor={colors.muted}
                value={valor}
                onChangeText={setValor}
                keyboardType="decimal-pad"
                editable={!salvando}
              />
            </View>
            <View style={styles.meioCampo}>
              <Text style={styles.label}>
                Data (AAAA-MM-DD) <Text style={styles.obrigatorio}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="AAAA-MM-DD"
                placeholderTextColor={colors.muted}
                value={data}
                onChangeText={setData}
                editable={!salvando}
              />
            </View>
          </View>

          {/* Campo Descrição */}
          <Text style={styles.label}>Descrição (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Observações ou itens comprados..."
            placeholderTextColor={colors.muted}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
            editable={!salvando}
          />

          {/* Seletor de Pagador */}
          <Text style={styles.label}>
            Quem pagou? <Text style={styles.obrigatorio}>*</Text>
          </Text>
          {carregandoMoradores ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 8 }} />
          ) : moradores.length === 0 ? (
            <Text style={styles.avisoVazio}>
              Nenhum morador cadastrado. Cadastre moradores antes de registrar despesas.
            </Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
              {moradores.map((m) => {
                const selecionado = pagadorId === m.id;
                return (
                  <Pressable
                    key={`pagador-${m.id}`}
                    style={[
                      styles.chip,
                      selecionado && styles.chipSelecionado,
                    ]}
                    onPress={() => setPagadorId(m.id)}
                  >
                    <Text
                      style={[
                        styles.chipTexto,
                        selecionado && styles.chipTextoSelecionado,
                      ]}
                    >
                      {selecionado ? '✓ ' : ''}{m.nome}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}

          {/* Seletor de Participantes */}
          <View style={styles.participantesHeader}>
            <Text style={styles.label}>
              Dividir com: <Text style={styles.obrigatorio}>*</Text>
            </Text>
            {moradores.length > 0 ? (
              <Pressable onPress={selecionarTodosParticipantes}>
                <Text style={styles.botaoTodosTexto}>
                  {participantesIds.length === moradores.length
                    ? 'Desmarcar todos'
                    : 'Marcar todos'}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.participantesGrid}>
            {moradores.map((m) => {
              const marcado = participantesIds.includes(m.id);
              return (
                <Pressable
                  key={`participante-${m.id}`}
                  style={[
                    styles.checkboxChip,
                    marcado && styles.checkboxChipMarcado,
                  ]}
                  onPress={() => toggleParticipante(m.id)}
                >
                  <Text
                    style={[
                      styles.checkboxTexto,
                      marcado && styles.checkboxTextoMarcado,
                    ]}
                  >
                    {marcado ? '☑ ' : '☐ '}
                    {m.nome}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Card de Cálculo ao Vivo do Rateio */}
          {rateioCalculado ? (
            <View style={styles.cardRateio}>
              <Text style={styles.cardRateioTitulo}>Divisão calculada:</Text>
              <Text style={styles.cardRateioValor}>
                R$ {rateioCalculado}{' '}
                <Text style={styles.cardRateioDetalhe}>
                  por pessoa ({participantesIds.length} {participantesIds.length === 1 ? 'pessoa' : 'pessoas'})
                </Text>
              </Text>
            </View>
          ) : null}

          {/* Botão Salvar */}
          <Pressable
            style={({ pressed }) => [
              styles.botaoSalvar,
              salvando && styles.botaoDesabilitado,
              pressed && styles.botaoPressionado,
            ]}
            onPress={handleSalvar}
            disabled={salvando || moradores.length === 0}
          >
            {salvando ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.botaoSalvarTexto}>
                {isEditing ? 'Atualizar Despesa' : 'Salvar Despesa'}
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
    paddingBottom: 40,
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
    marginBottom: 16,
  },
  bannerErro: {
    backgroundColor: colors.dangerSoft,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    marginBottom: 16,
  },
  bannerErroTexto: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
    marginBottom: 6,
  },
  obrigatorio: {
    color: colors.danger,
  },
  input: {
    height: 46,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 14,
  },
  textArea: {
    height: 72,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  duplaCampos: {
    flexDirection: 'row',
    gap: 12,
  },
  meioCampo: {
    flex: 1,
  },
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipSelecionado: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipTexto: {
    fontSize: 13,
    color: colors.ink,
    fontWeight: '600',
  },
  chipTextoSelecionado: {
    color: colors.white,
  },
  participantesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  botaoTodosTexto: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  participantesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  checkboxChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkboxChipMarcado: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  checkboxTexto: {
    fontSize: 13,
    color: colors.muted,
  },
  checkboxTextoMarcado: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  cardRateio: {
    backgroundColor: colors.successSoft,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.success,
    marginBottom: 18,
  },
  cardRateioTitulo: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardRateioValor: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.ink,
    marginTop: 2,
  },
  cardRateioDetalhe: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.muted,
  },
  avisoVazio: {
    fontSize: 13,
    color: colors.danger,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  botaoSalvar: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  botaoSalvarTexto: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  botaoCancelar: {
    height: 44,
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
