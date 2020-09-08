import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Input from '../components/Input';
import { connect } from 'react-redux';
import CharacterCard from '../components/CharacterCard';
import RadioButton from '../components/RadioButton';
import ModalChar from '../components/ModalChar';
import {
  getCharactersAction,
  loadMoreCharactersAction,
  updateFilterCharacters,
  radioHandlerCharAction,
  getCharacterAction,
  closeModalAction,
  eraseModalInfo,
} from '../redux/charactersDuck';

function CharactersScreen({
  getCharactersAction,
  loadMoreCharactersAction,
  updateFilterCharacters,
  radioHandlerCharAction,
  getCharacterAction,
  eraseModalInfo,
  closeModalAction,
  characters,
  characterField,
  fetching,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const closeModal = () => {
    setModalVisible(false);
    eraseModalInfo();
  };

  const openModal = (id) => {
    setModalVisible(true);
    getCharacterAction(id);
  };

  return (
    <View style={styles.container}>
      <Input
        blurOnSubmit
        placeholder={
          characterField === 'name'
            ? 'Insert name  of the character to Search'
            : 'Insert Type of the Character to Search'
        }
        onChangeText={updateFilterCharacters}
      />
      <View style={styles.radiosContainer}>
        <Text> Name:</Text>
        <RadioButton
          checked={characterField === 'name' ? true : false}
          onPress={() => radioHandlerCharAction('name')}
        />
        <Text>Type:</Text>
        <RadioButton
          checked={characterField === 'type' ? true : false}
          onPress={() => radioHandlerCharAction('type')}
        />
      </View>
      <ModalChar modalVisible={modalVisible} closeModal={closeModal} />
      <FlatList
        data={characters}
        renderItem={({ item }) =>
          CharacterCard(item.image, item.name, item.id, openModal)
        }
        keyExtractor={(item) => item.id}
        onEndReached={() => loadMoreCharactersAction()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text style={styles.textInfo}> No Data </Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  radiosContainer: {
    flexDirection: 'row',
  },
  textInfo: {
    fontSize: 20,
  },
});

function mapStateToProps(store) {
  return {
    characters: store.characters.characters,
    characterField: store.characters.characterField,
    fetching: store.characters.fetching,
  };
}

export default connect(mapStateToProps, {
  getCharactersAction,
  loadMoreCharactersAction,
  updateFilterCharacters,
  radioHandlerCharAction,
  closeModalAction,
  getCharacterAction,
  eraseModalInfo,
})(CharactersScreen);
