import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {channels} from '../../data';
import {goToStationsScreen} from '../station/stations.nav.helpers';
import {NavigationFunctionComponent} from 'react-native-navigation';

const {width} = Dimensions.get('window');
const NUMBER_OF_COLUMNS = 3;
const CARD_GAP = 12;
const CONTAINER_PADDING = 18;
const CARD_WIDTH =
  (width - CONTAINER_PADDING * 2 - CARD_GAP * (NUMBER_OF_COLUMNS - 1)) /
  NUMBER_OF_COLUMNS;
export const ChannelsScreen: NavigationFunctionComponent = ({componentId}) => {
  return (
    <FlatList
      ListHeaderComponent={Header}
      contentContainerStyle={styles.listContainer}
      numColumns={NUMBER_OF_COLUMNS}
      data={channels}
      ItemSeparatorComponent={Separator}
      renderItem={({item, index}) => (
        <ChannelCard
          componentId={componentId}
          index={index}
          channel={item}
          key={item.genre}
        />
      )}
    />
  );
};

const ChannelCard: NavigationFunctionComponent<{
  channel: Channel;
  index: number;
}> = ({channel, index, componentId}) => {
  const isLastOnColumn = (index + 1) % NUMBER_OF_COLUMNS !== 0;
  const onPress = () => goToStationsScreen({channel, componentId});
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.channelCard, isLastOnColumn && styles.lastCard]}>
        <Text numberOfLines={2} style={styles.channelTitle}>
          {channel.genre}
        </Text>
        <Text numberOfLines={1} style={styles.stationCount}>
          {channel.stations.length} stations
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Separator = () => <View style={styles.separator} />;
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Welcome back!</Text>
    <Text style={styles.subheader}>Internet radio from 181.fm</Text>
  </View>
);

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
