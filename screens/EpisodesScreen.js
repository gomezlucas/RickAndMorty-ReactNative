import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import {
  updateFilterEpisodes,
  loadMoreEpisodesAction,
  getEpisodeAction,
  eraseModalInfo
} from '../redux/episodesDuck';
import EpisodeCard from '../components/EpisodeCard';
import ModalEpi from '../components/ModalEpi';

function EpisodesCreen({
  updateFilterEpisodes,
  loadMoreEpisodesAction,
  getEpisodeAction,
  eraseModalInfo,
  episodes,
}) {

  const [modalVisible, setModalVisible] = React.useState(false);


  const openModal = (id) => {
    setModalVisible(true);
    getEpisodeAction(id);
  };

 const closeModal = () => {
    setModalVisible(false);
    eraseModalInfo();
  };

  return (
    <View style={styles.container}>
      <Input
        blurOnSubmit
        placeholder="Insert the name of the Episode"
        onChangeText={updateFilterEpisodes}
      />
            <ModalEpi closeModal={closeModal} modalVisible={modalVisible} />
      <FlatList
        data={episodes}
        renderItem={({ item }) =>
          EpisodeCard(item.name, item.episode , item.id, openModal)
        }
        onEndReached={() => loadMoreEpisodesAction()}
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
});

const mapStateToProps = (store) => {
  return {
    episodes: store.episodes.episodes,
  };
};

export default connect(mapStateToProps, {
  updateFilterEpisodes,
  loadMoreEpisodesAction,
  getEpisodeAction,
  eraseModalInfo
})(EpisodesCreen);
