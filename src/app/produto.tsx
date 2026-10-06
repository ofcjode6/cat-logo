import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { produtos } from '../data/produtos';

export default function Produto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const produto = produtos.find(
    (item) => item.id.toString() === id?.toString()
  );

  if (!produto) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.erroContainer}>
          <Text style={styles.erroText}>
            Produto não encontrado.
          </Text>

          <TouchableOpacity
            style={styles.voltarButton}
            onPress={() => router.back()}
          >
            <Text style={styles.voltarText}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* BOTÃO VOLTAR */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        {/* IMAGEM DO PRODUTO */}

        <Image
          source={produto.imagens[0]}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* INFORMAÇÕES */}

        <View style={styles.infoContainer}>

          <Text style={styles.category}>
            {produto.categoria}
          </Text>

          <Text style={styles.name}>
            {produto.nome}
          </Text>

          <Text style={styles.price}>
            {produto.preco}
          </Text>

          {produto.oferta && (
            <View style={styles.offerTag}>
              <Text style={styles.offerText}>
                OFERTA
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>
            Sobre o produto
          </Text>

          <Text style={styles.description}>
            Confira os detalhes deste produto da
            Mareli Multimarcas.
          </Text>

          <TouchableOpacity style={styles.whatsappButton}>
            <Text style={styles.whatsappText}>
              Tenho interesse neste produto
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  content: {
    paddingBottom: 40,
  },

  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  backText: {
    color: '#C9A96E',
    fontSize: 15,
    fontWeight: '600',
  },

  productImage: {
    width: '100%',
    height: 430,
  },

  infoContainer: {
    padding: 20,
  },

  category: {
    color: '#777777',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 6,
  },

  price: {
    color: '#C9A96E',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
  },

  offerTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#C9A96E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 12,
  },

  offerText: {
    color: '#111111',
    fontSize: 10,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#292929',
    marginVertical: 25,
  },

  descriptionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  description: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  whatsappButton: {
    backgroundColor: '#C9A96E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  whatsappText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
  },

  erroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  erroText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },

  voltarButton: {
    backgroundColor: '#C9A96E',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },

  voltarText: {
    color: '#111111',
    fontWeight: '700',
  },

});