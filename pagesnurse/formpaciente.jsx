import { Image } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/react-toastify';

const formpaciente = () => {
  const formArray = [1, 2];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name: '',
    lastname: '',
    age:'',
    phone: '',
    emergencyPhone:'',
    DoB:'',
    weight: '',
    height: '',
    typeBlood:'',
    hospital:0
  });
  const [selectedFruit, setSelectedFruit] = useState('Cherry');
  const [formData, setFormData] = useState({});

  const inputHandle = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const next = () => {
    if (formNo === 1 && state.name && state.lastname && state.age && state.phone && state.emergencyPhone && state.DoB ) {
      if (state.phone.length === 10) {
        setFormNo(formNo + 1);
      } else {
        toast.error('Please enter a valid phone number');
      }
    } else if (formNo === 2 && state.weight && state.height && state.typeBlood) {
      setFormNo(formNo + 1);
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const finalSubmit = () => {
    if (state.name && state.lastname && state.age && state.phone && state.emergencyPhone && state.DoB && state.weight && state.height && state.typeBlood) {
      console.log(formData); // Mostrar datos del formulario en la consola
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  const validateNumberInput = (value) => {
    const regex = /^\d+(\.\d{1,2})?$/; // Accepts numbers with up to 2 decimal places
    return regex.test(value);
  };

  const validateEmailInput = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    return regex.test(value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        style={{ width: 250, height: 52, alignSelf: 'center', marginBottom: 40 }}
        source={require('../img/logonav.png')} 
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  backgroundColor:
                    formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? '#39A969' : '#CBD5E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 3
                }}
              >
                <Text style={{ color: '#FFF' }}>{v}</Text>
              </View>
              {i !== formArray.length - 1 && (
                <View
                  style={{
                    width: 85,
                    height: 2,
                    backgroundColor: formNo === i + 2 || formNo === formArray.length ? '#39A969' : '#CBD5E0'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {formNo === 1 && (
          <View>
            <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Datos del paciente</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 12, fontSize: 16 }}>Nombre del Paciente</Text>
              <TextInput
                value={state.name}
                onChangeText={(value) => inputHandle('name', value)}
                style={{
                  borderWidth: 1,
                  borderColor: '#CBD5E0',
                  paddingVertical: 8,
                  borderRadius: 4,
                  marginBottom: 4,
                  marginTop: 0
                }}
                placeholder="Name"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Apellidos del paciente</Text>
              <TextInput
                value={state.lastname}
                onChangeText={(value) => inputHandle('lastname', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Lastname"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Edad del paciente</Text>
              <TextInput
                value={state.age}
                onChangeText={(value) => inputHandle('age', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="age"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Numero de celular</Text>
              <TextInput
                value={state.phone}
                onChangeText={(value) => inputHandle('phone', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Cellphone Number"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Feha de ingreso</Text>
              <TextInput
                value={state.DoB}
                onChangeText={(value) => inputHandle('DoB', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4, marginBottom:10 }}
                placeholder="DoB"
              />
            </View>
            <TouchableOpacity onPress={next} style={{ backgroundColor: '#39A969', borderRadius: 4, width: 70, alignSelf:'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign:'center', fontSize:16 }}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {formNo === 2 && (
          <View>
            <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Patient's record</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 12, fontSize: 16 }}>Patient's weight</Text>
              <TextInput
                value={state.weight}
                onChangeText={(value) => inputHandle('weight', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Weight(kg)"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>height</Text>
              <TextInput
                value={state.height}
                onChangeText={(value) => inputHandle('height', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Height(foot)"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>TypeBlood</Text>
              <TextInput
                value={state.typeBlood}
                onChangeText={(value) => inputHandle('typeBlood', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="typeBlood"
                multiline
              />
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity onPress={pre} style={{ backgroundColor: '#39A969', borderRadius: 4 ,textAlign:'center', fontSize:16}}>
                <Text style={{ color: '#FFF', padding: 8 }}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={finalSubmit} style={{ backgroundColor: '#39A969', borderRadius: 4,width: 80, alignSelf:'center' }}>
              <Text style={{ color: '#FFF', padding: 8,textAlign:'center' }}>Submit</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default formpaciente;
