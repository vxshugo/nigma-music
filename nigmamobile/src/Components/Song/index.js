import React, {useContext, useEffect, useState} from "react";
import {StatusBar,ScrollView, Image,Text, View, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native'
import styled from "styled-components/native";
import {McImage, McText} from "../index";
import {Colors, Images} from "../../Constants";
import axiosInstance from "../../Context/base";
import {AuthContext} from "../../Context/Authcontext";
const Song = ({song}) => {
     const [artist, setArtist] = useState({})
    const {setCurrentTrack} = useContext(AuthContext)

    const getArtistName = async () => {
         try {
             const {data} = await axiosInstance.get(`/artist/${song.artist}`)
             setArtist(data.data)
         }catch (e) {
             console.log(e)
         }
    }



    useEffect(() => {
        getArtistName()
    },[])



    return (
       <Container>
          <View style={{flexDirection: 'row'}}>
              <Left onPress={() => {
                  setCurrentTrack(song)
              }}>
                  <SongImage source={{uri: song.img === "" ? "https://media.discordapp.net/attachments/771761528739069962/983759312885272716/Group_113_1.png" : song.img}}
                  />
              </Left>
              <View style={{
                  marginLeft: 12
              }}>
                  <McText semi size={14} color={Colors.grey5}>
                      {song.name}
                  </McText>
                  <McText medium size={12} color={Colors.grey3} style={{
                      marginTop: 4
                  }}>
                      {artist.name}
                  </McText>
              </View>
          </View>
          <McImage source={Images.like}/>
       </Container>
    )
}

const Container = styled.View`
  width: 327px;
  height: 42px;
  display: flex;
  margin: 10px 24px;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  
`
const Left = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  align-items: center;
  justify-content: center;
`
const SongImage = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  align-items: center;
  justify-content: center;
`
export default Song
