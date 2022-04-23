import React from "react";
import {Text, View} from 'react-native'
import styled from "styled-components/native"
import {LinearGradient} from "expo-linear-gradient"
import McText from "../McText";
import {Colors} from "../../Constants";

const loadButton = ({
                        params,
    text,
    onPress,
    size,
    bgColor,
                }) => (
    <Container style={{backgroundColor: bgColor}} onPress={onPress}>
        <McText size={13} color={Colors.grey5} medium>
            {text}
        </McText>
    </Container>
)

const Container = styled.TouchableOpacity`
  width: ${props => props.size || 315}px;
  height : ${props => props.size || 52}px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid white;
`
const Texts = styled.Text`
  color: white;
`

export default loadButton;