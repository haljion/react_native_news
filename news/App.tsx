import { FontAwesome } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store/index'
import { HomeScreen } from './screens/HomeScreen'
import { ArticleScreen } from './screens/ArticleScreen'
import { ClipScreen } from './screens/ClipScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// ホームタブ
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

// クリップタブ
const ClipStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Clip" component={ClipScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

// タブバー
const screensOptions = ({ route }: any) => ({
  tabBarIcon: ({ focused, color, size }: any) => {
    if (route.name === 'HomeTab') {
      return <FontAwesome name="home" size={size} color={color} />
    } else if (route.name === 'ClipTab') {
      return <FontAwesome name="bookmark" size={size} color={color} />
    }
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={screensOptions}>
            <Tab.Screen
              name="HomeTab"
              component={HomeStack}
              options={{ headerShown: false, title: 'Home' }}
            />
            <Tab.Screen
              name="ClipTab"
              component={ClipStack}
              options={{ headerShown: false, title: 'Clip' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
