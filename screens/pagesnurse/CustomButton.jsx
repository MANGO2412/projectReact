
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = () => {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('Asignarmedico'); // Usar el nombre de la ruta, no el archivo
    };
  
    return (
      <TouchableOpacity onPress={handlePress} style={{paddingBottom:500}}>
        <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Enviar</Text>
      </TouchableOpacity>
    );
};
  
export default CustomButton;
