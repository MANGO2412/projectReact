import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Boton = (props) => {
    const {onPress, text} = props

    return(
        <TouchableOpacity
        style={styles.boton}
        onPress={onPress}
        >
    <Text> {text} </Text>
        </TouchableOpacity>
    )

}
export default Boton 

const styles = StyleSheet.create({

    boton: {
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
  });