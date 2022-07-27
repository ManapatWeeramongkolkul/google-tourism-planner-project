import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Progress, Center, Box, Text, View } from 'native-base';
import OnboardingScreen2 from './OnboardingScreen2';
import { useTranslation } from 'react-i18next';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import OnboardingOptions from '../components/OnboardingOptions';
import axios from 'axios';
import { API_URL } from "@env"
import { AlertOnboarding } from '../components/AlertOnboarding';

const OnboardingScreen1 = () => {
  const { t } = useTranslation()
  const [options, setOption] = useState([{
    id: 1,
    title: t("onboardingScreen1.opt1"),
    image: require('../assets/Onboarding1/waterfall.jpg'),
    isSelected: false,
  }, {
    id: 2,
    title: t("onboardingScreen1.opt2"),
    image: require('../assets/Onboarding1/sea.jpg'),
    isSelected: false,
  },
  {
    id: 3,
    title: t("onboardingScreen1.opt3"),
    image: require('../assets/Onboarding1/mountains.jpeg'),
    isSelected: false,
  },
  {
    id: 4,
    title: t("onboardingScreen1.opt4"),
    image: require('../assets/Onboarding1/dams.jpg'),
    isSelected: false,
  },
  {
    id: 5,
    title: t("onboardingScreen1.opt5"),
    image: require('../assets/Onboarding1/zoos.jpeg'),
    isSelected: false,
  },
  {
    id: 6,
    title: t("onboardingScreen1.opt6"),
    image: require('../assets/Onboarding1/camping.jpeg'),
    isSelected: false,
  },
  {
    id: 7,
    title: t("onboardingScreen1.opt7"),
    image: require('../assets/Onboarding1/museum.jpg'),
    isSelected: false,
  },
  {
    id: 8,
    title: t("onboardingScreen1.opt8"),
    image: require('../assets/Onboarding1/temple.jpg'),
    isSelected: false,
  },
  {
    id: 9,
    title: t("onboardingScreen1.opt9"),
    image: require('../assets/Onboarding1/themepark.jpg'),
    isSelected: false,
  },
  {
    id: 10,
    title: t("onboardingScreen1.opt10"),
    image: require('../assets/Onboarding1/citytour.jpg'),
    isSelected: false,
  },
  {
    id: 11,
    title: t("onboardingScreen1.opt11"),
    image: require('../assets/Onboarding1/snorkelling.jpg'),
    isSelected: false,
  },
  {
    id: 12,
    title: t("onboardingScreen1.opt12"),
    image: require('../assets/Onboarding1/hotspring.jpg'),
    isSelected: false,
  },
  {
    id: 13,
    title: t("onboardingScreen1.opt13"),
    image: require('../assets/Onboarding1/cultural.jpg'),
    isSelected: false,
  },
  {
    id: 14,
    title: t("onboardingScreen1.opt14"),
    image: require('../assets/Onboarding1/ecotourism.jpg'),
    isSelected: false,
  },
  {
    id: 15,
    title: t("onboardingScreen1.opt15"),
    image: require('../assets/Onboarding1/forests.jpg'),
    isSelected: false,
  },
  {
    id: 16,
    title: t("onboardingScreen1.opt16"),
    image: require('../assets/Onboarding1/wellness.jpg'),
    isSelected: false,
  },
  {
    id: 17,
    title: t("onboardingScreen1.opt17"),
    image: require('../assets/Onboarding1/gastronomy.jpg'),
    isSelected: false,
  },
  {
    id: 18,
    title: t("onboardingScreen1.opt18"),
    image: require('../assets/Onboarding1/workcation.jpg'),
    isSelected: false,
  },
  {
    id: 19,
    title: t("onboardingScreen1.opt19"),
    image: require('../assets/Onboarding1/cruise.jpg'),
    isSelected: false,
  },
  {
    id: 20,
    title: t("onboardingScreen1.opt20"),
    image: require('../assets/Onboarding1/local.jpg'),
    isSelected: false,
  },
  {
    id: 21,
    title: t("onboardingScreen1.opt21"),
    image: require('../assets/Onboarding1/adventure.jpeg'),
    isSelected: false,
  },
  {
    id: 22,
    title: t("onboardingScreen1.opt22"),
    image: require('../assets/Onboarding1/performance.jpeg'),
    isSelected: false,
  },
  {
    id: 23,
    title: t("onboardingScreen1.opt23"),
    image: require('../assets/Onboarding1/traveltrain.jpg'),
    isSelected: false,
  },
  {
    id: 24,
    title: t("onboardingScreen1.opt24"),
    image: require('../assets/Onboarding1/travelplane.jpeg'),
    isSelected: false,
  },
  {
    id: 25,
    title: t("onboardingScreen1.opt25"),
    image: require('../assets/Onboarding1/travelbus.jpg'),
    isSelected: false,
  },
  {
    id: 26,
    title: t("onboardingScreen1.opt26"),
    image: require('../assets/Onboarding1/travelcar.jpg'),
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
      // const res = await axios.post(`${API_URL}/page1`,
      const res = await axios.post(`https://mytrip.thaigcp.com/page1`,
        {
          "waterfalls": tempStatus[0],
          "sea": tempStatus[1],
          "mountains": tempStatus[2],
          "dams": tempStatus[3],
          "zoos": tempStatus[4],
          "camping": tempStatus[5],
          "museums": tempStatus[6],
          "temples": tempStatus[7],
          "themeParks": tempStatus[8],
          "cityTours": tempStatus[9],
          "snorkellingAndScubaDiving": tempStatus[10],
          "hotSpringAndOnzen": tempStatus[11],
          "culturalTourism": tempStatus[12],
          "ecotourism": tempStatus[13],
          "forests": tempStatus[14],
          "wellness": tempStatus[15],
          "gastronomy": tempStatus[16],
          "staycationWorkcation": tempStatus[17],
          "cruiseTour": tempStatus[18],
          "localAttractions": tempStatus[19],
          "adventures": tempStatus[20],
          "performanceAndEntertainment": tempStatus[21],
          "travelByTrain": tempStatus[22],
          "travelByPlane": tempStatus[23],
          "travelByBus": tempStatus[24],
          "travelByRentalCar": tempStatus[25]
        }
      )
      console.log(res.status)
      const value = res.status
      console.log(value)
      navigator.navigate('OnboardingScreen2')
    } catch (error) {
      console.log(error);
      if (error.response.status == 406) {
        setOpen(true)
      }
    }
  }

  // axios.post('/user', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

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
        <Entypo name="chevron-left" size={55} color="black" onPress={() => navigator.navigate('HomeScreen')} />
      </View>

      <View style={styles.container}>
        <Text style={styles.question1}>{t("onboardingScreen1.question1")}</Text>
        <Text style={styles.question2}>{t("onboardingScreen1.question2")}</Text>
        <Text style={styles.question3}>{t("onboardingScreen1.question3")}</Text>

        <Text style={styles.question4}>{t("onboardingScreen1.question4")}</Text>
        <Center w="100%">
          <Box w="100%">
            <Progress value={25} mx="0" _filledTrack={{ bg: "#FA4EFE" }} />
          </Box>
        </Center>

        <AlertOnboarding isShown={open} closeModal={() => { setOpen(false) }} />

        <View alignItems='center' paddingTop='2'>
          <FlatList
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
        <Button backgroundColor="#FA4EFE" onPress={() => handleChangeInput(options)}>{t("onboardingScreen1.next")}</Button>
      </View>

    </View >
  );
};

export default OnboardingScreen1;

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
    paddingTop: 20,
    fontSize: 29,
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
  containerButton: {
    flex: 0,
    borderWidth: 2,
    paddingHorizontal: 10
  },
  nextButton: {
    bottom: 0,
    left: 0,
    borderWidth: 1
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