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
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 48,
    left: 18,
    right: 18,
    borderRadius: 12,
    backgroundColor: 'rgba(249,249,249,0.9)',
    borderColor: '#e6e6e6',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#363636',
    textTransform: 'capitalize',
  },
  artistName: {
    color: '#767676',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  playStopIcon: {
    width: 30,
    height: 30,
    tintColor: '#848484',
  },
});
