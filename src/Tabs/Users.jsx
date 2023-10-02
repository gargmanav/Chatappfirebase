import { StyleSheet, Text, View, FlatList, Dimensions, Image ,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const Users = () => {
  const navigation = useNavigation()
  const [user, setuser] = useState([]);
  const [id,setid] = useState(null)
  useEffect(() => {
    getusers();
  }, []);
  
  const getusers = async () => {
     setid(await AsyncStorage.getItem('USERID'))
    let tempdata = []
    const email = await AsyncStorage.getItem('EMAIL');
    // console.log(email);
    firestore()
  .collection('users')
  .where('email', '!=', email)
  .get()
  .then(res => {
    if(res.docs!=[]){
      res.docs.map((item)=>{
        tempdata.push(item.data())
      })
    }
    setuser(tempdata)
  })
  .catch(error => {
    console.error('Firestore Error:', error);
  });
  };

  console.log("user",user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FireChat</Text>
      </View>
      <FlatList
        data={user}
        keyExtractor={item => item.id} // Use the document ID as the key
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.useritem} key={index} onPress={()=>navigation.navigate("Chat",{data:item , id : id})}>
              <Image source={require('../assets/user.png')} style={{width:50,height:50}}/>
              <Text style={{fontSize:18,fontWeight:"600",textAlign:"center",marginLeft:20, color:"#000"}}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '800',
  },
  useritem: {
    width: Dimensions.get('window').width - 50,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf:"center",
    paddingHorizontal:10
  },
});

