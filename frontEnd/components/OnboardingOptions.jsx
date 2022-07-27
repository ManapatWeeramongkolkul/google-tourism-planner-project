import { View, Text, Box, Image } from 'native-base'
import { TouchableOpacity } from 'react-native';
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const OnboardingOptions = ({ values, setOption, options }) => {

  function configureSelection() {
    const prevIsSelected = values.isSelected;
    const id = values.id;
    const newOptions = [...options]
    newOptions.forEach(each => {
      if (each.id === id) {
        each.isSelected = !each.isSelected
      }
    })
    setOption(newOptions)
  }

  return (
    <TouchableOpacity onPress={configureSelection}>
      <View mx='2' paddingTop="2">

        <Box borderWidth="1">
          <View w='full' h='full' position='absolute' zIndex='50' top='70' left='60' opacity={values.isSelected ? 1 : 0}>
            <AntDesign name="heart" size={50} color="#FA4EFE" />
          </View>
          <View display="flex" alignItems='center' justifyContent='center' borderColor='#000' borderBottomWidth='1' backgroundColor='white' w='40' h='40' opacity={values.isSelected ? 0.2 : 1.0}>
            <Image
              resizeMode="cover"
              source={values.image}
              style={{ width: '100%', height: '100%' }}
              alt='option for vacation'
              zIndex='-50'
            />
          </View>
          <Text fontSize="15" textAlign="center">{values.title}</Text>
        </Box >
      </View >
    </TouchableOpacity>
  )
}

export default OnboardingOptions
