import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { TouchableOpacity } from 'react-native'
import Users from '../Tabs/Users'
import Settings from '../Tabs/Settings'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesomeIcon';
 const Drawer = createDrawerNavigator()
const Main = () => {
    const [selected, setselected] = useState(0)
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
        {selected === 0 ? <Users/> : <Settings/>}
      <View style={styles.bottomtab}>
        <TouchableOpacity style={styles.tab} onPress={()=>setselected(0)}>
         {/* <FontAwesomeIcon name="users" size={25}/> */}
         <Text style={[styles.textbox,{color: selected === 0 ? "#fff" : "#000"}]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>setselected(1)}>
         {/* <FontAwesomeIcon name="users" size={25}/> */}
         <Text style={[styles.textbox,{color: selected === 1 ? "#fff" : "#000"}]}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    bottomtab:{
    position:"absolute",
    bottom:0,
    width:"100%",
    height:70,
    backgroundColor:"purple",
    flexDirection:"row",
    justifyContent:"space-evenly"
    },
    tab:{
        width:"50%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    textbox:{
        fontWeight:"800",
        fontSize:20,
    }
})