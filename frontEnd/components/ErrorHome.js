import React from 'react';
import { AlertDialog, Button, Center } from 'native-base';
import { useTranslation } from 'react-i18next';

function ErrorHome() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{t("accountScreen.error1")}</AlertDialog.Header>
        <AlertDialog.Body>
          {t("accountScreen.error2")}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button colorScheme="purple" onPress={onClose}>
              {t("accountScreen.ok")}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  </Center>;
}

export default ErrorHome