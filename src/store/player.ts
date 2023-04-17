import {types} from 'mobx-state-tree';
import {Album, defaultMeta, Station, StationMeta} from './models/player';
import TrackPlayer from 'react-native-track-player';

export const Player = types
  .model({
    isPlaying: types.optional(types.boolean, false),
    isPaused: types.optional(types.boolean, false),
    album: types.maybeNull(Album),
    stationMeta: types.optional(StationMeta, defaultMeta),
    station: types.maybeNull(Station),
  })
  .actions(self => ({
    setCurrentStation(station: Station) {
      self.station = station;
    },
    setStationMeta(meta: StationMeta) {
      self.stationMeta = meta;
    },
    stopAndPlay(station: Station) {
      if (station.code !== self.station?.code){
        if (self.isPlaying) {
          TrackPlayer.reset();
        } else {
          self.isPlaying = true;
        }
        play(station);
      }
    },
    refreshAlbum(album = self.album) {
      TrackPlayer.updateNowPlayingMetadata({
        title: self.stationMeta.song,
        artist: self.stationMeta.artist,
        artwork:
          album?.LargeImage ??
          'https://player.181fm.com/configs/images/181fm.png',
      });
    },
  }))
  .actions(self => ({
    setAlbum(album: Album) {
      self.album = album;
      self.refreshAlbum(album);
    },
  }))
  .actions(self => ({
    togglePlayer(isRemote = false) {
      if (self.isPlaying) {
        self.isPlaying = false;
        if (isRemote) {
          TrackPlayer.pause();
          self.isPaused = true;
        } else {
          TrackPlayer.reset();
        }
      } else {
        if (self.station) {
          self.isPlaying = true;
          if (isRemote || self.isPaused) {
            TrackPlayer.reset();
            self.isPaused = false;
          }
          play(self.station);
          self.refreshAlbum();
        }
      }
    },
  }));

const play = (station: Station) => {
  TrackPlayer.add({
    url: `https://listen.181fm.com/181-${station.code}_128k.mp3`,
    isLiveStream: true,
    genre: station.name,
  }).then(() => TrackPlayer.play());
};
