import {Instance, onAction, types} from 'mobx-state-tree';
import {Player} from './player';
import {fetchAlbum, fetchStationMeta} from '../services/http';

const RootStore = types
  .model('com.listen181.root-store', {
    player: types.optional(Player, {}),
  })
  .actions(self => {
    let metaFetcherInterval = 0;

    return {
      afterCreate() {
        const fetchMeta = (station: Station) => {
          fetchStationMeta({
            station: station.code,
            successCallback: data => {
              if (data.song !== self.player.stationMeta.song) {
                self.player.setStationMeta(data);
              }
            },
          });
        };
        onAction(self, ({name, args}) => {
          if (name === 'setCurrentStation') {
            const station: Station = args?.[0];
            clearInterval(metaFetcherInterval);
            fetchMeta(station);
            self.player.stopAndPlay(station);
            metaFetcherInterval = setInterval(() => {
              fetchMeta(station);
            }, 22000);
          } else if (name === 'setStationMeta') {
            const stationMeta: StationMeta = args?.[0];
            fetchAlbum({
              song: stationMeta.song,
              successCallback: self.player.setAlbum,
            });
          }
        });
      },
      beforeDestroy() {
        clearInterval(metaFetcherInterval);
      },
    };
  });

export type RootStoreType = Instance<typeof RootStore>;
export const createRootStore = () => RootStore.create();
