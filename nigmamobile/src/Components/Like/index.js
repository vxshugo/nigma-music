import React, {useContext, useState} from "react";
import {View, Text,TouchableOpacity} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import {AuthContext} from "../../Context/Authcontext";
import axiosInstance from "../../Context/base";
import {BASE_URL} from "../../config";

const Like = ({songId}) => {
    const {userInfo,token} = useContext(AuthContext)
    const [progress,setProgress] = useState(false)


    const likeSong = async (songID) => {
      try {
          const url = BASE_URL + "/songs/like/" + songID
          const {data} = await axiosInstance.put(url,{
              headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": token ? token : "",
              }
          })
      }catch (e) {
          if(
              e.response &&
              e.response.status >=400 &&
              e.response.status < 500
          ) {
              console.log(e.response.data)
          }else {
              console.log(e)
          }
      }
    }

    const handleLike = async (id) => {
        setProgress(true)
        console.log(token)
        console.log(songId)
        const res = await likeSong(id)
        res && setProgress(false)
    }

  return(
     <TouchableOpacity
         onPress={() => likeSong(songId)}
     >
         <>
             {userInfo && userInfo?.likedSongs?.indexOf(songId) === -1 ? (
                 <AntDesign name="hearto" size={24} color="#ED1BA3" />
             ): (
                 <AntDesign name="heart" size={24} color="#ED1BA3" />
             )}
         </>
     </TouchableOpacity>
  )
}

export default Like