//imports to use libraries of react native
import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../store/AuthContext';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// main screee
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen  from '../screens/SplashScreen'
import Login from '../screens/Login';

//screen nurse
import Formpaciente from '../screens/pagesnurse/Formpaciente';
import CreateFile from '../screens/pagesnurse/CreateFIle';
import Receta from '../screens/pagesdoctor/Receta'
import HomeScreendoc from '../screens/pagesdoctor/Homescreendoc';
import Vistapac from '../screens/pagesdoctor/Vistapac';


//initialize the variables
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();



//alerta de inicio de sesion
const showAlert = () => {
  Alert.alert(
    'Error al iniciar sesion',
    'Verifica si tu correo o contraseña son correctas'
  );
};


//Nurse Nav
const NurseTabsNavgator=()=>(
  <>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#39a969"
      barStyle={{ backgroundColor: 'white' }}
    >
    
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'see files',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Form" 
        component={CreateFile}
        options={{
          tabBarLabel: 'Create File',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </>
)

//Doctor Nav
const DocTabsNavigator=()=>(
  <>
  <Tab.Navigator
    initialRouteName="HomeSreen"
    activeColor="#39a969"
    barStyle={{ backgroundColor: 'white' }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreendoc}
      options={{
        tabBarLabel: 'see files',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
  
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
   
  </Tab.Navigator>
 </>
)




//Es el menu de la aplicacion

const NavContener = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            TypeUser: action.typeUser,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            TypeUser:action.typeUser
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            TypeUser:null
          };
      }
    },
    
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken,typeuser;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('user');
        typeuser=await SecureStore.getItemAsync('typeUser')
      } catch (e) {
        userToken = null;
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken,typeUser:typeuser });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let resp = await fetch('https://apifullheath.onrender.com/medicalUsrs/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        let mess = await resp.json();
        let res=mess[0];
        if (res != null) {
          console.log(res)
          await SecureStore.setItemAsync('user',String(res["_id"]));
          await SecureStore.setItemAsync('hospital',String(res["Medical_info"].hospital));
          await SecureStore.setItemAsync('typeUser',res.typeUser);
        } else {
          showAlert();
        }

        dispatch({ type: 'SIGN_IN', token: res ? ["_id"]: null ,typeUser:mess[0]?mess[0].typeUser : null});
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('user');
        await SecureStore.deleteItemAsync('typeUser')
        await SecureStore.deleteItemAsync('hospital');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

   return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            {state.isLoading ? (
                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                </Stack.Navigator>
            ) : state.userToken == null ? (
              
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={Login}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
            ) :(
            <Stack.Navigator>
                <Stack.Screen name=" " component={state.TypeUser==="Doctor" ? (DocTabsNavigator):(NurseTabsNavgator) }/>
                {/* agregar receta */}
                 <Stack.Screen name="Receta" component={Receta}/>
                 <Stack.Screen name="CreateAddFile" component={Formpaciente}/>
                 <Stack.Screen name="Vistapac" component={Vistapac}/>
             
             </Stack.Navigator>
            )
            }
        </NavigationContainer>
      </AuthContext.Provider>
   )
};

export default NavContener;
