import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import TabNavigation from './TabNavigation';
import SettingsScreen1 from '../screens/SettingsScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import OnboardingScreen3 from '../screens/OnboardingScreen3';
import OnboardingScreen4 from '../screens/OnboardingScreen4';
import TravelHomeScreen from '../screens/TravelHomeScreen';
import ChatBotPage from '../screens/ChatBotPage';

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={TabNavigation} />
      <Stack.Screen options={{ headerShown: false }} name="SettingsScreen1" component={SettingsScreen1} />
      <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen1" component={OnboardingScreen1} />
      <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen2" component={OnboardingScreen2} />
      <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen3" component={OnboardingScreen3} />
      <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen4" component={OnboardingScreen4} />
      <Stack.Screen options={{ headerShown: false }} name="TravelHomeScreen" component={TravelHomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChatBotPage" component={ChatBotPage} />
    </Stack.Navigator>
  );
}

export default MainNavigation