import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SettingsScreen1 from './SettingsScreen1';
import { AlertDialog, Center, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

function AlertDialogComponent() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} motionPreset={'fade'}>
      <AlertDialog.Content>
        <AlertDialog.Header fontSize='lg' fontWeight='bold'>
          {t("accountScreen.error1")}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {t("accountScreen.error2")}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button colorScheme='purple' onPress={onClose} ml={3}>
            {t("accountScreen.ok")}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
    <Entypo name="chevron-right" size={24} color="black" onPress={() => setIsOpen(!isOpen)} />
  </Center>;
}

const AccountScreen = () => {
  const { t } = useTranslation()
  const navigator = useNavigation()
  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <Text style={styles.title}>{t("accountScreen.account")}</Text>

      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <MaterialCommunityIcons name="account-circle" size={100} color="purple" />
        <Text style={styles.normal}>{t("accountScreen.name")}</Text>
        <AlertDialogComponent />
      </View>

      {/* onPress={() => ShowAlert()} */}

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
          <Entypo name="location-pin" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.address")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <FontAwesome name="credit-card" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.payment")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <Ionicons name="umbrella-outline" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.privacy")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <Entypo name="book" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.tc")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <FontAwesome name="volume-control-phone" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.contact")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <Ionicons name="ios-settings-outline" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.set")}</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" onPress={() => navigator.navigate('SettingsScreen1')} />
      </View>

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
          <FontAwesome name="trash-o" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.delete")}</Text>
        </View>
        <AlertDialogComponent />
      </View>

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
          <Entypo name="log-out" size={50} color="black" />
          <Text style={styles.normal}>{t("accountScreen.logout")}</Text>
        </View>
        <AlertDialogComponent />
      </View>
    </View >
  );
};

export default AccountScreen;

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
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold"
  }
});