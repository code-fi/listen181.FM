import {types} from 'mobx-state-tree';
import {Album, defaultMeta, Station, StationMeta} from './models/player';
import SoundPlayer from 'react-native-sound-player';

export const Player = types
  .model({
    isPlaying: types.optional(types.boolean, false),
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
      if (self.isPlaying) {
        SoundPlayer.stop();
      } else {
        self.isPlaying = true;
      }
      SoundPlayer.playUrl(`https://listen.181fm.com/${station.code}`);
    },
    setAlbum(album: Album) {
      self.album = album;
    },
  }))
  .actions(self => ({
    togglePlayer() {
      if (self.isPlaying) {
        self.isPlaying = false;
        SoundPlayer.stop();
      } else if (self.station) {
        self.stopAndPlay(self.station);
      }
    },
  }));
