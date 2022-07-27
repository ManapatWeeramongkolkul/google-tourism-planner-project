import { StyleSheet, Text, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Entypo, Box, ScrollView, View, VStack, Heading, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen1 from './OnboardingScreen1';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { AlertHome1 } from '../components/AlertHome1';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from "@env"

const HomeScreen = () => {
  const { t } = useTranslation()
  const navigator = useNavigation()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = useState('')
  async function handleChangeInput(val) {
    try {
      console.log(val)
      setInput(val)
      console.log(`${API_URL}/search/${val}`)
      // const res = await axios.get(`${API_URL}/search/${val}`)
      const res = await axios.get(`https://mytrip.thaigcp.com/search/${val}`) // Hard coded because issue with .env in production environment
      console.log(res.status)
    } catch (error) {
      console.log(error);
      console.log(error.response.status)
      if (error.response.status == 406 || 404) {
        setOpen(true)
      }
    }
  }
  return (
    <View>
      <ScrollView>
        <View style={[styles.container, {
          paddingTop: 75
        }]}>

          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <Text style={{ fontSize: 20, color: "purple" }}>{t("applicationHome.hello")}</Text>
            <Text style={{ paddingRight: 150, fontSize: 40 }}>{t("applicationHome.manapat")}</Text>
          </View>

          <AlertHome1 isShown={open} closeModal={() => { setOpen(false) }} />

          <VStack w="100%" space={5} alignSelf="center">
            <Input onChangeText={(val) => handleChangeInput(val)} value={input} placeholder={t("applicationHome.question")} width="100%" borderRadius="4" py="3" px="1" fontSize="16"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="black" as={<MaterialIcons name="search" />} />} />
          </VStack>

          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <Box paddingLeft='5' >
                  <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='40' h='40' >
                    <ImageBackground
                      source={require('../assets/food.jpg')}
                      style={{ width: '100%', height: '100%' }}
                    >
                    </ImageBackground>
                    <Text style={styles.title}>{t("applicationHome.food")}</Text>
                  </View>
                  <Text style={styles.information1}>{t("applicationHome.food1")}</Text>
                  <Text style={styles.information2}>{t("applicationHome.food2")}</Text>
                </Box>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('OnboardingScreen1')}>
              <View>
                <Box paddingRight='5'>
                  <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='40' h='40'>
                    <ImageBackground
                      source={require('../assets/earth-ocean-64581.jpg')}
                      style={{ width: '100%', height: '100%' }}
                    >
                    </ImageBackground>
                    <Text style={styles.title}>{t("applicationHome.travel")}</Text>
                    <Text style={styles.belowTitle}>{t("applicationHome.softLaunch")}</Text>
                  </View>
                  <Text style={styles.information1}>{t("applicationHome.travel1")}</Text>
                  <Text style={styles.information2}>{t("applicationHome.travel2")}</Text>
                </Box>
              </View>
            </TouchableOpacity>
          </View>

          <View flexDirection="row" justifyContent="space-between" alignItems="flex-start">
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <Box paddingLeft='5' >
                  <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='40' h='40' >
                    <ImageBackground
                      source={require('../assets/grocery.jpg')}
                      style={{ width: '100%', height: '100%' }}
                    >
                    </ImageBackground>
                    <Text style={styles.title}>{t("applicationHome.mart")}</Text>
                    <Text style={styles.belowTitle}>{t("applicationHome.comingSoon")}</Text>
                  </View>
                  <Text style={styles.information1}>{t("applicationHome.mart1")}</Text>
                  <Text style={styles.information2}>{t("applicationHome.mart2")}</Text>
                </Box>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <Box paddingRight='5'>
                  <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderWidth='1' backgroundColor='white' w='40' h='40'>
                    <ImageBackground
                      source={require('../assets/04.jpg')}
                      style={{ width: '100%', height: '100%' }}
                    >
                    </ImageBackground>
                    <Text style={styles.title}>{t("applicationHome.express")}</Text>
                    <Text style={styles.belowTitle}>{t("applicationHome.comingSoon")}</Text>
                  </View>
                  <Text style={styles.information1}>{t("applicationHome.express1")}</Text>
                  <Text style={styles.information2}>{t("applicationHome.express2")}</Text>
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

        </View>
      </ScrollView >
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ad: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: 'center'
  },
  information1: {
    fontSize: 15,
    fontWeight: "bold",
  },
  information2: {
    fontSize: 15,
    color: "grey"
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