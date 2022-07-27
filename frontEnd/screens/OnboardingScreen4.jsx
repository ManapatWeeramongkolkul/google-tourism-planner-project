import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Progress, Center, Box, Text, View, Image, FlatList } from 'native-base';
import { useTranslation } from 'react-i18next';
import { Entypo } from '@expo/vector-icons';
import OnboardingScreen3 from './OnboardingScreen3';
import OnboardingOptions2 from '../components/OnboardingOptions2';
import TravelHomeScreen from './TravelHomeScreen'
import axios from 'axios';
import { API_URL } from "@env"
import { AlertOnboarding } from '../components/AlertOnboarding';

const OnboardingScreen4 = () => {
  const { t } = useTranslation()
  const [options, setOption] = useState([{
    id: 1,
    title: t("onboardingScreen4.opt1"),
    isSelected: false,
  },
  {
    id: 2,
    title: t("onboardingScreen4.opt2"),
    isSelected: false,
  },
  {
    id: 3,
    title: t("onboardingScreen4.opt3"),
    isSelected: false,
  },
  {
    id: 4,
    title: t("onboardingScreen4.opt4"),
    isSelected: false,
  },
  {
    id: 5,
    title: t("onboardingScreen4.opt5"),
    isSelected: false,
  },
  {
    id: 6,
    title: t("onboardingScreen4.opt6"),
    isSelected: false,
  },
  ])
  const navigator = useNavigation()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = useState('')
  async function handleChangeInput(val) {
    try {
      const tempStatus = val.map(({ isSelected }) => isSelected)
      console.log(tempStatus)

      setInput(tempStatus)
      // const res = await axios.post(`${API_URL}/page4`,
      const res = await axios.post(`https://mytrip.thaigcp.com/page4`,
        {
          "lessThan1000": tempStatus[0],
          "within3000": tempStatus[1],
          "within5000": tempStatus[2],
          "within7000": tempStatus[3],
          "within10000": tempStatus[4],
          "above10000": tempStatus[5]
        }
      )
      console.log(res.status)
      const value = res.status
      console.log(value)
      navigator.navigate('TravelHomeScreen')
    } catch (error) {
      console.log(error);
      if (error.response.status == 406) {
        setOpen(true)
      }
    }
  }
  return (
    <View style={[styles.container, {
      paddingTop: 40
    }]}>
      <View backgroundColor="#FA4EFE" borderColor="black"
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Entypo name="chevron-left" size={55} color="black" onPress={() => navigator.navigate('OnboardingScreen3')} />
      </View>

      <AlertOnboarding isShown={open} closeModal={() => { setOpen(false) }} />

      <View style={styles.container}>
        <Text style={styles.question1}>{t("onboardingScreen4.question1")}</Text>
        <Text style={styles.question2}>{t("onboardingScreen4.question2")}</Text>
        <Text style={styles.question3}>{t("onboardingScreen4.question3")}</Text>

        <Text style={styles.question4}>{t("onboardingScreen4.question4")}</Text>
        <Center w="100%">
          <Box w="100%">
            <Progress value={100} mx="0" _filledTrack={{ bg: "#FA4EFE" }} />
          </Box>
        </Center>
        <Center paddingTop='2'>
          <View justifyContent='space-center' borderColor='#000' borderWidth='1' backgroundColor='white' w='80' h='40'>
            <Image
              source={require('../assets/schedule.jpg')}
              style={{ width: '100%', height: '100%' }}
              alt='option for vacation'>
            </Image>
          </View>
        </Center>

        <View alignItems='center' justifyContent='space-between'>
          <FlatList
            data={options}
            renderItem={({ item }) => <OnboardingOptions2 values={item} setOption={setOption} options={options} />}
            keyExtractor={(_, key) => key.toString()}
            contentContainerStyle={{ paddingBottom: 128 }}
            directionalLockEnabled={true}
          />
        </View>

      </View>
      <View style={styles.nextButton}>
        <Button backgroundColor="#FA4EFE" onPress={() => handleChangeInput(options)}>{t("onboardingScreen4.next")}</Button>
      </View>

    </View >
  );
};

export default OnboardingScreen4;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question1: {
    paddingTop: 10,
    fontSize: 15,
  },
  question2: {
    paddingTop: 10,
    fontSize: 21,
    fontWeight: "bold",
  },
  question3: {
    fontSize: 15,
    color: "grey"
  },
  question4: {
    textAlign: "right",
    fontSize: 15,
    color: "grey",
  },
  container: {
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: 10
  },
  nextButton: {
    bottom: 0,
    left: 0,
    borderWidth: 1,
  },
  title:
  {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    position: 'absolute'
  },
  box: {
    backgroundColor: "white"
  },
});