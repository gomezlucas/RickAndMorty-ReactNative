import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import CharactersScreen from './screens/CharactersScreen';
import EpisodesScreen from './screens/EpisodesScreen';
import LocationsScreen from './screens/LocationsScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import generateStore from './redux/store';


let store = generateStore();

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'grey',
        inactiveTintColor: 'white',
        labelStyle: { fontSize: 15 },
        tabStyle: {
          justifyContent: 'center',
        },
        showIcon: false,
        style: { backgroundColor: '#FF9800', fontFamily: 'roboto-bold' },
      }}>
      <Tab.Screen name="Characters" component={CharactersScreen} />
      <Tab.Screen name="Episodes" component={EpisodesScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3C3E44',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'roboto',
            },
          }}>
          <Stack.Screen name="Home" component={WelcomeScreen} />
          <Stack.Screen name="MainScreen" component={MyTabs}  />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
