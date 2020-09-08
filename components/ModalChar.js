import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import TitleText from './TitleText';
import BodyText from './BodyText';
import MainButton from './MainButton';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';


function ModalChar(props) {
    const {currentCharacter} = props
  const {image} = props.currentCharacter
   return (
    <View style={styles.container}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <Image
            style={{ width: '100%', height: 300, resizeMode: 'stretch' }}
            source={{
              uri: image
            }} />
          <TitleText style={styles.title}> {currentCharacter.name} </TitleText>
          <Text style={styles.text}> Type {currentCharacter.type? currentCharacter.type: 'No type info' }</Text>
          <Text style={styles.text}> Gender {currentCharacter.gender}</Text>
          <Text style={styles.text}> Species {currentCharacter.species}</Text>

          <MainButton onPress={() => props.closeModal()}> Close Modal </MainButton>

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
  title:{
    color: '#fff',
    marginVertical: 10, 
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  }
  
});

function mapStateToProps(store) {
   return {
    currentCharacter: store.characters.currentCharacter
   };
}

export default connect(mapStateToProps)(ModalChar);