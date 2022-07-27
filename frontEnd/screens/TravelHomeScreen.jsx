import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, Progress, Center, Box, Text, View, Image, FlatList, ScrollView, VStack, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ChatBotPage from './ChatBotPage';
import { useTranslation } from 'react-i18next';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import { AlertHome2 } from '../components/AlertHome2';
import axios from 'axios';
import { API_URL } from "@env"

const TravelHomeScreen = () => {
  const { t } = useTranslation()
  const navigator = useNavigation()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = useState('')
  async function handleChangeInput(val) {
    try {
      // console.log(val)
      setInput(val)
      // const res = await axios.get(`${API_URL}/travel/search/${val}`)
      const res = await axios.get(`https://mytrip.thaigcp.com/travel/search/${val}`)
      // console.log(res.status)
      const value = res.status
      // console.log(value)
    } catch (error) {
      // console.log(error);
      if (error.response.status == 406 || 404) {
        setOpen(true)
      }
    }
  }
  return (
    <View style={[styles.container, {
      paddingTop: 40
    }]}>
      <View borderColor="black" borderBottomWidth='2'>
        <ImageBackground
          source={require('../assets/TravelHome/newsea.jpg')}
          style={{ width: '100%', height: 140 }}
          resizeMode="cover"
        >
          <Entypo name="chevron-left" size={55} color="black" onPress={() => navigator.navigate('HomeScreen')} />

          <VStack w="100%" space={5} alignSelf="center">
            <Input onChangeText={(val) => handleChangeInput(val)} value={input} placeholder={t("travelHomeScreen.question")} placeholderTextColor="black" width="100%" borderWidth='1' borderColor='black' borderRadius="4" py="3" px="1" fontSize="16"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="black" as={<MaterialIcons name="search" />} />} />
          </VStack>
          {/* <MaterialIcons name="search" size={24} color="black" />
        <Text style={styles.question}>{t("travelHomeScreen.question")}</Text> */}
          <Text style={styles.belowQuestion}>{t("travelHomeScreen.belowQuestion")}</Text>
        </ImageBackground>
      </View>
      <AlertHome2 isShown={open} closeModal={() => { setOpen(false) }} />

      <ScrollView>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24' >
                  <Image
                    source={require('../assets/TravelHome/hotel.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.accomodation1")}
                  >
                  </Image>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.accomodation1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.accomodation2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24'>
                  <ImageBackground
                    source={require('../assets/TravelHome/insurance.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.insurance1")}
                  >
                  </ImageBackground>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.insurance1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.insurance2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24'>
                  <ImageBackground
                    source={require('../assets/TravelHome/tourticket.jpeg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.tour1")}
                  >
                  </ImageBackground>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.tour1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.tour2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24' >
                  <Image
                    source={require('../assets/TravelHome/car.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.car1")}
                  >
                  </Image>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.car1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.car2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24'>
                  <ImageBackground
                    source={require('../assets/TravelHome/flight.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.flight1")}
                  >
                  </ImageBackground>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.flight1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.flight2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigator.navigate('ChatBotPage')}>
            <View>
              <Box>
                <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='24' h='24'>
                  <ImageBackground
                    source={require('../assets/TravelHome/chatbot.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    alt={t("travelHomeScreen.chat1")}
                  >
                  </ImageBackground>
                </View>
                <Text style={styles.information1}>{t("travelHomeScreen.chat1")}</Text>
                <Text style={styles.information2}>{t("travelHomeScreen.chat2")}</Text>
              </Box>
            </View>
          </TouchableOpacity>
        </View>

        <Box paddingTop='5' paddingLeft='5'>
          <View justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='330' h='40'>
            <Text style={styles.ad}>{t("applicationHome.ad")}</Text>
          </View>
        </Box>

        <Box paddingTop='5' paddingLeft='5'>
          <View justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='330' h='40'>
            <Text style={styles.ad}>{t("applicationHome.ad")}</Text>
          </View>
        </Box>

        <Box paddingTop='5' paddingLeft='5'>
          <View justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='330' h='40'>
            <Text style={styles.ad}>{t("applicationHome.ad")}</Text>
          </View>
        </Box>

      </ScrollView>
    </View >
  );
};


export default TravelHomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ad: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: 'center'
  },
  information1: {
    lineHeight: 15,
    fontSize: 10,
    fontWeight: "bold",
  },
  information2: {
    lineHeight: 10,
    fontSize: 10,
    color: "grey"
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textDecorationLine: "underline"
  },
  belowQuestion: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    textDecorationStyle: "underline",
    // borderWidth: 2,
    // borderColor: "black"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingVertical: 50,
  },
  title:
  {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    position: 'absolute'
  },
  belowTitle: {
    paddingTop: 40,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    position: 'absolute'
  },
  box: {
    backgroundColor: "white"
  },
  normal: {
    fontSize: 15,
    fontWeight: "bold"
  },
  normalPurple: {
    fontSize: 15,
    fontWeight: "bold",
    color: "purple"
  },
  version: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey"
  },
  language: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "purple"
  }
});