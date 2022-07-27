import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Box, Collapse, Alert, VStack, HStack, IconButton, CloseIcon, AlertDialog, Center, Button } from 'native-base';
import { StyleSheet } from 'react-native-web';

export const AlertHome1 = ({ isShown = false, closeModal }) => {
  const { t } = useTranslation()
  const cancelRef = React.useRef();
  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isShown} onClose={closeModal} motionPreset={'fade'}>
      <AlertDialog.Content>
        <AlertDialog.Header fontSize='lg' fontWeight='bold'>
          {t("applicationHome.error1")}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {t("applicationHome.error2")}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button colorScheme='purple' onPress={() => { if (closeModal) closeModal() }} ml={3}>
            {t("applicationHome.ok")}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  </Center>;
}