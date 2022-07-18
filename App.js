import React from 'react';
import { useEffect } from 'react';
import Store from './source/config/Store';
import { StyleSheet, Text, SafeAreaView, Image, StatusBar, View } from 'react-native';
import Buttons from './source/component/buttons/Buttons';
import Wish from './source/component/wish/Wish';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './source/store/BirthdaySlice';
import Timer from './source/component/timer/Timer';
import { useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

const App = () => {
  const [birthdayImage, setbirthdayImage] = useState(false)

  const Dispatch = useDispatch()

  useEffect(() => {

    Dispatch(fetchData())

  }, [])
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#4895ef" />
      <View >
      </View>
      <View style={styles.logo}>
      </View>
      <Wish />
      {
        birthdayImage ?
          <>
            <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />

            <Image
              style={styles.Image}
              source={require('../BirthdayApp/source/assets/cake.png')}
            />
          </> :
          <Image
            style={styles.Image}
            source={require('../BirthdayApp/source/assets/Gigt.png')}
          />
      }


      <Timer finish={setbirthdayImage} />
      <Buttons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4895ef',
    padding: 50
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25
  },
  Image: {
    height: 280,
    width: 350,
    alignSelf: 'center',
    marginTop: 40
  }

});

export default App;