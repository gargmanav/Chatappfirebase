import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CallModal = () => {
  return (
    <TouchableOpacity style={{paddingVertical:20,width:"100%",borderRadius:20,backgroundColor:"yellow",zIndex:999,marginTop:-50}}>
        <Text>Close the modal</Text>
    </TouchableOpacity>
  )
}

export default CallModal

const styles = StyleSheet.create({})