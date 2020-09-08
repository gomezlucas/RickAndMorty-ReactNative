import * as React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import TitleText from './TitleText';

function CharacterCard(image, name, id, openModal) {
  return (
    <TouchableOpacity
      onPress={() => {
        openModal(id);
      }}
      activeOpacity={0.6}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <TitleText style={styles.text}> {name} </TitleText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 18,
  },
});

export default CharacterCard;
