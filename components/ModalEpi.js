import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import TitleText from './TitleText';
import BodyText from './BodyText';
import MainButton from './MainButton';
import { connect } from 'react-redux';

function ModalEpi(props) {
  const { currentEpisode, closeModal, modalVisible } = props;
  const array = currentEpisode.characters
    ? currentEpisode.characters.slice(0, 5)
    : '';

  const showArray = () => {
    return (
      <ScrollView>
        {array.map((item, index) => {
          return (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <BodyText style={styles.text}> {item.name}</BodyText>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
        }}>
        <View style={styles.modal}>
          <TitleText style={styles.title}> {currentEpisode.name} </TitleText>
          <Text style={styles.text}> {currentEpisode.air_date}</Text>
          <Text style={styles.text}>{currentEpisode.episode} </Text>
          {array ? showArray() : null}
          <MainButton onPress={closeModal}> Close Modal </MainButton>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3C3E44',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: '#fff',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

function mapStateToProps(store) {
  return {
    currentEpisode: store.episodes.currentEpisode,
  };
}

export default connect(mapStateToProps)(ModalEpi);
