import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../styles/colors';
import resumoService from '../services/resumoService';

export default function HomeScreen({ navigation }) {
  const [resumo, setResumo] = useState({
    nomeRepublica: 'República Pindura',
    totalMoradores: 0,
    totalDespesas: 0,
    valorTotal: 0,
    ultimasDespesas: [],
  });
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarResumo = useCallback(async () => {
    try {
      setErro(null);
      const dados = await resumoService.obterResumo();
      if (dados) {
        setResumo(dados);
      }
    } catch (err) {
      setErro(err.message || 'Falha ao conectar com o backend');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarResumo();
    }, [carregarResumo])
  );

  const handleRefresh = () => {
    setAtualizando(true);
    carregarResumo();
  };

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      {/* Banner de Marca: Mascote & Logotipo */}
      <View style={styles.brandCard}>
        <Image
          source={require('../../assets/images/pindura-mico.png')}
          style={styles.mascote}
          resizeMode="contain"
        />
        <View style={styles.brandInfo}>
          <Text style={styles.brandNome}>Pindura</Text>
          <Text style={styles.republicaNome}>
            {resumo.nomeRepublica || 'República Pindura'}
          </Text>
          <Text style={styles.brandSlogan}>
            Gestão transparente e divisão justa de despesas
          </Text>
        </View>
      </View>

      {/* Banner de Aviso de Conexão */}
      {erro ? (
        <View style={styles.bannerErro}>
          <Text style={styles.bannerErroTexto}>{erro}</Text>
          <Pressable onPress={() => carregarResumo()} style={styles.botaoTentarNovamente}>
            <Text style={styles.botaoTentarNovamenteTexto}>Atualizar</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Seção de Métricas / KPIs */}
      <Text style={styles.secaoTitulo}>Resumo Geral</Text>
      <View style={styles.kpiGrid}>
        {/* KPI 1: Total de Despesas */}
        <View style={styles.kpiCard}>
          <Text style={styles.kpiIcon}>💰</Text>
          <Text style={styles.kpiValor}>
            {formatarMoeda(resumo.valorTotal)}
          </Text>
          <Text style={styles.kpiLegenda}>Total Acumulado</Text>
        </View>

        {/* Dupla de KPIs menores */}
        <View style={styles.kpiDupla}>
          <View style={[styles.kpiCard, styles.kpiMetade]}>
            <Text style={styles.kpiIcon}>👥</Text>
            <Text style={styles.kpiNumero}>{resumo.totalMoradores}</Text>
            <Text style={styles.kpiLegenda}>Moradores</Text>
          </View>

          <View style={[styles.kpiCard, styles.kpiMetade]}>
            <Text style={styles.kpiIcon}>📄</Text>
            <Text style={styles.kpiNumero}>{resumo.totalDespesas}</Text>
            <Text style={styles.kpiLegenda}>Contas</Text>
          </View>
        </View>
      </View>

      {/* Ações Rápidas de Acesso */}
      <Text style={styles.secaoTitulo}>Ações Rápidas</Text>
      <View style={styles.acoesRapidasLinha}>
        <Pressable
          style={({ pressed }) => [
            styles.botaoAcaoRapida,
            pressed && styles.botaoPressionado,
          ]}
          onPress={() =>
            navigation.navigate('DespesasTab', { screen: 'DespesaForm' })
          }
        >
          <Text style={styles.botaoAcaoIcon}>💸</Text>
          <Text style={styles.botaoAcaoTexto}>+ Nova Despesa</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoAcaoRapida,
            styles.botaoAcaoMorador,
            pressed && styles.botaoPressionado,
          ]}
          onPress={() =>
            navigation.navigate('MoradoresTab', { screen: 'MoradorForm' })
          }
        >
          <Text style={styles.botaoAcaoIcon}>👤</Text>
          <Text style={[styles.botaoAcaoTexto, styles.botaoAcaoMoradorTexto]}>
            + Novo Morador
          </Text>
        </Pressable>
      </View>

      {/* Seção das Últimas Despesas */}
      <View style={styles.ultimasHeader}>
        <Text style={styles.secaoTitulo}>Últimas Despesas</Text>
        <Pressable
          onPress={() => navigation.navigate('DespesasTab', { screen: 'DespesasList' })}
        >
          <Text style={styles.verTodasTexto}>Ver todas →</Text>
        </Pressable>
      </View>

      {carregando && !atualizando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.carregandoTexto}>Carregando resumo...</Text>
        </View>
      ) : resumo.ultimasDespesas && resumo.ultimasDespesas.length > 0 ? (
        <View style={styles.listaUltimas}>
          {resumo.ultimasDespesas.map((item) => (
            <Pressable
              key={`recente-${item.id}`}
              style={({ pressed }) => [
                styles.itemRecente,
                pressed && styles.itemRecentePressionado,
              ]}
              onPress={() =>
                navigation.navigate('DespesasTab', {
                  screen: 'DespesaDetails',
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.itemRecenteInfo}>
                <Text style={styles.itemRecenteTitulo} numberOfLines={1}>
                  {item.titulo}
                </Text>
                <Text style={styles.itemRecenteSub}>
                  {formatarData(item.data)} • Pago por{' '}
                  {item.pagador?.nome || 'Alguém'}
                </Text>
              </View>
              <Text style={styles.itemRecenteValor}>
                {formatarMoeda(item.valor)}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.cardVazio}>
          <Text style={styles.vazioTexto}>
            Nenhuma despesa recente registrada na república.
          </Text>
        </View>
      )}
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
    paddingBottom: 30,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sidebarDark,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  mascote: {
    width: 60,
    height: 74,
    marginRight: 14,
  },
  brandInfo: {
    flex: 1,
  },
  brandNome: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  republicaNome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginTop: 2,
  },
  brandSlogan: {
    fontSize: 12,
    color: '#bbb4aa',
    marginTop: 4,
    lineHeight: 16,
  },
  bannerErro: {
    backgroundColor: colors.dangerSoft,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bannerErroTexto: {
    color: colors.danger,
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  botaoTentarNovamente: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.danger,
    borderRadius: 4,
  },
  botaoTentarNovamenteTexto: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  kpiGrid: {
    marginBottom: 20,
    gap: 10,
  },
  kpiCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  kpiDupla: {
    flexDirection: 'row',
    gap: 10,
  },
  kpiMetade: {
    flex: 1,
  },
  kpiIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  kpiValor: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  kpiNumero: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
  },
  kpiLegenda: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  acoesRapidasLinha: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  botaoAcaoRapida: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  botaoAcaoMorador: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  botaoAcaoIcon: {
    fontSize: 16,
  },
  botaoAcaoTexto: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  botaoAcaoMoradorTexto: {
    color: colors.primaryDark,
  },
  ultimasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  verTodasTexto: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  listaUltimas: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  itemRecente: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemRecentePressionado: {
    backgroundColor: colors.background,
  },
  itemRecenteInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemRecenteTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  itemRecenteSub: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  itemRecenteValor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  cardVazio: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  vazioTexto: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
  carregandoContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carregandoTexto: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 6,
  },
  botaoPressionado: {
    opacity: 0.75,
  },
});
