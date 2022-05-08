import React, {useContext} from "react";
import {Text, View} from 'react-native'
import styled from "styled-components/native";
import {Colors} from "../../Constants";
import {McText} from "../../Components";
import {AuthContext} from "../../Context/Authcontext";

const Library = ({
                        params,
                    }) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext)

    return(
        <Container>
            <View style={{
                flexDirection: "row"
            }}>
                <McText color={Colors.grey4} size={36} bold style={{
                    marginTop: 24,
                    marginLeft: 24,
                }}>
                    Library
                </McText>
                <McText color={Colors.grey4} size={24} medium style={{
                    marginTop: 24,
                    marginLeft: 24,
                }}>
                    {userInfo.name}
                </McText>
            </View>
            <Logout
                onPress={() => {
                    logout()
                }}
            >
                <McText color={Colors.grey4} size={24} medium style={{
                    marginTop: 24,
                    marginLeft: 24,
                }}>
                    Выход
                </McText>
            </Logout>
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: flex-start;
  padding: 16px;
`
const Logout = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: ${Colors.accent};
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 6px;
`
export default Library;