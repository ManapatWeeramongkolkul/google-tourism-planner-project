import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, Progress, Center, Box, Text, View, Image, FlatList, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import TravelHomeScreen from './TravelHomeScreen';
import { useTranslation } from 'react-i18next';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DialogFlowMessenger } from "react-native-dialogflow-messenger";
import axios from 'axios';

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

async function HandleList(param) {
  // console.log("Handle Select Option version 2", param)
  const optionSelect = param.element.eventCustom.parameters.options
  const sessionName = param.element.eventCustom.parameters.sessionName
  const eventCustom = param.element.eventCustom.name
  // console.log("Option selected: ", optionSelect)
  // console.log("Session name: ", sessionName)
  const url = `https://dialogflow.googleapis.com/v3/session=${sessionName}`
  const data = {
    "queryInput": {
      "event": {
        "event": eventCustom
      }
    }
  };
  // try {
  // console.log("Trying to post customEvent")
  const response = await axios.post(url, data);
  // console.log(response)
  // const responseData = response.data.replace(")]}'\n", "");
  // return JSON.parse(responseData) as DialogFlowResponse;
  // } catch (error) {
  //   console.log("entered caught error")
  //   console.log("status ", error.response.status)
  //   console.log("message ", error.response.message)
  // }

  // axios({
  //   method: 'post',
  //   url: `https://dialogflow.googleapis.com/v3/session=${sessionName}`,
  //   data: {
  //     options: optionSelect, // This is the body part
  //   }
  // })
  //   fetch(`https://dialogflow.googleapis.com/v3/session=${sessionName}`), {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       "queryParams": {
  //         "parameters": {
  //           "options": optionSelect
  //         }
  //       }
  //     })
  //   }
}

function Header() {
  const { t } = useTranslation()
  const navigator = useNavigation()
  return <DialogFlowMessenger
    location="us-central1"
    agent="122a4c0b-8f7f-4a06-89dd-f6824940e4d4"
    //Style
    dfMessengerBotMessage="#ffffff"
    dfMessengerUserMessage="#ffffff"
    dfMessengerFontColor="#000000"
    //UI Events 
    dfAccordionClicked={(event) => console.log("Accordion", event)}
    dfButtonClicked={(event) => console.log("Button", event)}
    dfChipClicked={(event) => console.log("Chip", event)}
    dfInfoCardClicked={(event) => console.log("Info Card", event)}
    dfListElementClicked={(event) => HandleList(event)}
    //Dialogflow Events
    dfMessengerError={(event) => console.log("Error", event)}
    dfRequestSent={(event) => console.log("Send", event)}
    dfResponseReceived={(event) => console.log("Response", event)}
    dfUserInputEntered={(event) => console.log("UserInput", event)}
  />

  {/* <View borderColor="black" borderBottomWidth='2'>
    <ImageBackground
      source={require('../assets/TravelHome/newsea.jpg')}
      style={{ width: '100%', height: 120 }}
      resizeMode="cover"
    >
      <View flexDirection="row" justifyContent="left" alignItems="center" paddingLeft={2} paddingTop={5}>
        <Entypo name="chevron-left" size={55} color="black" onPress={() => navigator.navigate('TravelHomeScreen')} />
        <Text style={styles.question}>{t("chatBotScreen.title")}</Text>
      </View>
      <Text style={styles.belowQuestion}>{t("chatBotScreen.desc")}</Text>
    </ImageBackground>
  </View> */}
}

const ChatBotPage = () => {
  const { t } = useTranslation()
  const navigator = useNavigation()
  return <DialogFlowMessenger
    location="us-central1"
    agent="122a4c0b-8f7f-4a06-89dd-f6824940e4d4"
    //Style
    dfMessengerBotMessage="#ffffff"
    dfMessengerUserMessage="#ffffff"
    dfMessengerFontColor="#000000"
    //UI Events 
    dfAccordionClicked={(event) => console.log("Accordion", event)}
    dfButtonClicked={(event) => console.log("Button", event)}
    dfChipClicked={(event) => console.log("Chip", event)}
    dfInfoCardClicked={(event) => console.log("Info Card", event)}
    dfListElementClicked={(event) => HandleList(event)}
    //Dialogflow Events
    dfMessengerError={(event) => console.log("Error", event)}
    dfRequestSent={(event) => console.log("Send", event)}
    dfResponseReceived={(event) => console.log("Response", event)}
    dfUserInputEntered={(event) => console.log("UserInput", event)}
  />
};

export default ChatBotPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingVertical: 50,
  },
});