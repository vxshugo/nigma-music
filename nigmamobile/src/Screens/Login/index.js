import React, {useContext, useEffect, useState} from "react";
import {Text, View, TextInput,StatusBar, Button, TouchableOpacity} from 'react-native'
import styled from "styled-components/native";
import {Colors} from "../../Constants";
import {Loading, McInput, McText} from "../../Components";
import Entypo from "react-native-vector-icons/Entypo";
import {AuthContext} from "../../Context/Authcontext";
import {useToast} from "react-native-styled-toast";

const Login = ({
                   navigation,
}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const {isLoading, login, notify} = useContext(AuthContext)
    const { toast } = useToast()

    useEffect(() => {
        if (notify == ""){

        }else if(notify == "Success! Go to Login"){

        }else {
            toast({
                message: notify,
                toastStyles: {
                    bg: 'lightblue',
                    borderRadius: 16
                },
                color: 'white',
                iconColor: 'white',
                iconFamily: 'Entypo',
                iconName: 'music',
                closeButtonStyles: {
                    px: 4,
                    bg: 'darkgrey',
                    borderRadius: 16
                },
                closeIconColor: 'white',
                hideAccent: true
            })
        }
    },[notify])

    return (
        <Container>
            {isLoading ? <Loading/> :
                <View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 40,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack('OnBoarding')}>
                            <Entypo
                                name="chevron-left"
                                style={{
                                    fontSize: 18,
                                    color: Colors.white,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <McText color={Colors.grey4} size={36} bold style={{
                        marginBottom: 30,
                        marginTop: 30
                    }}>
                        Log in
                    </McText>
                    <McInput
                        text="jane@example.com"
                        size={30}
                        value={email}
                        onChange={text => setEmail(text)}
                    />
                    <McInput
                        text="••••••••••••"
                        size={31}
                        value={password}
                        onChange={text => setPassword(text)}
                        secureTextEntry
                    />
                    <LoginButton onPress={() => {
                        login(email, password)
                    }
                    }>
                        <McText size={13} color={Colors.grey5} black>
                            LOG IN
                        </McText>
                    </LoginButton>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={{color: Colors.grey3}}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                            <Text style={{color: "white"}}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: flex-start;
  padding: 16px;
`
const InputContainer = styled.View`
  align-items: center;
`
const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: ${Colors.accent};
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 6px;
`

export default Login;