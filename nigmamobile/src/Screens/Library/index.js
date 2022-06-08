import React, {useContext, useEffect, useState} from "react";
import {StatusBar,ScrollView, Image,Text, View, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native'
import styled from "styled-components/native";
import {Colors, Images, Metrics} from "../../Constants";
import {McImage, McText, Song} from "../../Components";
import {AuthContext} from "../../Context/Authcontext";
import {BASE_URL} from "../../config";
import newAPI from "../../Context/base";
import axiosInstance from "../../Context/base";
const Library = ({
                        params,
                    }) => {
    const {userInfo,token, isLoading, logout} = useContext(AuthContext)
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [isFetching, setIsFetching] = useState(false)
    const getRandomPlaylist = async () => {
        try {
            setIsFetching(true)
            const url = BASE_URL + "/playlists/random";
            const { data } = await axiosInstance.get(url,{
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token ? token : "",
                }
               }
            )
            const array = data.data.splice(0, 4);
            setPlaylists(array);
            setIsFetching(false);
        }catch (e) {
            setIsFetching(false)
            console.log(e)
        }
    }

    const getSongs = async () => {
        try {
            setIsFetching(true)
            const url = BASE_URL + "/songs";
            const { data } = await axiosInstance.get(url,{
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": userInfo.token ? userInfo.token : "",
                    }
                }
            )
            setSongs(data.data);
            setIsFetching(false);
        }catch (e) {
            setIsFetching(false)
            console.log(e)
        }
    }
    useEffect(() => {
        getRandomPlaylist()
    },[token]);
    useEffect(() => {
        getSongs();
    },[])

    const _renderItem = ({item,index}) => {
        return(
            <View>
                <View
                    style={{
                        marginTop: 16,
                        marginLeft: index === 0 ? 24: 0,
                        marginRight: index === playlists.length - 1 ? 0:24
                    }}
                >
                    <PlaylistImage
                        key={index}
                        source={{uri: item.img === "" ? "https://cdn.discordapp.com/attachments/771761528739069962/981559607912726568/silniy.png" : item.img}}
                    />
                    <McText semi size={16} color={Colors.grey5}>{item.name}</McText>
                    <McText
                        medium
                        size={12}
                        color={Colors.grey3}
                        style={{
                            marginTop: 4
                        }}
                    >
                        {item.desc} ({item.songs.length} Songs)
                    </McText>
                </View>
            </View>
        )
    }
    return(
        <Container>
           <StatusBar barStyle="light-content"/>
            <Navbar>
                <McText
                    bold
                    size={28}
                    color={Colors.primary}
                    style={{
                        marginLeft: Metrics.padding,
                        marginTop: 12,
                    }}
                >
                    Library
                </McText>
            </Navbar>
            <SearchSection>
                <McImage
                    source={Images.find}
                    style={{ marginLeft: 16, marginRight: 12 }}
                >
                </McImage>
                <TextInput
                    placeholder="Song or Artist"
                    placeholderTextColor={Colors.grey3}
                >
                </TextInput>
            </SearchSection>
            <TitleSection>
                <McText medium size={20} color={Colors.grey4}>
                    Playlists
                </McText>
                <TouchableWithoutFeedback onPress={() => {
                    console.log("playlists")
                }}>
                    <McImage source={Images.right}/>
                </TouchableWithoutFeedback>
            </TitleSection>
            <View>
                <FlatList
                    keyExtractor={(item) => 'playlist_' + item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{}}
                    data={playlists}
                    renderItem={_renderItem}
                />
            </View>
            <TitleSection>
                <McText medium size={20} color={Colors.grey4}>
                    Favorite
                </McText>
                <TouchableWithoutFeedback onPress={() => {
                    logout()
                }}>
                    <McImage source={Images.right}/>
                </TouchableWithoutFeedback>
            </TitleSection>
            <View>
                <ScrollView
                    contentContainerStyle={{}}
                    style={{}}
                >
                    {
                        songs.map((item, index) => {
                            return(
                                <Song key={index} song={item}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
`
const SearchSection = styled.View`
  width: 317px;
  height: 52px;
  border-radius: 30px;
  background-color: ${Colors.secondary};
  margin: 20px 24px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const Navbar = styled.View`

`
const TitleSection = styled.View`
  margin: 20px 24px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Logout = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  color: white;
  background-color: white;
`
const PlaylistImage = styled.Image`
  width: 153px;
  height: 186px;
  border-radius: 10px;
  margin-bottom: 12px;
`

export default Library;