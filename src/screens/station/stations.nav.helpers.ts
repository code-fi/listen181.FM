import {pushScreen} from '../../navigation';
import {STATIONS_SCREEN_ID} from './stations.nav.constants';

export const goToStationsScreen = ({
  channel,
  componentId,
}: {
  componentId: string;
  channel: Channel;
}) =>
  pushScreen({
    currentComponentId: componentId,
    componentId: STATIONS_SCREEN_ID,
    name: STATIONS_SCREEN_ID,
    passProps: {
      channel,
    },
  });
