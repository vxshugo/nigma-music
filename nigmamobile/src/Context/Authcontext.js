import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newAPI from "../Context/base"
import { useToast } from 'react-native-styled-toast'

export const AuthContext = createContext();

export const AuthProvider = ({children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [notify, setNotify] = useState("")
  const [splashLoading, setSplashLoading] = useState(false)

  const register = async (name, email,password,gender,month,date,year,{navigation} ) => {
    setIsLoading(true);

    try {
        const url = BASE_URL + "/users"
        await newAPI.post(url,{
            name,email,password,gender,date,month,year
        })
        setNotify("Success! Go to Login")
        navigation.navigate('Login')
        setIsLoading(false)
    }catch (e){
        if(
            e.response &&
            e.response.status >=400 &&
            e.response.status < 500
        ) {
            setNotify(e.response.data.message)
            console.log(e.response.data)
        }else {
            console.log(e)
        }
        setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    setIsLoading(true)
    try {
        const url = "/login"
        const {data} = await newAPI.post(url,{email,password});
        setNotify(data.message)
        const decodeData = jwt_decode(data.data);
        setUserInfo(decodeData)
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false)
    }catch (e) {
        if(
            e.response &&
            e.response.status >=400 &&
            e.response.status < 500
        ) {
            setNotify(e.response.data.message)
            console.log(e.response.data)
        }else {
            console.log(e)
        }
        setIsLoading(false)
    }
    //   newAPI
    //       .post(`/login`,{
    //           email: email,
    //           password: password,
    //       })
    //       .then(res=> {
    //           let userInfo = res.data;
    //           const decodeUserInfo = jwt_decode(userInfo)
    //           console.log(userInfo, decodeUserInfo)
    //           setUserInfo(decodeUserInfo);
    //           AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    //           setIsLoading(false)
    //       })
    //       .catch(e => {
    //           if(
    //               e.response &&
    //               e.response.status >=400 &&
    //               e.response.status < 500
    //           ) {
    //               console.log(e.response.data)
    //           }else {
    //               console.log(e)
    //           }
    //           setIsLoading(false)
    //       })
  }

  const logout = async () => {
      setIsLoading(true)
      try {
          await AsyncStorage.removeItem('userInfo')
          setUserInfo({});
          setIsLoading(false)
      }catch (e) {
          console.log(e)
          setIsLoading(false)
      }
  }

  const isLoggedIn = async () => {
      try {
          setSplashLoading(true)

          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);

          if (userInfo){
              setUserInfo(userInfo);
          }

          setSplashLoading(false);
      }catch (e) {
          setSplashLoading(false)
          console.log(`is logged in error`);
      }
  }
  useEffect(() => {
      isLoggedIn();
  },[])

  return(
      <AuthContext.Provider
          value={{
            isLoading,
              notify,
            userInfo,
            splashLoading,
            login,
            register,
            logout
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}