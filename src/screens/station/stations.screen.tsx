import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {getAppStore} from '../../store';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

export const StationsScreen: NavigationFunctionComponent<{
  channel: Channel;
}> = observer(({channel}) => {
  const {
    player: {station},
  } = getAppStore();
  const renderItem = useCallback(
    ({item}: {item: Station}) => {
      return (
        <StationCard
          active={station?.code === item.code}
          station={item}
          key={item.code}
        />
      );
    },
    [station?.code],
  );
  return (
    <SafeAreaView edges={['top']} mode="padding" style={{flexGrow: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={channel.stations}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={() => <Header channelName={channel.genre} />}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
});

const StationCard: React.FC<{station: Station; active: boolean}> = ({
  station,
  active,
}) => {
  const {
    player: {setCurrentStation},
  } = getAppStore();
  return (
    <TouchableOpacity
      onPress={() => setCurrentStation(station)}
      activeOpacity={0.8}>
      <View style={styles.channelCard}>
        <Text
          numberOfLines={1}
          style={[
            styles.stationTitle,
            active ? styles.activeStationTitle : {},
          ]}>
          {station.name}
        </Text>
        {station.e_rated ? (
          <View style={styles.expContainer}>
            <Text numberOfLines={1} style={styles.stationCount}>
              E
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
const Separator = () => <View style={styles.separator} />;

const Header: React.FC<{channelName: string}> = ({channelName}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Playing the best</Text>
    <Text style={styles.subheader}>{channelName} radio from 181.fm</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 48,
    paddingHorizontal: 18,
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
    paddingTop: 12,
    flexGrow: 1,
    paddingBottom: 120,
  },
  channelCard: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  stationTitle: {
    color: '#8a8a8a',
    fontWeight: '500',
    flex: 1,
    fontSize: 18,
  },
  activeStationTitle: {
    color: '#4b4b4b',
    fontSize: 20,
  },
  expContainer: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: '#9c2626',
    borderRadius: 3,
  },
  stationCount: {
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 18,
  },
});
