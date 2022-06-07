import React from "react";
import {Text, View, StatusBar, TouchableOpacity, Picker, TextInput} from 'react-native'
import styled from "styled-components/native";
import {Colors, Images} from "../../Constants";
import {McImage, McText} from "../../Components";
const Subscribe = ({navigation}) => {
    return(
        <Container>
            <StatusBar barStyle="light-content"/>
            <McImage source={Images.sub} style={{marginTop: 40}} />
            <McText color={Colors.primary} size={24} bold align="center" style={{
                marginTop: 45
            }}>
                Любимые треки без
                ограничений.
            </McText>
            <McText color={Colors.grey5} size={15} medium align="center" style={{
                marginTop: 25
            }}>
                Музыка без рекламы и без ограничений
                на любом устройстве. Только с
                Nigma Premium.
            </McText>
            <View>
                <SubscribeButton onPress={() => navigation.navigate("Library")}>
                    <McText color={Colors.black} size={15} medium align="center">Подписаться на
                        Nigma Premium
                    </McText>
                </SubscribeButton>
                <NotSub onPress={() => navigation.navigate("Library")}>
                    <McText color={Colors.white} size={20} bold align="center">
                        Нет, спасибо
                    </McText>
                </NotSub>
            </View>
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: flex-start;
  padding: 39px;
  align-items: center;
`

const SubscribeButton = styled.TouchableOpacity`
  margin-top: 15px;
  width: 300px;
  height: 50px;
  padding: 6px 67px 5px 67px;
  align-items: center;
  background-color: ${Colors.primary};
  border-radius: 20px;
`
const NotSub = styled.TouchableOpacity`
  margin-top: 15px;
  align-items: center;
`

export default Subscribe;