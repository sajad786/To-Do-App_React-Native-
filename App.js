import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Home from './src/screens/Home/Home'


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <View style={{flex:1}}>
      <Home/>
    </View>
  )
}

export default App
