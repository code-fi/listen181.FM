import {pushScreenAsModal } from "../../navigation";
import {STATION_SCREEN_ID} from './station.nav.constants';

export const goToStationScreen = ({
  componentId,
}: {
  componentId: string;
}) =>
  pushScreenAsModal({
    currentComponentId: componentId,
    componentId: STATION_SCREEN_ID,
    name: STATION_SCREEN_ID,
  });
