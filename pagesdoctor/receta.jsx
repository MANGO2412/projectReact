import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css'; cambiar por un componente de alerta a react native 


const App = () => {
  const [state, setState] = useState({
    diagnostico: '',
    tratamiento: ''
  });

  const finalSubmit = () => {
    if (state.diagnostico && state.tratamiento) {
      console.log(state); // Mostrar datos del formulario en la consola
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  const inputHandle = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: 250, height: 52, alignSelf: 'center', marginTop: 15, marginBottom: 10 }}
        source={require('./img/logonav.png')}
      />
      <ToastContainer />
      <View
        style={{
          width: 370,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#FFF',
          padding: 16
        }}
      >
        <View>
          <Text style={{ marginTop: 12, marginBottom: 20, fontSize: 22, alignSelf:'center' }}>Receta medica</Text>
          <View style={{ marginBottom: 14, display: 'flex', flexDirection: 'row', backgroundColor:'#39a969', width:'100%', height:30   }}>
            <Text style={{ marginTop: 7,marginLeft:100, fontSize: 16, fontWeight:'bold', marginBottom:5, color:'#fff' }}>Datos del paciente</Text>
          </View>
          <View>
            <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row'   }}>
              <Text style={{ marginTop: 0, fontSize: 16, fontWeight:'bold', marginBottom:5 }}>Nombre:</Text>
              <Text style={{ marginTop: 0, fontSize: 16 }}>  Gael Breton Rendon</Text>
            </View>
            <View style={{ marginBottom: 14, display: 'flex', flexDirection: 'row'   }}>
              <Text style={{ marginTop: 0, fontSize: 16, fontWeight:'bold' }}>Edad:</Text>
              <Text style={{ marginTop: 0, fontSize: 16 }}>  30  </Text>
              <Text style={{ marginTop: 0, fontSize: 16, fontWeight:'bold' }}>  Peso:</Text>
              <Text style={{ marginTop: 0, fontSize: 16 }}> 90kg </Text>
              <Text style={{ marginTop: 0, fontSize: 16, fontWeight:'bold' }}>  Temperatura:</Text>
              <Text style={{ marginTop: 0, fontSize: 16 }}>  30ºC </Text>
            </View>
            <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row', backgroundColor:'#39a969', width:'100%', height:30   }}>
            <Text style={{ marginTop: 7,marginLeft:70, fontSize: 16, fontWeight:'bold', marginBottom:5, color:'#fff' }}>Diagnostico y tratamiento</Text>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ marginTop: 5, fontSize: 16 }}>Diagnostico</Text>
            <TextInput
  value={state.diagnostico}
  onChangeText={(value) => inputHandle('diagnostico', value)}
  style={{
    color: '#000000',
    outline: 'none',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    paddingVertical: 8,
    borderRadius: 4,
    minHeight: 150,
    maxHeight: 100, // Opcional: puedes establecer una altura máxima si deseas limitarla
  }}
  placeholder="Escribe el diagnóstico del paciente:"
  multiline={true}
  numberOfLines={5} // Opcional: establece el número de líneas visibles inicialmente
/>

          </View>
          <View style={{ marginBottom: 8, marginBottom:12 }}>
            <Text style={{ marginTop: 5, fontSize: 16 }}>Tratamiento</Text>
            <TextInput
  value={state.tratamiento}
  onChangeText={(value) => inputHandle('tratamiento', value)}
  style={{
    color: '#000000',
    outline: 'none',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    paddingVertical: 8,
    borderRadius: 4,
    minHeight: 150,
    maxHeight: 100, // Opcional: puedes establecer una altura máxima si deseas limitarla
  }}
  placeholder="Escribe el tratamiento que recibira el paciente:"
  multiline={true}
  numberOfLines={5} // Opcional: establece el número de líneas visibles inicialmente
/>

          </View>
            <TouchableOpacity onPress={finalSubmit} style={{ backgroundColor: '#39A969', borderRadius: 8, width: 80, alignSelf: 'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;


