
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View, Alert } from 'react-native'; // Added Alert import

render(){
  return (
    <View style={styles.container}>
      {/* <Image
        style={{ width: 250, height: 52, alignSelf: 'center', marginBottom: 40 }}
        source={require('../img/logonav.png')}
      /> */}

      <Text style={styles.text}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(email) =>this.setState({email})} // Updated the state variable setter
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(password) =>this.setState({password})}
         // Updated the state variable setter
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={()=>this._login()} activeOpacity={.7}>
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 12,
    color: '#a4a4a4',
    textAlign: 'justify'
  },
  tit: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
