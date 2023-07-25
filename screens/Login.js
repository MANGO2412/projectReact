import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import AuthContext from '../store/AuthContext';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
    <Image
        style={{ width: 280, height: 60, alignSelf: 'center', marginBottom: 40 }}
        source={require('../img/logonav.png')}
      />

      <Text style={styles.text}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => signIn({ email, password })} activeOpacity={.7}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.textfo}>
        Recuerda que para acceder a tu cuenta necesitas ser dado de alta en el hospital por el administrador
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    marginBottom: 30
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#fff',
    width: '60%',
    borderWidth: 2,
    borderColor: '#39a969',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#39a969',
    fontSize: 16,
    textAlign: 'center'
  },
  textfo: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
    fontSize: 12,
    color: '#a4a4a4',
    textAlign: 'justify'
  },
  tit: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
export default Login;
