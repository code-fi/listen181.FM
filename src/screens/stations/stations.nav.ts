import {registerComponent} from '../../navigation';
import {StationsScreen} from './stations.screen';
import {STATIONS_SCREEN_ID} from './stations.nav.constants';

export const registerStationsScreen = () => {
  return registerComponent(STATIONS_SCREEN_ID, StationsScreen);
};
