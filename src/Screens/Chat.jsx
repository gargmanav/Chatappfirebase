import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log('route', route);
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userid)
      .collection('messages')
      .orderBy("createdAt","desc");
      subscriber.onSnapshot(querysnapshot=>{
        const allmessages= querysnapshot.docs.map(item=>{
            return {...item._data,createdAt:item._data.createdAt}
        })
        setMessages(allmessages)
      })
      return ()=>subscriber
  }, []);
 console.log("messages",messages);
  const onSend = useCallback(async(messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userid,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc(''+ route.params.id + route.params.data.userid)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userid + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route?.params?.id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
