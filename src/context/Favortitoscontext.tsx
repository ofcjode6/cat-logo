
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

type FavoritosContextType = {
  favoritos: number[];
  carregando: boolean;
  alternarFavorito: (id: number) => Promise<void>;
  isFavorito: (id: number) => boolean;
};

const FavoritosContext = createContext<
  FavoritosContextType | undefined
>(undefined);

const CHAVE_FAVORITOS = '@mareli:favoritos';

export function FavoritosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const dados = await AsyncStorage.getItem(
          CHAVE_FAVORITOS
        );

        if (dados) {
          const ids = JSON.parse(dados);

          if (Array.isArray(ids)) {
            setFavoritos(
              ids.filter((id) => typeof id === 'number')
            );
          }
        }
      } catch (erro) {
        console.error('Erro ao carregar favoritos:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarFavoritos();
  }, []);

  async function alternarFavorito(id: number) {
    const atualizados = favoritos.includes(id)
      ? favoritos.filter((item) => item !== id)
      : [...favoritos, id];

    setFavoritos(atualizados);

    try {
      await AsyncStorage.setItem(
        CHAVE_FAVORITOS,
        JSON.stringify(atualizados)
      );
    } catch (erro) {
      console.error('Erro ao salvar favoritos:', erro);
    }
  }

  function isFavorito(id: number) {
    return favoritos.includes(id);
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        carregando,
        alternarFavorito,
        isFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error(
      'useFavoritos deve ser usado dentro de FavoritosProvider'
    );
  }

  return contexto;
}
