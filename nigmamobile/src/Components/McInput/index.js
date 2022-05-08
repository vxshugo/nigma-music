import React from "react";
import {TextInput} from "react-native";
import PropTypes from 'prop-types';
import styled from "styled-components/native";


const McInput = ({ text,width, size, data, onChange, ...rest}) => {
    return <TextInputs placeholder={text} size={size} value={data} onChangeText={onChange} {...rest}/>
}
McInput.propTypes = {
    size: PropTypes.number,
}
McInput.defaultProps = {
    size: 0,
}

const TextInputs = styled.TextInput`
  width: ${props => props.width || 100}%;
  height: 52px;
  border: 2px solid black;
  background-color: white;
  padding-left: 14px;
  padding-right: 14px;
  margin-bottom: ${props => props.size || 0}px;
`

export default McInput