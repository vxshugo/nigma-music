import React, {useContext, useState, useEffect} from "react";
import {Text, View, StatusBar, Button, TouchableOpacity} from 'react-native'
import styled from "styled-components/native";
import {Colors} from "../../../Constants";
import {useRoute} from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import {Loading, McInput, McText} from "../../../Components";
import {AuthContext} from "../../../Context/Authcontext";
import {useToast} from "react-native-styled-toast";


const LastStep = ({navigation}) => {
    const [name, setName] = useState(null)
    const route = useRoute();
    const {
        params: { email,password,gender,month,date,year },
    } = route;

    const {isLoading, register, notify} = useContext(AuthContext)

    const { toast } = useToast()

    useEffect(() => {
        if (notify == ""){

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
  return(
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
                      Register
                  </McText>
                  <McInput
                      text="vxshugo"
                      size={16}
                      value={name}
                      onChange={text => setName(text)}
                  />
                  <RegisterButton
                      onPress={() => {
                          register(name, email,password,gender,month,date,year);
                      }}
                  >
                      <McText size={13} color={Colors.grey5} black>
                          SING UP
                      </McText>
                  </RegisterButton>
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
const RegisterButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: ${Colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`
export default LastStep