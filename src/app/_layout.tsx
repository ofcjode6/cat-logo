

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FavoritosProvider } from '../context/Favortitoscontext';
import { inicializarBanco } from '../database/database';

export default function RootLayout() {
  const [bancoPronto, setBancoPronto] = useState(false);
  const [erroBanco, setErroBanco] = useState(false);

  useEffect(() => {
    async function prepararBanco() {
      try {
        await inicializarBanco();
        setBancoPronto(true);
      } catch (erro) {
        console.error('Erro ao inicializar SQLite:', erro);
        setErroBanco(true);
      }
    }

    prepararBanco();
  }, []);

  if (erroBanco) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <ActivityIndicator size="large" color="#C9A96E" />
      </View>
    );
  }

  if (!bancoPronto) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111111',
        }}
      >
        <ActivityIndicator size="large" color="#C9A96E" />
      </View>
    );
  }

  return (
    <FavoritosProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FavoritosProvider>
  );
}
