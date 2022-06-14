import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';

import { useTheme, lightTheme, darkTheme } from 'Themes';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import Stacks from './Stacks';
import TabStacks from './TabStacks';
import BottomBar from "../../Screens/Library/BottomBar";
import styled from "styled-components/native";

export default function AppNavigator() {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme.mode === 'dark' ? darkTheme : lightTheme}>
      {/* Use TabStacks or Stacks below to display the bottom tabs or not */}
       <Stacks />
        <BottomSection>
            <BottomBar/>
        </BottomSection>
      {/*<TabStacks />*/}
    </NavigationContainer>
  );
}


const BottomSection = styled.View`
    margin: 0px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 1;
`