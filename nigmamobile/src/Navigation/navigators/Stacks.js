import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {Home, Profile, OnBoarding, Library, Player, Login, Register, LastStep} from '../../Screens';
import {AuthContext} from "../../Context/Authcontext";


const Stack = createStackNavigator();

const Stacks = ({ params }) => {
    const {userInfo} = useContext(AuthContext);

    return(
        <Stack.Navigator initialRouteName="OnBoarding">
            {userInfo._id ? (
                <>
                    <Stack.Screen
                        name="Library"
                        component={Library}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="Player"
                        component={Player}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            ): (
                <>
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RegisterLast"
                        component={LastStep}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    )
};

export default Stacks;
