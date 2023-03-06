import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {play, stop} from '../../icons';
import {getAppStore} from '../../store';
import {observer} from 'mobx-react-lite';

export const MiniPlayer: React.FC = observer(() => {
  const {
    player: {album, isPlaying, stationMeta, togglePlayer},
  } = getAppStore();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri:
            album?.Image ?? 'https://player.181fm.com/configs/images/181fm.png',
        }}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.trackName}>
          {stationMeta.song}
        </Text>
        <Text style={styles.artistName}>{stationMeta.artist}</Text>
      </View>
      <Pressable onPress={togglePlayer}>
        <Image style={styles.playStopIcon} source={isPlaying ? stop : play} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  trackName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#363636',
  },
  artistName: {
    color: '#767676',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  playStopIcon: {
    width: 30,
    height: 30,
    tintColor: '#545454',
  },
});
