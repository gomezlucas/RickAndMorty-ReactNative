import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'



function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <TitleText style={styles.title}> React Native Challenge </TitleText>
      <TitleText style={styles.subtitle}> LucasD Gomez </TitleText>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require('../assets/rick.png')}
        />
        <View style={styles.endPage}>
        <MainButton onPress={() => navigation.navigate('MainScreen')}> Enter </MainButton>
        <BodyText> 02 / Sep / 2020 </BodyText>
        </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20, 
  },
  subtitle:{
    fontSize: 18,
  },
  endPage:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default WelcomeScreen;
