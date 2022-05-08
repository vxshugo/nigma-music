import React from "react";
import {Text, View, StatusBar, Button, TouchableOpacity} from 'react-native'
import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import {useToast} from "react-native-styled-toast";

const Loading = () => {
    return(
        <Container>
            <LottieView
                source={require("../../../assets/loading.json")}
                style={{width: 300, height: 300}}
                autoPlay
            />
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`
export default Loading