import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../styles/colors';
import despesasService from '../services/despesasService';

export default function DespesaDetailsScreen({ navigation, route }) {
  const { id } = route.params || {};
  const [detalhes, setDetalhes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarDetalhes = useCallback(async () => {
    if (!id) return;
    try {
      setErro(null);
      const dados = await despesasService.buscarPorId(id);
      setDetalhes(dados);
    } catch (err) {
      setErro(err.message || 'Falha ao carregar detalhes da despesa.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregarDetalhes();
    }, [carregarDetalhes])
  );

  const formatarMoeda = (valor) => {
    if (valor == null) return 'R$ 0,00';
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatarData = (dataStr) => {
    if (!dataStr) return '';
    const partes = String(dataStr).split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  };

  const handleCopiarPix = (chave) => {
    if (!chave) return;
    Alert.alert(
      'Chave Pix Pronta para Envio',
      `Chave de pagamento:\n\n${chave}\n\nCopie os dados acima para realizar a transferência no seu banco.`,
      [{ text: 'Entendido' }]
    );
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir Despesa',
      'Tem certeza que deseja excluir esta despesa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await despesasService.excluir(id);
              Alert.alert('Sucesso', 'Despesa excluída com sucesso.', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (err) {
              Alert.alert('Erro ao excluir', err.message);
            }
          },
        },
      ]
    );
  };

  if (carregando) {
    return (
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.carregandoTexto}>Carregando informações...</Text>
      </View>
    );
  }

  if (erro || !detalhes) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroTitulo}>Erro ao carregar</Text>
        <Text style={styles.erroTexto}>{erro || 'Despesa não encontrada.'}</Text>
        <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoVoltarTexto}>Voltar para despesas</Text>
        </Pressable>
      </View>
    );
  }

  const pagador = detalhes.pagador || {};
  const participantes = detalhes.participantes || [];
  const saldos = detalhes.saldos || detalhes.saldosParticipantes || [];

  // Cálculo seguro do rateio por participante (DTO ou divisão direta)
  const totalParticipantes = participantes.length || detalhes.totalParticipantes || 1;
  const valorTotal = Number(detalhes.valor || 0);
  const valorRateio =
    detalhes.valorPorParticipante != null
      ? Number(detalhes.valorPorParticipante)
      : totalParticipantes > 0
      ? valorTotal / totalParticipantes
      : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Card Principal: Título e Valor Total */}
      <View style={styles.cardDestaque}>
        <Text style={styles.dataCabecalho}>{formatarData(detalhes.data)}</Text>
        <Text style={styles.tituloDestaque}>{detalhes.titulo}</Text>
        <Text style={styles.valorTotalDestaque}>
          {formatarMoeda(valorTotal)}
        </Text>
        {detalhes.descricao ? (
          <Text style={styles.descricaoDestaque}>{detalhes.descricao}</Text>
        ) : null}
      </View>

      {/* Card de Rateio por Pessoa */}
      <View style={styles.cardRateio}>
        <Text style={styles.secaoTitulo}>Rateio Igualitário</Text>
        <View style={styles.rateioInfoLinha}>
          <Text style={styles.rateioValor}>
            {formatarMoeda(valorRateio)}
          </Text>
          <Text style={styles.rateioSubtexto}>por participante</Text>
        </View>
        <Text style={styles.rateioDetalhe}>
          Dividido entre {totalParticipantes}{' '}
          {totalParticipantes === 1 ? 'morador' : 'moradores'}
        </Text>
      </View>

      {/* Card do Pagador e Chave Pix */}
      <View style={styles.card}>
        <Text style={styles.secaoTitulo}>Quem pagou a conta</Text>
        <View style={styles.pagadorLinha}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {pagador.nome ? pagador.nome.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <View style={styles.pagadorInfo}>
            <Text style={styles.pagadorNome}>{pagador.nome || 'Não definido'}</Text>
            {pagador.chavePix ? (
              <View style={styles.pixBloco}>
                <Text style={styles.pixRotulo}>Chave Pix para acerto:</Text>
                <Text style={styles.pixChave}>{pagador.chavePix}</Text>
              </View>
            ) : (
              <Text style={styles.pixAusente}>Morador sem chave Pix cadastrada</Text>
            )}
          </View>
        </View>

        {pagador.chavePix ? (
          <Pressable
            style={({ pressed }) => [
              styles.botaoCopiarPix,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => handleCopiarPix(pagador.chavePix)}
          >
            <Text style={styles.botaoCopiarPixTexto}>
              📋 Copiar Chave Pix do Pagador
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Card da Lista de Participantes com Badges */}
      <View style={styles.card}>
        <Text style={styles.secaoTitulo}>
          Participantes ({totalParticipantes})
        </Text>
        <View style={styles.participantesLista}>
          {participantes.map((p, idx) => {
            const isPagador = pagador.id != null && p.id === pagador.id;
            const saldoItem = saldos.find((s) => s.moradorId === p.id);
            const valorDevido = saldoItem != null ? saldoItem.valorDevido : valorRateio;

            return (
              <View
                key={`part-${p.id || idx}`}
                style={[
                  styles.participanteItem,
                  idx === participantes.length - 1 && styles.semBorda,
                ]}
              >
                <View style={styles.participanteNomeBloco}>
                  <Text style={[styles.checkIcon, isPagador && styles.checkIconPagador]}>
                    {isPagador ? '★' : '✓'}
                  </Text>
                  <View>
                    <Text style={styles.participanteNome}>{p.nome}</Text>
                    <View
                      style={[
                        styles.badgeStatus,
                        isPagador ? styles.badgePagou : styles.badgeAPagar,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeStatusTexto,
                          isPagador ? styles.badgePagouTexto : styles.badgeAPagarTexto,
                        ]}
                      >
                        {isPagador ? 'Pagou a conta' : 'A pagar'}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  style={[
                    styles.participanteValor,
                    isPagador && styles.participanteValorPagador,
                  ]}
                >
                  {formatarMoeda(valorDevido)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.acoesContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.botaoEditar,
            pressed && styles.botaoPressionado,
          ]}
          onPress={() => navigation.navigate('DespesaForm', { despesa: detalhes })}
        >
          <Text style={styles.botaoEditarTexto}>Editar Despesa</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoExcluir,
            pressed && styles.botaoPressionado,
          ]}
          onPress={confirmarExclusao}
        >
          <Text style={styles.botaoExcluirTexto}>Excluir Despesa</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  cardDestaque: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dataCabecalho: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
    marginBottom: 4,
  },
  tituloDestaque: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  valorTotalDestaque: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 6,
  },
  descricaoDestaque: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 6,
    lineHeight: 20,
  },
  cardRateio: {
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 14,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  rateioInfoLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  rateioValor: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  rateioSubtexto: {
    fontSize: 14,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  rateioDetalhe: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  pagadorLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  avatarTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  pagadorInfo: {
    flex: 1,
  },
  pagadorNome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  pixBloco: {
    marginTop: 3,
  },
  pixRotulo: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: '600',
  },
  pixChave: {
    fontSize: 13,
    color: colors.ink,
    fontWeight: '600',
  },
  pixAusente: {
    fontSize: 12,
    color: colors.muted,
    fontStyle: 'italic',
  },
  botaoCopiarPix: {
    backgroundColor: colors.successSoft,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.success,
  },
  botaoCopiarPixTexto: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '700',
  },
  participantesLista: {
    marginTop: 2,
  },
  participanteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  semBorda: {
    borderBottomWidth: 0,
  },
  participanteNomeBloco: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '700',
  },
  checkIconPagador: {
    color: colors.primary,
  },
  participanteNome: {
    fontSize: 14,
    color: colors.ink,
    fontWeight: '600',
  },
  badgeStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  badgePagou: {
    backgroundColor: colors.successSoft,
  },
  badgePagouTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
  },
  badgeAPagar: {
    backgroundColor: colors.primarySoft,
  },
  badgeAPagarTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  participanteValor: {
    fontSize: 14,
    color: colors.ink,
    fontWeight: '700',
  },
  participanteValorPagador: {
    color: colors.success,
  },
  acoesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  botaoEditar: {
    flex: 1,
    height: 44,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEditarTexto: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  botaoExcluir: {
    flex: 1,
    height: 44,
    backgroundColor: colors.dangerSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoExcluirTexto: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  carregandoContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  carregandoTexto: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 14,
  },
  erroContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  erroTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.danger,
    marginBottom: 6,
  },
  erroTexto: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 16,
  },
  botaoVoltar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  botaoVoltarTexto: {
    color: colors.white,
    fontWeight: '600',
  },
  botaoPressionado: {
    opacity: 0.75,
  },
});
