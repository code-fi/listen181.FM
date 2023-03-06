import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {getAppStore} from '../../store';
import {observer} from 'mobx-react-lite';

const {width} = Dimensions.get('window');
const NUMBER_OF_COLUMNS = 3;
const CARD_GAP = 12;
const CONTAINER_PADDING = 18;
const CARD_WIDTH =
  (width - CONTAINER_PADDING * 2 - CARD_GAP * (NUMBER_OF_COLUMNS - 1)) /
  NUMBER_OF_COLUMNS;
export const StationsScreen: NavigationFunctionComponent<{
  channel: Channel;
}> = observer(({channel}) => {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      numColumns={NUMBER_OF_COLUMNS}
      data={channel.stations}
      ItemSeparatorComponent={Separator}
      renderItem={({item, index}) => (
        <ChannelCard index={index} station={item} key={item.code} />
      )}
    />
  );
});

const ChannelCard: React.FC<{station: Station; index: number}> = ({
  station,
  index,
}) => {
  const isLastOnColumn = (index + 1) % NUMBER_OF_COLUMNS !== 0;
  const {
    player: {setCurrentStation},
  } = getAppStore();
  return (
    <TouchableOpacity
      onPress={() => setCurrentStation(station)}
      activeOpacity={0.8}>
      <View style={[styles.channelCard, isLastOnColumn && styles.lastCard]}>
        <Text numberOfLines={2} style={styles.channelTitle}>
          {station.name}
        </Text>
        <Text numberOfLines={1} style={styles.stationCount}>
          {station.e_rated ? 'explicit' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: CONTAINER_PADDING * 2,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b4b4b',
  },
  subheader: {
    fontSize: 18,
    color: '#6f6f6f',
  },
  listContainer: {
    padding: CONTAINER_PADDING,
    flexGrow: 1,
  },
  channelCard: {
    width: CARD_WIDTH,
    height: 100,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  channelTitle: {
    color: '#353535',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stationCount: {
    color: '#6b6b6b',
    textAlign: 'center',
    marginTop: 2,
  },
  lastCard: {
    marginRight: CARD_GAP,
  },
  separator: {
    height: CARD_GAP,
  },
});
