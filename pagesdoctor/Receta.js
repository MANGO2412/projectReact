import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, StyleSheet } from 'react-native';

const Receta = () => {
  const [state, setState] = useState({
    diagnostic: '',
    symptoms: '',
  });

  const [treatment, setTreatment] = useState({
    medication: '',
    Dosis: '',
    Duration: '',
    Administration: '',
    Description: '',
  });

  const finalSubmit = () => {
    if (state.diagnostic && state.symptoms && treatment.Dosis && treatment.Duration && treatment.Administration && treatment.Description) {
      sendFormData();
      console.log(state, treatment);
    } else {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos.');
    }
  };

  const sendFormData = async () => {
    try {
      const formData = { ...state, treatment };

      const response = await fetch('https://apifullheath.onrender.com/files/edit/0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', 'Formulario enviado exitosamente');
      } else {
        console.log('Error al enviar el formulario');
        Alert.alert('Error', 'Hubo un error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
      Alert.alert('Error', 'Hubo un error al enviar el formulario');
    }
  };

  const inputHandle = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setTreatment((prevTreatment) => ({
      ...prevTreatment,
      [name]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 250, height: 52, alignSelf: 'center', marginTop: 15, marginBottom: 10 }}
          source={require('../img/logonav.png')}
        />
        <View
          style={{
            width: 370,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#FFF',
            padding: 16,
          }}
        >
          <View>
            <Text style={{ marginTop: 12, marginBottom: 20, fontSize: 22, alignSelf: 'center' }}>Receta medica</Text>
            <View style={{ marginBottom: 14, display: 'flex', flexDirection: 'row', backgroundColor: '#39a969', width: '100%', height: 30 }}>
              <Text style={{ marginTop: 7, marginLeft: 100, fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#fff' }}>Datos del paciente</Text>
            </View>
            <View>
              <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Nombre:</Text>
                <Text style={{ marginTop: 0, fontSize: 16 }}>  Gael Breton Rendon</Text>
              </View>
              <View style={{ marginBottom: 14, display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}>Edad:</Text>
                <Text style={{ marginTop: 0, fontSize: 16 }}>  30  </Text>
                <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}>  Peso:</Text>
                <Text style={{ marginTop: 0, fontSize: 16 }}> 90kg </Text>
                <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}>  Temperatura:</Text>
                <Text style={{ marginTop: 0, fontSize: 16 }}>  30ºC </Text>
              </View>
              <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row', backgroundColor: '#39a969', width: '100%', height: 30 }}>
                <Text style={{ marginTop: 7, marginLeft: 70, fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#fff' }}>Diagnostico y tratamiento</Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ marginTop: 5, fontSize: 16 }}>Diagnostico</Text>
                <TextInput
                  value={state.diagnostic}
                  onChangeText={(value) => inputHandle('diagnostic', value)}
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
              <View style={{ marginBottom: 8, marginBottom: 12 }}>
                <Text style={{ marginTop: 5, fontSize: 16 }}>Sintomas</Text>
                <TextInput
                  value={state.symptoms}
                  onChangeText={(value) => inputHandle('symptoms', value)}
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
                  placeholder="Sintomas:"
                  multiline={true}
                  numberOfLines={5} // Opcional: establece el número de líneas visibles inicialmente
                />
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ marginTop: 12, fontSize: 16 }}>Medicamentos a Asignar</Text>
                  <TextInput
                    value={treatment.medication}
                    onChangeText={(value) => inputHandle('medication', Number(value))}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CBD5E0',
                      paddingVertical: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                    placeholder="Numero del medicamento"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ marginTop: 12, fontSize: 16 }}>Dosis del medicamento que le asignaste</Text>
                  <TextInput
                    value={treatment.Dosis}
                    onChangeText={(value) => inputHandle('Dosis', value)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CBD5E0',
                      paddingVertical: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                    placeholder="Dosis"
                  />
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ marginTop: 12, fontSize: 16 }}>Duracion de tratamiento</Text>
                  <TextInput
                    value={treatment.Duration}
                    onChangeText={(value) => inputHandle('Duration', value)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CBD5E0',
                      paddingVertical: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                    placeholder="Duracion del medicamento"
                  />
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ marginTop: 12, fontSize: 16 }}>Administracion del medicamento</Text>
                  <TextInput
                    value={treatment.Administration}
                    onChangeText={(value) => inputHandle('Administration', value)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CBD5E0',
                      paddingVertical: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                    placeholder="Administracion del medicamento"
                  />
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ marginTop: 12, fontSize: 16 }}>Description</Text>
                  <TextInput
                    value={treatment.Description}
                    onChangeText={(value) => inputHandle('Description', value)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CBD5E0',
                      paddingVertical: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                    placeholder="Description"
                  />
                </View>
              </View>
              <TouchableOpacity onPress={finalSubmit} style={{ backgroundColor: '#39A969', borderRadius: 8, width: 80, alignSelf: 'center' }}>
                <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});

export default Receta;
