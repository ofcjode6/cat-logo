import { useState } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function realizarLogin() {

    if (email === '' || senha === '') {
      console.log('Preencha todos os campos.');
      return;
    }

    console.log('Login realizado!');
    console.log('E-mail:', email);
    console.log('Senha:', senha);
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoArea}>

        <Image
    source={require('./assets/logo-mareli.jpg')}
    style={styles.logo}
  />

          <Text style={styles.companyName}>
  
          </Text>
            Mareli Multimarcas

        </View>

        <View style={styles.titleArea}>

          <Text style={styles.title}>
            Bem-vindo, cliente!
          </Text>

          <Text style={styles.subtitle}>
            Entre na sua conta para continuar
          </Text>

        </View>

        <View style={styles.form}>

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#777777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Senha
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              style={styles.passwordInput}
              placeholder="Digite sua senha"
              placeholderTextColor="#777777"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            />

            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >

              <Text style={styles.showPassword}>
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </Text>

            </TouchableOpacity>

          </View>


          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => console.log('Esqueci minha senha')}
          >

            <Text style={styles.forgotText}>
              Esqueci minha senha
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={realizarLogin}
            activeOpacity={0.8}
          >

            <Text style={styles.loginButtonText}>
              ENTRAR
            </Text>

          </TouchableOpacity>

        </View>


        <View style={styles.registerArea}>

          <Text style={styles.registerText}>
            Ainda não possui uma conta?
          </Text>

          <TouchableOpacity
            onPress={() => console.log('Criar conta')}
          >

            <Text style={styles.registerLink}>
              Criar conta
            </Text>

          </TouchableOpacity>

        </View>


        <View style={styles.footer}>

          <Text style={styles.footerText}>
            © 2026 CATÁLOGO
          </Text>

          <Text style={styles.footerText}>
            Todos os direitos reservados.
          </Text>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  logo: {
  width: 180,
  height: 180,
  borderRadius: 90,
  resizeMode: 'cover',
  marginBottom: 15,
},

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },


  logoArea: {
    alignItems: 'center',
  marginBottom: 30,
  },

  

  companyName: {
    color: '#D6D6D6',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 1,
  },


  titleArea: {
    alignItems: 'center',
    marginBottom: 35,
  },

  title: {
    color: '#E2C47A',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
  },


  form: {
    width: '100%',
  },

  label: {
    color: '#D2D2D2',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 52,

    backgroundColor: '#1B1B1B',

    borderWidth: 1,
    borderColor: '#333333',

    borderRadius: 8,

    paddingHorizontal: 16,

    color: '#FFFFFF',

    fontSize: 15,
  },


  passwordContainer: {
    height: 52,

    backgroundColor: '#1B1B1B',

    borderWidth: 1,
    borderColor: '#333333',

    borderRadius: 8,

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 16,
    paddingRight: 14,
  },

  passwordInput: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 15,
  },

  showPassword: {
    color: '#C9A96E',
    fontSize: 12,
    fontWeight: '600',
  },


  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },

  forgotText: {
    color: '#C9A96E',
    fontSize: 13,
  },


  loginButton: {
    height: 54,

    backgroundColor: '#C9A96E',

    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 28,

    elevation: 3,
  },

  loginButtonText: {
    color: '#111111',

    fontSize: 16,

    fontWeight: 'bold',

    letterSpacing: 1,
  },


  registerArea: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 30,
  },

  registerText: {
    color: '#888888',
    fontSize: 13,
    marginRight: 5,
  },

  registerLink: {
    color: '#D6B96A',
    fontSize: 13,
    fontWeight: 'bold',
  },



  footer: {
    alignItems: 'center',
    marginTop: 45,
  },

  footerText: {
    color: '#555555',
    fontSize: 11,
    marginBottom: 4,
  },

});
