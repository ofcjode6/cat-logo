
import { useRouter } from 'expo-router';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFavoritos } from '../context/Favortitoscontext';
import { produtos } from '../data/produtos';

export default function Favoritos() {
  const router = useRouter();
  const { favoritos, carregando, alternarFavorito } = useFavoritos();

  const produtosFavoritos = produtos.filter((produto) =>
    favoritos.includes(produto.id)
  );

  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C9A96E" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>
      <Text style={styles.subtitulo}>
        Suas peças favoritas da Mareli Multimarcas
      </Text>

      {produtosFavoritos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.coracao}>♡</Text>
          <Text style={styles.mensagem}>
            Você ainda não tem favoritos.
          </Text>
          <Text style={styles.descricao}>
            Explore o catálogo e toque no coração das peças que gostar.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.textoBotao}>Explorar catálogo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={produtosFavoritos}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.lista}
          columnWrapperStyle={styles.linha}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/produto',
                    params: { id: String(item.id) },
                  })
                }
              >
                <Image
                  source={item.imagens[0]}
                  style={styles.imagem}
                  resizeMode="cover"
                />
                <Text style={styles.nome} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={styles.preco}>
                  R$ {Number(item.preco).toFixed(2).replace('.', ',')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.remover}
                onPress={() => alternarFavorito(item.id)}
              >
                <Text style={styles.textoRemover}>
                  ♥ Remover dos favoritos
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 16,
  },
  titulo: {
    color: '#C9A96E',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitulo: {
    color: '#BBBBBB',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  lista: {
    paddingBottom: 24,
  },
  linha: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  imagem: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#292929',
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  preco: {
    color: '#C9A96E',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
  remover: {
    borderWidth: 1,
    borderColor: '#C9A96E',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginTop: 12,
  },
  textoRemover: {
    color: '#C9A96E',
    fontSize: 11,
    fontWeight: '600',
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  coracao: {
    color: '#C9A96E',
    fontSize: 64,
  },
  mensagem: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  descricao: {
    color: '#BBBBBB',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  botao: {
    backgroundColor: '#C9A96E',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 22,
  },
  textoBotao: {
    color: '#111111',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
