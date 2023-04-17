import {registerComponent} from '../../navigation';
import {StationScreen} from './station.screen';
import {STATION_SCREEN_ID} from './station.nav.constants';

export const registerStationScreen = () => {
  return registerComponent(STATION_SCREEN_ID, StationScreen);
};
