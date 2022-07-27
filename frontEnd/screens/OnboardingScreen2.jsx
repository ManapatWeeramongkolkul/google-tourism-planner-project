import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Progress, Center, Box, Text, View } from 'native-base';
import OnboardingScreen3 from './OnboardingScreen3';
import { useTranslation } from 'react-i18next';
import { Entypo } from '@expo/vector-icons';
import OnboardingOptions from '../components/OnboardingOptions';
import OnboardingScreen1 from './OnboardingScreen1';
import axios from 'axios';
import { API_URL } from "@env"
import { AlertOnboarding } from '../components/AlertOnboarding';

const OnboardingScreen2 = () => {
  const { t } = useTranslation()
  const [options, setOption] = useState([{
    id: 1,
    title: t("onboardingScreen2.opt1"),
    image: require('../assets/Onboarding2/solo.jpg'),
    isSelected: false,
  }, {
    id: 2,
    title: t("onboardingScreen2.opt2"),
    image: require('../assets/Onboarding2/friend.jpg'),
    isSelected: false,
  },
  {
    id: 3,
    title: t("onboardingScreen2.opt3"),
    image: require('../assets/Onboarding2/love.jpeg'),
    isSelected: false,
  },
  {
    id: 4,
    title: t("onboardingScreen2.opt4"),
    image: require('../assets/Onboarding2/pet.jpg'),
    isSelected: false,
  },
  {
    id: 5,
    title: t("onboardingScreen2.opt5"),
    image: require('../assets/Onboarding2/colleague.jpg'),
    isSelected: false,
  },
  {
    id: 6,
    title: t("onboardingScreen2.opt6"),
    image: require('../assets/Onboarding2/family.jpg'),
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
      // const res = await axios.post(`${API_URL}/page2`,
      const res = await axios.post(`https://mytrip.thaigcp.com/page2`,
        {
          "soloTraveler": tempStatus[0],
          "myFriends": tempStatus[1],
          "myLove": tempStatus[2],
          "myLovelyPet": tempStatus[3],
          "myColleagues": tempStatus[4],
          "myFamily": tempStatus[5]
        }
      )
      console.log(res.status)
      const value = res.status
      console.log(value)
      navigator.navigate('OnboardingScreen3')
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
        <Entypo name="chevron-left" size={55} color="black" onPress={() => navigator.navigate('OnboardingScreen1')} />
      </View>

      <AlertOnboarding isShown={open} closeModal={() => { setOpen(false) }} />

      <View style={styles.container}>
        <Text style={styles.question1}>{t("onboardingScreen2.question1")}</Text>
        <Text style={styles.question2}>{t("onboardingScreen2.question2")}</Text>
        <Text style={styles.question3}>{t("onboardingScreen2.question3")}</Text>

        <Text style={styles.question4}>{t("onboardingScreen2.question4")}</Text>
        <Center w="100%">
          <Box w="100%">
            <Progress value={50} mx="0" _filledTrack={{ bg: "#FA4EFE" }} />
          </Box>
        </Center>

        <View alignItems='center' paddingTop='2'>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={options}
            renderItem={({ item }) => <OnboardingOptions values={item} setOption={setOption} options={options} />}
            keyExtractor={(_, key) => key.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 128 }}
            directionalLockEnabled={true}
          />
        </View>
      </View>

      <View style={styles.nextButton}>
        <Button backgroundColor="#FA4EFE" onPress={() => handleChangeInput(options)}>{t("onboardingScreen2.next")}</Button>
      </View>

    </View >
  );
};

export default OnboardingScreen2;


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
    fontSize: 23,
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