import React, {useContext, useState} from "react";
import {TextInput, View} from "react-native";
import styled from "styled-components/native";
import {Colors, Images} from "../../Constants";
import {McImage, Song} from "../../Components";
import {BASE_URL} from "../../config";
import axiosInstance from "../../Context/base";
import {AuthContext} from "../../Context/Authcontext";

const Search = () => {
    const {userInfo,token, isLoading, logout} = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});
    const [isFetching, setIsFetching] = useState(false)
    const handleSearch = async (text) => {
        setSearch(text);
        setResults({});
        try {
            setIsFetching(true);
            const url = BASE_URL+ `/?search=${text}`;
            const { data } = await axiosInstance.get(url,{
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token ? token : "",
                }
            });
            setResults(data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
            setIsFetching(false);
        }
    };

    return(
        <Container>
            <ConSearch>
                <SearchSection>
                    <McImage
                        source={Images.find}
                        style={{ marginLeft: 16, marginRight: 12 }}
                    >
                    </McImage>
                    <TextInput
                        placeholder="Song or Artist"
                        onChangeText={(text) => handleSearch(text)}
                        value={search}
                        placeholderTextColor={Colors.grey3}
                        style={{color: "#fff"}}
                    >
                    </TextInput>
                </SearchSection>
                {Object.keys(results).length !== 0 && (
                    <ReasultContainer >
                        {results.songs.length !== 0 && (
                            <View>
                                {results.songs.map((song) => (
                                    <Song song={song} key={song._id} />
                                ))}
                            </View>
                        )}
                    </ReasultContainer>
                )}
            </ConSearch>
        </Container>
    )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
`
const ConSearch = styled.View`
    margin: 15px 24px;
  position: relative;
  flex-direction: column;
`
const SearchSection = styled.View`
  width: 100%;
  height: 52px;
  border-radius: 30px;
  background-color: ${Colors.secondary};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const ReasultContainer = styled.View`
  display: flex;
  z-index: 2;
`


export default Search