import { useState,useEffect,useCallback} from 'react'
import {Text,View,TouchableOpacity,StyleSheet,SafeAreaView,FlatList,TextInput} from 'react-native'
import {AntDesign,FontAwesome5} from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';


export default function CreateFile({navigation}){
    const [search,setSearch]=useState('');
    const [filteredDataSource,SetFilteredDataSource]=useState([]);
    const [masterDataSource,setMasterDataSource]=useState([])
    const [loading, setLoading] = useState(true); 
    

     //codigo para que habilite la actualizacion del los datos de forma automatica
     useFocusEffect(
       useCallback(() => {
        async function getID(){
          setLoading(true)
          let id=await SecureStore.getItemAsync('hospital')
          fetch('https://apifullheath.onrender.com/patients/byHospital/'+id)
          .then((resp)=> resp.json())
          .then(async (resp)=>{
            let files=JSON.parse(await SecureStore.getItemAsync('files'));
            console.log(files)
            for (const iterator in resp) {
                   for(const iterator2 of files){
                        if(resp[iterator]['_id']==iterator2){
                          resp.splice(iterator,1);
                        }
                   }
            }
            
           SetFilteredDataSource(resp);
           setMasterDataSource(resp);
           
          }).finally(() => setLoading(false)); 
       }
      
       getID()
         // Do something when the screen is focused
         return () => {};
       }, [])
     );

  

    const searchFilterrFunction=(text)=>{
       if(text){
          const newData=masterDataSource.filter((item)=>{
              const itmeData=item.name?item.name.toUpperCase():''.toUpperCase()
               const textData=text.toUpperCase();

               return itmeData.indexOf(textData)>-1
          })
          SetFilteredDataSource(newData);
          setSearch(text);
       }else{
        SetFilteredDataSource(masterDataSource);
        setSearch(text)
       }
    }

    const ItemView=({item})=>(
      <Text style={styles.textList} onPress={()=>{sendFormFile(item)}}>
        {// <FontAwesome5 name="user-injured"  size={45} color="black" />
        // {item.name} {item.lastname}}
        }
        <View style={styles.tarjeta}>
        <View style={styles.nombre}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Patient's name: </Text>
          <Text style={{ fontSize: 15 }}>{item.name} {item.lastname}</Text>
        </View>
          </View>
      </Text>
    )

   const sendFormFile=async (item)=>{
    await SecureStore.setItemAsync('patient',JSON.stringify(item))
    navigation.navigate('CreateAddFile');
   }


    return(
      <SafeAreaView style={{ flex: 1}}>
           <View style={styles.container}>
         
         <TextInput
           style={styles.textInputStyle}
           value={search}
           onChangeText={(text)=>{
             searchFilterrFunction(text)
           }}
           underlineColorAndroid="transparent"
           placeholder="Search Here"
         />
         <TouchableOpacity style={{ backgroundColor: '#39a969', padding: 10,borderRadius: 8}} onPress={()=>{navigation.navigate('CreateAddFile')}}>
         <AntDesign name="adduser" size={30}  color="white" />
       </TouchableOpacity>
       </View>
        {
          loading?(
          <View style={styles.container2}>
              {/*loader icon  */}
         </View> 
          ):(
            <View style={styles.container2}>
            <Text style={styles.textTit}>lista de pacientes</Text>
            <FlatList data={filteredDataSource} keyExtractor={(item,index)=>index.toString()}
                  renderItem={ItemView}
            />
         </View>
          )
        } 
    </SafeAreaView>
    )   
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      display:'flex',
      flexDirection:'row'
    },
    container2: {
      display:'flex',
      backgroundColor: '#fff'
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
      width:310
    },
    textTit:{
      textAlign:'center',
      fontSize:30,
      padding:10
    },
    textList:{
      fontSize:20,
      padding:10
    },
    tarjeta: {
      width: '10%',
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 20,
      gap: 5,
      borderWidth: 1,
      borderColor: '#d9d9d9d9'
    },
    nombre: {
      display: 'flex',
      flexDirection: 'row', // Corregir "Row" a "row"
      fontSize: 30
    },
  })