import React, {useContext, useEffect} from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Home,
    Profile,
    OnBoarding,
    Library,
    Player,
    Login,
    Register,
    LastStep,
    Subscribe,
    Music,
    Playlist, Search, Favorite
} from '../../Screens';
import {AuthContext} from "../../Context/Authcontext";
import {Loading} from "../../Components";


const Stack = createStackNavigator();

const Stacks = ({ params }) => {
    const {splashLoading,userInfo} = useContext(AuthContext);

    return(
        <Stack.Navigator initialRouteName="OnBoarding">
            {splashLoading ? (
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : userInfo.name ? (
                        <>
                            {userInfo.premium === false && (
                                <>
                                    <Stack.Screen
                                        name="Subscribe"
                                        component={Subscribe}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                </>
                            )}
                            <Stack.Screen
                                name="Library"
                                component={Library}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Music"
                                component={Music}
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
                            <Stack.Screen
                                name="Search"
                                component={Search}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Favorite"
                                component={Favorite}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Playlist"
                                component={Playlist}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </>
                    ) : (
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
