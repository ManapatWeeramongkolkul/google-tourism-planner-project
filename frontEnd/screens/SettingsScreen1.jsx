import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Switch, Button, AlertDialog, Center, Column, Image, Menu, Divider, Pressable, HamburgerIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import Flag from 'react-native-flags';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, useLanguage } from '../hooks/useLanguage';
import i18n from "../internationalization/i18n"

function AlertDialogComponent() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} motionPreset={'fade'}>
      <AlertDialog.Content>
        <AlertDialog.Header fontSize='lg' fontWeight='bold'>
          {t("settingsScreen.error1")}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {t("settingsScreen.error2")}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button colorScheme='purple' onPress={onClose} ml={3}>
            {t("settingsScreen.ok")}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
    <Switch size="md" offTrackColor="black" onTrackColor="purple.500" onToggle={() => setIsOpen(!isOpen)} />
  </Center>;
}

function ChangeLangaugeComponent() {

  const { language, changeLanguage } = useLanguage();

  return <Menu trigger={triggerProps => {
    return <Pressable accessibilityLabel="Language menu" {...triggerProps} placement="botttom">
      <Text style={styles.language}>{language === LANGUAGES.ENGLISH ? "English" : "ไทย"}</Text>
    </Pressable>;
  }}>
    <Menu.Item style={styles.normal} onPress={() => { changeLanguage(LANGUAGES.ENGLISH) }}>English</Menu.Item>
    <Menu.Item style={styles.normal} onPress={() => { changeLanguage(LANGUAGES.THAI) }}>ภาษาไทย</Menu.Item>
  </Menu>;
}

const selectedLanguage = {
  language: "English",
  English: true,
  Thai: false,
}

const SettingsScreen1 = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const navigator = useNavigation()
  return (
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
        <View style={{
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center"
        }}>
          <Entypo name="chevron-left" size={50} color="black" onPress={() => navigator.navigate('HomeScreen')} />
          <Text style={styles.title}>{t("settingsScreen.settings")}</Text>
        </View>
      </View>

      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Text style={styles.normal}>{t("settingsScreen.1")}</Text>
        <AlertDialogComponent />
      </View>

      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Text style={styles.normal}>{t("settingsScreen.2")}</Text>
        <AlertDialogComponent />
      </View>

      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Text style={styles.normal}>{t("settingsScreen.3")}</Text>
        <AlertDialogComponent />
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Text style={styles.normal}>{t("settingsScreen.lang")}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center"
          }}>
          <Flag
            code={i18n.language === LANGUAGES.ENGLISH ? "US" : "TH"}
            size={48}
          />
          <ChangeLangaugeComponent />
        </View>
      </View>

      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Text style={styles.normal}>{t("settingsScreen.ver")}</Text>
        <Text style={styles.version}>x.x.x(xxxx)</Text>
      </View>
    </View>
  );
};

export default SettingsScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingVertical: 50,
  },
  title:
  {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  box: {
    backgroundColor: "white"
  },
  normal: {
    fontSize: 15,
    fontWeight: "bold"
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