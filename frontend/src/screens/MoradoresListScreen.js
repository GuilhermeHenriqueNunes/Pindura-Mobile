import React, { useState, useEffect, useCallback } from 'react';
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
import moradoresService from '../services/moradoresService';
import Alert from '../utils/alert';

export default function MoradoresListScreen({ navigation }) {
  const [moradores, setMoradores] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [direcao, setDirecao] = useState('asc');
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarMoradores = useCallback(async (termo = pesquisa, ordem = direcao) => {
    try {
      setErro(null);
      const dados = await moradoresService.listar(termo, ordem);
      setMoradores(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setErro(err.message || 'Falha ao carregar moradores');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, [pesquisa, direcao]);

  // Recarrega sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarMoradores();
    }, [carregarMoradores])
  );

  const handlePesquisaChange = (texto) => {
    setPesquisa(texto);
    carregarMoradores(texto, direcao);
  };

  const alternarOrdenacao = () => {
    const novaOrdem = direcao === 'asc' ? 'desc' : 'asc';
    setDirecao(novaOrdem);
    carregarMoradores(pesquisa, novaOrdem);
  };

  const handleRefresh = () => {
    setAtualizando(true);
    carregarMoradores();
  };

  const confirmarExclusao = (morador) => {
    Alert.alert(
      'Excluir Morador',
      `Tem certeza que deseja remover "${morador.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await moradoresService.excluir(morador.id);
              Alert.alert('Sucesso', 'Morador removido com sucesso.');
              carregarMoradores();
            } catch (err) {
              Alert.alert('Erro ao excluir', err.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const inicial = item.nome ? item.nome.charAt(0).toUpperCase() : '?';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.nome}>{item.nome}</Text>
            {item.chavePix ? (
              <View style={styles.pixContainer}>
                <Text style={styles.pixLabel}>Chave Pix:</Text>
                <Text style={styles.pixValor} numberOfLines={1}>
                  {item.chavePix}
                </Text>
              </View>
            ) : (
              <Text style={styles.semPix}>Sem chave Pix cadastrada</Text>
            )}
          </View>
        </View>

        <View style={styles.acoesContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.botaoEditar,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => navigation.navigate('MoradorForm', { morador: item })}
          >
            <Text style={styles.botaoEditarTexto}>Editar</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.botaoExcluir,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => confirmarExclusao(item)}
          >
            <Text style={styles.botaoExcluirTexto}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa e ordenação */}
      <View style={styles.topBar}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar por nome..."
            placeholderTextColor={colors.muted}
            value={pesquisa}
            onChangeText={handlePesquisaChange}
            autoCapitalize="none"
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.botaoOrdem,
            pressed && styles.botaoPressionado,
          ]}
          onPress={alternarOrdenacao}
        >
          <Text style={styles.botaoOrdemTexto}>
            {direcao === 'asc' ? 'A-Z ↑' : 'Z-A ↓'}
          </Text>
        </Pressable>
      </View>

      {/* Banner de erro de conexão amigável */}
      {erro ? (
        <View style={styles.bannerErro}>
          <Text style={styles.bannerErroTexto}>{erro}</Text>
          <Pressable onPress={() => carregarMoradores()} style={styles.botaoTentarNovamente}>
            <Text style={styles.botaoTentarNovamenteTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Lista com FlatList */}
      {carregando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.carregandoTexto}>Carregando moradores...</Text>
        </View>
      ) : (
        <FlatList
          data={moradores}
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
              <Text style={styles.vazioTitulo}>Nenhum morador encontrado</Text>
              <Text style={styles.vazioSubtitulo}>
                {pesquisa
                  ? 'Tente buscar com outro termo de pesquisa.'
                  : 'Cadastre o primeiro morador no botão abaixo.'}
              </Text>
            </View>
          }
        />
      )}

      {/* Botão de Novo Morador */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.botaoPressionado,
        ]}
        onPress={() => navigation.navigate('MoradorForm')}
      >
        <Text style={styles.fabTexto}>+ Novo Morador</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    gap: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchWrapper: {
    flex: 1,
  },
  searchInput: {
    height: 44,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.ink,
  },
  botaoOrdem: {
    height: 44,
    paddingHorizontal: 14,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoOrdemTexto: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 4,
  },
  pixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pixLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
    marginRight: 4,
  },
  pixValor: {
    fontSize: 12,
    color: colors.ink,
    flex: 1,
  },
  semPix: {
    fontSize: 12,
    color: colors.muted,
    fontStyle: 'italic',
  },
  acoesContainer: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  botaoEditar: {
    flex: 1,
    height: 38,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
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
    height: 38,
    backgroundColor: colors.dangerSoft,
    borderRadius: 8,
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
  botaoPressionado: {
    opacity: 0.75,
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
});
