import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Homescreen from '../Nav/HomeScreen'
import Receta from '../pagesdoctor/Receta'

const Stack = createNativeStackNavigator()

const MainStack = () => {
return(
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
            name = 'Homescreen'
            component={Homescreen}
        />
        <Stack.Screen
            name = 'Receta'
            component={Receta}
        />
    </Stack.Navigator>
</NavigationContainer>
)
}

export default MainStack