import React, {useContext, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import styled from "styled-components/native";
import {Colors} from "../../Constants";
import {AuthContext} from "../../Context/Authcontext";
import {BASE_URL} from "../../config";
import axiosInstance from "../../Context/base";
import {McText, Song} from "../../Components";


const Favorite = () => {
    const [songs, setSongs] = useState([]);
    const {userInfo,token, isLoading, logout} = useContext(AuthContext)

    const getlikedSongs = async () => {
      try {
          const url = BASE_URL + `/songs/like`;
          const { data }= await axiosInstance.get(url, {
              headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": token ? token : "",
              }
          });
          setSongs(data.data)
      }catch (e) {
          console.log(e)
      }
    }
    useEffect(() => {
        getlikedSongs();
    }, []);
  return(
      <Container>
          <Wrapper>
              <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}>
                  <McText medium size={24} color={Colors.grey5}>
                      Favorite
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


const Wrapper = styled.View`
    margin: 0px 24px;
`

export default Favorite