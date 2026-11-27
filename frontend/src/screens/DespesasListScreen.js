import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../styles/colors';
import despesasService from '../services/despesasService';
import Alert from '../utils/alert';

export default function DespesasListScreen({ navigation }) {
  const [despesas, setDespesas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('data');
  const [direcao, setDirecao] = useState('desc');
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarDespesas = useCallback(
    async (termo = pesquisa, campoOrdem = ordenarPor, ordemDir = direcao) => {
      try {
        setErro(null);
        const dados = await despesasService.listar(termo, campoOrdem, ordemDir);
        setDespesas(Array.isArray(dados) ? dados : []);
      } catch (err) {
        setErro(err.message || 'Falha ao carregar despesas');
      } finally {
        setCarregando(false);
        setAtualizando(false);
      }
    },
    [pesquisa, ordenarPor, direcao]
  );

  useFocusEffect(
    useCallback(() => {
      carregarDespesas();
    }, [carregarDespesas])
  );

  const handlePesquisaChange = (texto) => {
    setPesquisa(texto);
    carregarDespesas(texto, ordenarPor, direcao);
  };

  const alternarDirecao = () => {
    const novaDir = direcao === 'asc' ? 'desc' : 'asc';
    setDirecao(novaDir);
    carregarDespesas(pesquisa, ordenarPor, novaDir);
  };

  const mudarCampoOrdem = (campo) => {
    setOrdenarPor(campo);
    carregarDespesas(pesquisa, campo, direcao);
  };

  const handleRefresh = () => {
    setAtualizando(true);
    carregarDespesas();
  };

  const confirmarExclusao = (despesa) => {
    Alert.alert(
      'Excluir Despesa',
      `Deseja remover a despesa "${despesa.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await despesasService.excluir(despesa.id);
              Alert.alert('Sucesso', 'Despesa removida com sucesso.');
              carregarDespesas();
            } catch (err) {
              Alert.alert('Erro ao excluir', err.message);
            }
          },
        },
      ]
    );
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

  const renderItem = ({ item }) => {
    const pagadorNome = item.pagador?.nome || 'Não definido';
    const numParticipantes = item.participantes?.length || 0;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressionado,
        ]}
        onPress={() => navigation.navigate('DespesaDetails', { id: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerInfo}>
            <Text style={styles.titulo} numberOfLines={1}>
              {item.titulo}
            </Text>
            <Text style={styles.data}>{formatarData(item.data)}</Text>
          </View>
          <Text style={styles.valorTotal}>{formatarMoeda(item.valor)}</Text>
        </View>

        <View style={styles.cardCorpo}>
          <Text style={styles.pagadorTexto}>
            <Text style={styles.labelForte}>Pago por: </Text>
            {pagadorNome}
          </Text>
          <View style={styles.badgeParticipantes}>
            <Text style={styles.badgeTexto}>
              👥 {numParticipantes} {numParticipantes === 1 ? 'pessoa' : 'pessoas'}
            </Text>
          </View>
        </View>

        <View style={styles.cardAcoes}>
          <Pressable
            style={styles.botaoDetalhes}
            onPress={() => navigation.navigate('DespesaDetails', { id: item.id })}
          >
            <Text style={styles.botaoDetalhesTexto}>Ver Rateio</Text>
          </Pressable>

          <Pressable
            style={styles.botaoEditar}
            onPress={() => navigation.navigate('DespesaForm', { despesa: item })}
          >
            <Text style={styles.botaoEditarTexto}>Editar</Text>
          </Pressable>

          <Pressable
            style={styles.botaoExcluir}
            onPress={() => confirmarExclusao(item)}
          >
            <Text style={styles.botaoExcluirTexto}>Excluir</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Busca e Barra de Ordenação */}
      <View style={styles.filtroContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por título..."
          placeholderTextColor={colors.muted}
          value={pesquisa}
          onChangeText={handlePesquisaChange}
          autoCapitalize="none"
        />

        {/* Seletores de campo e direção de ordenação */}
        <View style={styles.ordenacaoLinha}>
          <Text style={styles.ordenarLabel}>Ordenar:</Text>
          <Pressable
            style={[
              styles.chipOrdem,
              ordenarPor === 'data' && styles.chipOrdemAtivo,
            ]}
            onPress={() => mudarCampoOrdem('data')}
          >
            <Text
              style={[
                styles.chipOrdemTexto,
                ordenarPor === 'data' && styles.chipOrdemTextoAtivo,
              ]}
            >
              Data
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.chipOrdem,
              ordenarPor === 'valor' && styles.chipOrdemAtivo,
            ]}
            onPress={() => mudarCampoOrdem('valor')}
          >
            <Text
              style={[
                styles.chipOrdemTexto,
                ordenarPor === 'valor' && styles.chipOrdemTextoAtivo,
              ]}
            >
              Valor
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.chipOrdem,
              ordenarPor === 'titulo' && styles.chipOrdemAtivo,
            ]}
            onPress={() => mudarCampoOrdem('titulo')}
          >
            <Text
              style={[
                styles.chipOrdemTexto,
                ordenarPor === 'titulo' && styles.chipOrdemTextoAtivo,
              ]}
            >
              Título
            </Text>
          </Pressable>

          <Pressable style={styles.botaoDirecao} onPress={alternarDirecao}>
            <Text style={styles.botaoDirecaoTexto}>
              {direcao === 'asc' ? '↑ Cres' : '↓ Decr'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Banner de Erro */}
      {erro ? (
        <View style={styles.bannerErro}>
          <Text style={styles.bannerErroTexto}>{erro}</Text>
          <Pressable onPress={() => carregarDespesas()} style={styles.botaoTentarNovamente}>
            <Text style={styles.botaoTentarNovamenteTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Lista com FlatList */}
      {carregando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.carregandoTexto}>Carregando despesas...</Text>
        </View>
      ) : (
        <FlatList
          data={despesas}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTitulo}>Nenhuma despesa cadastrada</Text>
              <Text style={styles.vazioSubtitulo}>
                {pesquisa
                  ? 'Nenhum resultado corresponde à pesquisa.'
                  : 'Cadastre uma nova conta ou despesa no botão abaixo.'}
              </Text>
            </View>
          }
        />
      )}

      {/* Botão Flutuante de Nova Despesa */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.botaoPressionado,
        ]}
        onPress={() => navigation.navigate('DespesaForm')}
      >
        <Text style={styles.fabTexto}>+ Nova Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtroContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    height: 42,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 10,
  },
  ordenacaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ordenarLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    marginRight: 2,
  },
  chipOrdem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOrdemAtivo: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipOrdemTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  chipOrdemTextoAtivo: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  botaoDirecao: {
    marginLeft: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.primarySoft,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  botaoDirecaoTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  bannerErro: {
    backgroundColor: colors.dangerSoft,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  listContent: {
    padding: 16,
    paddingBottom: 85,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressionado: {
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerInfo: {
    flex: 1,
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  data: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  valorTotal: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  cardCorpo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 10,
  },
  pagadorTexto: {
    fontSize: 13,
    color: colors.ink,
    flex: 1,
  },
  labelForte: {
    fontWeight: '700',
    color: colors.muted,
  },
  badgeParticipantes: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  cardAcoes: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  botaoDetalhes: {
    flex: 2,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDetalhesTexto: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  botaoEditar: {
    flex: 1,
    height: 36,
    backgroundColor: colors.primarySoft,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  botaoEditarTexto: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  botaoExcluir: {
    flex: 1,
    height: 36,
    backgroundColor: colors.dangerSoft,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  botaoExcluirTexto: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  carregandoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  carregandoTexto: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 14,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  vazioTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 6,
  },
  vazioSubtitulo: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  fabTexto: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  botaoPressionado: {
    opacity: 0.75,
  },
});
