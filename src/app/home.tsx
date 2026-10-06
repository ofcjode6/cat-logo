import { useRouter } from 'expo-router';
import { useState } from 'react';
import { produtos } from "../data/produtos";

import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';



const categorias = [
  'Todos',
  'Camisas',
  'Regatas',
  'Moletons',
  'Shorts',
  'Bermudas',
];

export default function Home() {
  const [busca, setBusca] = useState('');
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoriaSelecionada === 'Todos' ||
      produto.categoria === categoriaSelecionada;

    return correspondeBusca && correspondeCategoria;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <Image
            source={require('../../assets/logo-mareli.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>●</Text>
          </TouchableOpacity>

        </View>

        {/* ================= BANNER ================= */}

        <View style={styles.welcomeArea}>
          <Text style={styles.welcomeSmall}>
            BEM-VINDO À
          </Text>

          <Text style={styles.welcomeTitle}>
            MARELI MULTIMARCAS
          </Text>

          <Text style={styles.welcomeText}>
            A loja para suas melhores opções.
          </Text>
        </View>

        {/* ================= BUSCA ================= */}

        <View style={styles.searchContainer}>

          <Text style={styles.searchIcon}>
            🔎
          </Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            placeholderTextColor="#777"
            value={busca}
            onChangeText={setBusca}
          />

        </View>

        {/* ================= CATEGORIAS ================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Categorias
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >

          {categorias.map((categoria) => (

            <TouchableOpacity
              key={categoria}
              style={[
                styles.categoryButton,
                categoriaSelecionada === categoria &&
                  styles.categoryButtonSelected,
              ]}
              onPress={() => setCategoriaSelecionada(categoria)}
            >

              <Text
                style={[
                  styles.categoryText,
                  categoriaSelecionada === categoria &&
                    styles.categoryTextSelected,
                ]}
              >
                {categoria}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        {/* ================= OFERTAS ================= */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Ofertas
            </Text>

            <Text style={styles.sectionSubtitle}>
              Confira alguns destaques da Mareli pra você
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersContainer}
        >

          {produtos
            .filter((produto) => produto.oferta)
            .map((produto) => (

              <TouchableOpacity
                key={produto.id}
                style={styles.offerCard}
              >

                <View style={styles.offerImageContainer}>

                  <FlatList
  data={produto.imagens}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item }) => (
    <Image
      source={item}
      style={styles.productImage}
      resizeMode="cover"
    />
  )}
/>

                  <View style={styles.offerTag}>
                    <Text style={styles.offerTagText}>
                      OFERTA
                    </Text>
                  </View>

                </View>

                <View style={styles.offerInfo}>

                  <Text style={styles.productCategory}>
                    {produto.categoria}
                  </Text>

                  <Text
                    style={styles.offerName}
                    numberOfLines={1}
                  >
                    {produto.nome}
                  </Text>

                  <Text style={styles.offerPrice}>
                    {produto.preco}
                  </Text>

                </View>

              </TouchableOpacity>

            ))}

        </ScrollView>

        {/* ================= TODOS OS PRODUTOS ================= */}

        <View style={styles.sectionHeaderProducts}>

          <View>
            <Text style={styles.sectionTitle}>
              Nosso catálogo
            </Text>

            <Text style={styles.sectionSubtitle}>
              Produtos selecionados para você
            </Text>
          </View>

          <Text style={styles.productCount}>
            {produtosFiltrados.length} itens
          </Text>

        </View>

        {/* ================= GRID ================= */}

        <FlatList
  data={produtosFiltrados}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  scrollEnabled={false}
  columnWrapperStyle={styles.productsRow}
  contentContainerStyle={styles.productsGrid}
  renderItem={({ item: produto }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/produto?id=${produto.id}`)}
    >

      <View style={styles.productImageContainer}>

        <Image
          source={produto.imagens[0]}
          style={styles.productImage}
          resizeMode="cover"
        />

        {produto.oferta && (
          <View style={styles.offerTagSmall}>
            <Text style={styles.offerTagText}>
              OFERTA
            </Text>
          </View>
        )}

      </View>

      <View style={styles.productInfo}>

        <Text style={styles.productCategory}>
          {produto.categoria}
        </Text>

        <Text
          style={styles.productName}
          numberOfLines={2}
        >
          {produto.nome}
        </Text>

        <Text style={styles.productPrice}>
          {produto.preco}
        </Text>

        <Text style={styles.installment}>
          ou em até 3x sem juros nos cartões
        </Text>

      </View>

    </TouchableOpacity>
  )}
/>

        {/* ================= RODAPÉ ================= */}

        <View style={styles.footer}>

          <Image
            source={require('../../assets/logo-mareli.jpg')}
            style={styles.footerLogo}
            resizeMode="contain"
          />

          <Text style={styles.footerText}>
            MARELI MULTIMARCAS
          </Text>

          <Text style={styles.footerDescription}>
            Seu estilo, você encontra aqui!
          </Text>

          <Text style={styles.footerCopyright}>
            Catálogo virtual • Mareli Multimarcas
          </Text>

        </View>

      </ScrollView>

      {/* ================= BARRA INFERIOR ================= */}

      <View style={styles.bottomBar}>

        <TouchableOpacity style={styles.bottomItem}>
          <Text style={styles.bottomIcon}>⌂</Text>
          <Text style={styles.bottomTextActive}>
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Text style={styles.bottomIcon}>▦</Text>
          <Text style={styles.bottomText}>
            Catálogo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Text style={styles.bottomIcon}>◉</Text>
          <Text style={styles.bottomText}>
            Nosso WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Text style={styles.bottomIcon}>●</Text>
          <Text style={styles.bottomText}>
            Perfil
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

/* =====================================================
   ESTILOS
===================================================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  scrollContent: {
    paddingBottom: 90,
  },

  /* HEADER */

  header: {
    height: 85,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },

  logo: {
    width: 155,
    height: 60,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#C9A96E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileIcon: {
    color: '#C9A96E',
    fontSize: 17,
  },

  /* WELCOME */

  welcomeArea: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
  },

  welcomeSmall: {
    color: '#C9A96E',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 5,
  },

  welcomeText: {
    color: '#999999',
    fontSize: 14,
    marginTop: 7,
  },

  /* SEARCH */

  searchContainer: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },

  /* SECTIONS */

  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 12,
  },

  sectionHeaderProducts: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  sectionSubtitle: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },

  productCount: {
    color: '#C9A96E',
    fontSize: 12,
  },

  /* CATEGORIES */

  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },

  categoryButton: {
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
  },

  categoryButtonSelected: {
    backgroundColor: '#C9A96E',
    borderColor: '#C9A96E',
  },

  categoryText: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '600',
  },

  categoryTextSelected: {
    color: '#111111',
  },

  /* OFFERS */

  offersContainer: {
    paddingHorizontal: 20,
    gap: 14,
  },

  offerCard: {
    width: 185,
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    overflow: 'hidden',
  },

  offerImageContainer: {
    width: '100%',
    height: 210,
    position: 'relative',
  },

  offerImage: {
    width: '100%',
    height: '100%',
  },

  offerTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#C9A96E',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },

  offerTagSmall: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#C9A96E',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },

  offerTagText: {
    color: '#111111',
    fontSize: 9,
    fontWeight: '800',
  },

  offerInfo: {
    padding: 12,
  },

  offerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },

  offerPrice: {
    color: '#C9A96E',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 7,
  },

  /* PRODUCTS */

productsGrid: {
  paddingHorizontal: 20,
},

productsRow: {
  justifyContent: 'space-between',
  marginBottom: 16,
},

  productCard: {
    width: '48%',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    overflow: 'hidden',
  },

  productImageContainer: {
    width: '100%',
    height: 230,
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  productInfo: {
    padding: 12,
  },

  productCategory: {
    color: '#777777',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  productName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    minHeight: 38,
  },

  productPrice: {
    color: '#C9A96E',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 8,
  },

  installment: {
    color: '#777777',
    fontSize: 10,
    marginTop: 4,
  },

  /* FOOTER */

  footer: {
    marginTop: 40,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#292929',
  },

  footerLogo: {
    width: 130,
    height: 50,
  },

  footerText: {
    color: '#C9A96E',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 8,
  },

  footerDescription: {
    color: '#777777',
    fontSize: 12,
    marginTop: 5,
  },

  footerCopyright: {
    color: '#555555',
    fontSize: 10,
    marginTop: 18,
  },

  /* BOTTOM BAR */

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 65,
  },

  bottomIcon: {
    color: '#888888',
    fontSize: 19,
    marginBottom: 3,
  },

  bottomText: {
    color: '#777777',
    fontSize: 10,
  },

  bottomTextActive: {
    color: '#C9A96E',
    fontSize: 10,
    fontWeight: '600',
  },

});