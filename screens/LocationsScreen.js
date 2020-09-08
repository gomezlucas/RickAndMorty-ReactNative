import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RadioButton from '../components/RadioButton';
import Input from '../components/Input';
import LocationCard from '../components/LocationCard';
import ModalLoc from '../components/ModalLoc';
import { connect } from 'react-redux';
import {
  updateFilterLocations,
  loadMoreLocationsAction,
  radioHandlerLocAction,
  eraseModalInfo,
  getLocationAction,
} from '../redux/locationsDuck';

function LocationsScreen({
  locationsField,
  updateFilterLocations,
  loadMoreLocationsAction,
  radioHandlerLocAction,
  getLocationAction,
  locations,
  eraseModalInfo,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const closeModal = () => {
    setModalVisible(false);
    eraseModalInfo();
  };

  const openModal = (id) => {
    setModalVisible(true);
    getLocationAction(id);
  };

  return (
    <View style={styles.container}>
      <Input
        blurOnSubmit
        placeholder={
          locationsField === 'name'
            ? 'Insert name  of the character to Search'
            : 'Insert Type of the Character to Search'
        }
        onChangeText={updateFilterLocations}
      />
      <View style={styles.radiosContainer}>
        <Text> Name:</Text>
        <RadioButton
          checked={locationsField === 'name' ? true : false}
          onPress={() => radioHandlerLocAction('name')}
        />
        <Text>Type:</Text>
        <RadioButton
          checked={locationsField === 'type' ? true : false}
          onPress={() => radioHandlerLocAction('type')}
        />
      </View>
      <ModalLoc closeModal={closeModal} modalVisible={modalVisible} />
      <FlatList
        data={locations}
        renderItem={({ item }) =>
          LocationCard(item.name, item.type, item.id, openModal)
        }
        onEndReached={() => loadMoreLocationsAction()}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
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
});

const mapStateToProps = (store) => {
  return {
    locationsField: store.locations.locationsField,
    locations: store.locations.locations,
  };
};

export default connect(mapStateToProps, {
  updateFilterLocations,
  loadMoreLocationsAction,
  radioHandlerLocAction,
  eraseModalInfo,
  getLocationAction,
})(LocationsScreen);
