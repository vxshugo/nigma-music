import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newAPI from "../Context/base"
import { useToast } from 'react-native-styled-toast'
import axiosInstance from "../Context/base";

export const AuthContext = createContext();

export const AuthProvider = ({children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notify, setNotify] = useState("")
  const [splashLoading, setSplashLoading] = useState(false)

  const register = async (data) => {
    setIsLoading(true);
    try {
        console.log(data)
        const url = BASE_URL + "/users"
        await axiosInstance.post(url,data)
        setNotify("Account created successfully")
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
            setNotify("Something went wrong!")
        }
        setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    setIsLoading(true)
    try {
        const url = "/login"
        const {data} = await axiosInstance.post(url,{email,password});
        setNotify(data.message)
        setToken(data.data)
        await AsyncStorage.setItem("@userToken", JSON.stringify(data.data))
        const decodeData = jwt_decode(data.data);
        setUserInfo(decodeData)
        await AsyncStorage.setItem('userInfo', JSON.stringify({...decodeData, token: data.data }))
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

          let token = await AsyncStorage.getItem("@userToken");
          token = JSON.parse(token)

          if (userInfo){
              setUserInfo(userInfo);
          }

          if (token){
              setToken(token);
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
            logout,
              token
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}