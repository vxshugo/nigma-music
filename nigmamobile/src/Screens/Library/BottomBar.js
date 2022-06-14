import React, {useState,useContext, useEffect} from "react";
import {Text, View,Image,TouchableOpacity} from "react-native"
import styled from "styled-components/native";
import {Colors, Images} from "../../Constants";
import {AuthContext} from "../../Context/Authcontext";
import {McImage, McText, PlayButton} from "../../Components";
import axiosInstance from "../../Context/base";
import {Sound} from "expo-av/build/Audio/Sound";
import {LinearGradient} from "expo-linear-gradient";
import Svg, {Circle, G , Path} from "react-native-svg";


const BottomBar = ({children}) => {
    const [show,setShow] = useState(false)
    const {currentSong} = useContext(AuthContext)
    const [artist, setArtist] = useState({})

    const [sound, setSound] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState(null);

    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying)
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
    }

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Sound.createAsync(
            { uri: currentSong.song },
            { shouldPlay: isPlaying },
            onPlaybackStatusUpdate
        )

        setSound(newSound)
    }

    const getArtistName = async () => {
        try {
            const {data} = await axiosInstance.get(`/artist/${currentSong.artist}`)
            setArtist(data.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (currentSong){
            playCurrentSong()
            setShow(true)
        }
        getArtistName()
    },[currentSong])


    const onPlayPausePress = async () => {
      if (!sound){
          return
      };
      if (isPlaying){
          await sound.stopAsync()
      }else {
          await sound.playAsync()
      }
    }

    if (!currentSong) {
        return null;
    }
  return(
      <>
          {show ?
              <Container>
                 <ContainerTh>
                     <ContainerName>
                         <View style={{justifyContent: 'flex-start'}}>
                             <ImageSong
                                 source={{uri: currentSong.img}}
                             />
                         </View>
                         <TouchableOpacity style={{flexDirection: 'column', marginLeft: 10, width: 170}}>
                             <McText
                                bold
                                size={16}
                                color={Colors.grey5}
                             >
                                 {currentSong.name}
                             </McText>
                             <McText
                                 medium
                                 size={12}
                                 color={Colors.grey3}
                             >
                                 {artist.name}
                             </McText>
                         </TouchableOpacity>
                     </ContainerName>
                     <View style={{marginTop: 6,marginRight: 22}}>
                         <PlayButton onPress={onPlayPausePress} size={56} circle={51.58} icon={isPlaying ? Images.stop : Images.play}></PlayButton>
                     </View>
                 </ContainerTh>
              </Container> :
              <>

              </>
          }
      </>
  )
}

const Container = styled.View`
  width: 100%;
  height: 84px;
  border-radius: 84px;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`
const ContainerTh = styled.View`
  margin: 5px 2px;
  width: 100%;
  height: 70px;
  border-radius: 70px;
  background-color: ${Colors.secondary};
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 0;
`
const ContainerName = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 13px 10px;
`
const ImageSong = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  align-items: center;
  justify-content: center;
`
export default BottomBar