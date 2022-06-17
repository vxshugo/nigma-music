import React, {useContext, useEffect, useState} from "react";
import { FlatList, ScrollView,RefreshControl, View, Text,Image,StyleSheet, Linking,TouchableOpacity } from "react-native";
import {useRoute} from "@react-navigation/native";
import {BASE_URL} from "../../config";
import axiosInstance from "../../Context/base";
import {AuthContext} from "../../Context/Authcontext";
import {Colors} from "../../Constants";
import styled from "styled-components/native";
import {McText, Song} from "../../Components";
import BottomBar from "../Library/BottomBar";

const Playlist = () => {
    const {token} = useContext(AuthContext)
    const [playlist, setPlaylist] = useState({})
    const [songs, setSongs] = useState([])
    const route = useRoute()
    const {
        params: {ID},
    }  = route

    const getPlaylistData = async () => {
      try {
          const url = BASE_URL + "/playlists/"+ ID
          const {data} = await axiosInstance.get(url,{
              headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": token ? token : "",
              }
          })
          setPlaylist(data.data.playlist)
          setSongs(data.data.songs)
      }catch (e) {
          console.log(e)
      }
    }



    useEffect(() => {
        getPlaylistData()
    },[])
  return(
      <Container>
          <Wrapper>
              <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}>
                  <McText medium size={24} color={Colors.grey5}>
                      {playlist.name}
                  </McText>
              </View>
              <View>
                  <ScrollView
                      contentContainerStyle={{}}
                      style={{}}
                  >
                      {
                          songs.map((item) => {
                              return(
                                  <Song key={`id-${item._id}`} song={item}/>
                              )
                          })
                      }
                  </ScrollView>
              </View>
          </Wrapper>
      </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`

const BottomSection = styled.View`
  margin: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 1;
`

const Wrapper = styled.View`
    margin: 0px 24px;
`

export default Playlist