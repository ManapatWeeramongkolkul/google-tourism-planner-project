import { View, Text, Box, Image } from 'native-base'
import { TouchableOpacity } from 'react-native';
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const OnboardingOptions2 = ({ values, setOption, options }) => {

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
    <View paddingTop='2' alignItems="center" justifyContent='space-center'>
      <TouchableOpacity onPress={configureSelection}>
        <View mx='2' borderWidth="2" borderColor="#FA4EFE" justifyContent='space-betwen'>
          <Box p="2" rounded="xl">
            <View opacity={values.isSelected ? 0.2 : 1.0}>
              <Text fontWeight="bold" fontSize="15" textAlign="center" color="#FA4EFE">{values.title}</Text>
            </View>
          </Box >
        </View >
      </TouchableOpacity >
    </View>
  )
}

export default OnboardingOptions2
