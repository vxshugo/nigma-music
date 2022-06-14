import React,{useContext} from 'react';
import { View, Switch, Button } from 'react-native';
import styled from 'styled-components/native';

import { useTheme, Fonts, Images, Metrics } from '../../Themes';
import { McText, McImage, PlayButton } from '../../Components';
import {AuthContext} from "../../Context/Authcontext";
import {Colors} from "../../Constants";

const Profile = ({ navigation }) => {
    const {logout} = useContext(AuthContext)
  const theme = useTheme();
  return (
    <Container>
      <Title>Profile Screen</Title>
      <Button
        onPress={() => {
            logout()
        }}
        title="Logout"
      ></Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${Colors.background};
`;
const Title = styled.Text`
  font-size: 30px;
  color: #fff;
  margin-bottom: 30px;
`;
const Text = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;
const SwitchSection = styled.View`
  margin: 30px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default Profile;
