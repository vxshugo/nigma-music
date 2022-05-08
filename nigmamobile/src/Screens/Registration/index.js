import React, {useContext, useState} from "react";
import {Text, View, StatusBar, TouchableOpacity, Picker, TextInput} from 'react-native'
import Entypo from "react-native-vector-icons/Entypo";
import {Colors} from "../../Constants";
import {McInput, McText} from "../../Components";
import styled from "styled-components/native";
import {AuthContext} from "../../Context/Authcontext";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const genders = ["male", "female", "non-binary"];

const Register = ({navigation}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [month, setMonth] = useState("month")
    const [date, setDate] = useState(null)
    const [year, setYear] = useState(null)
    const [gender, setGender] = useState(null)


    const radio_props = [
        {label: 'male', value: 'male' },
        {label: 'female', value: 'female' },
        {label: 'non-binary', value: 'non-binary' }
    ]

    const months = [
        { name: "January", value: "01" },
        { name: "February", value: "02" },
        { name: "March", value: "03" },
        { name: "Apirl", value: "04" },
        { name: "May", value: "05" },
        { name: "June", value: "06" },
        { name: "July", value: "07" },
        { name: "Augest", value: "08" },
        { name: "September", value: "09" },
        { name: "October", value: "10" },
        { name: "November", value: "11" },
        { name: "December", value: "12" },
    ];

    return (
        <Container>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 40,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack('OnBoarding')}>
                    <Entypo
                        name="chevron-left"
                        style={{
                            fontSize: 18,
                            color: Colors.white,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <McText color={Colors.grey4} size={36} bold style={{
                marginBottom: 30,
                marginTop: 30
            }}>
                Register
            </McText>
            <InputContainer>
                <McInput
                    text="jane@example.com"
                    size={30}
                    value={email}
                    onChange={text => setEmail(text)}
                />
                <McInput
                    text="••••••••••••"
                    size={16}
                    secureTextEntry
                    value={password}
                    onChange={text => setPassword(text)}
                />
            </InputContainer>
            <View style={{flexDirection: 'row', marginBottom: 12}}>
                <DateContainer>
                    <Picker
                        selectedValue={month}
                        style={{ height: 52, width: 112}}
                        onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
                    >
                        {months.map((item) => (
                            <Picker.Item label={item.name} value={item.value} />
                        ))}
                    </Picker>
                </DateContainer>
                <View style={{width:74, height: 52, marginRight: 23, border: '1px solid black'}}>
                    <TextInput
                        placeholder="Date"
                        style={{width: 74, height: 52, backgroundColor: 'white', paddingLeft: 10, color: '#000'}}
                        value={date}
                        onChangeText={(value) => setDate(value)}
                    />
                </View>
                <View style={{height: 52}}>
                    <TextInput
                        placeholder="Year"
                        style={{width: 82, height: 52, backgroundColor: 'white', paddingLeft: 10, color: '#000'}}
                        value={year}
                        onChangeText={(value) => setYear(value)}
                    />
                </View>
            </View>
            <View style={{color: "white", marginBottom: 12}}>
                <Text style={{color: "white", marginBottom: 5}}>What's your gender?</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    onPress={value => setGender(value)}
                    labelStyle={{fontSize: 13, color: '#fff',marginRight: 20}}
                />
            </View>
            <LoginButton onPress={() => navigation.navigate('RegisterLast',{email: email, password: password, gender: gender, month: month, date: date, year: year})}>
                <McText size={13} color={Colors.grey5} black>
                    NEXT
                </McText>
            </LoginButton>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={{color: Colors.grey4}}>
                    By signing up, you agree to Nigma’s Terms of Service and
                    Privacy Policy.
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={{color: Colors.grey3}}>Do you have account? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                    <Text style={{color: "white"}}>Register</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: flex-start;
  padding: 16px;
`
const InputContainer = styled.View`
  align-items: center;
`
const DateContainer = styled.View`
  background-color: white;
  border: 1px solid black;
  width: 112px;
  height: 52px;
  padding-left: 5px;
  padding-right: 60px;
  margin-right: 35px;
`
const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: ${Colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`
export default Register;