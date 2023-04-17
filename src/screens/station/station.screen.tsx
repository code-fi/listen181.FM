import {ImageBackground, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {getAppStore} from '../../store';

export const StationScreen = observer(() => {
  const {
    player: {stationMeta, album},
  } = getAppStore();
  return (
    <ImageBackground
      blurRadius={20}
      style={{flex: 1}}
      source={{
        uri:
          album?.LargeImage ??
          'https://player.181fm.com/configs/images/181fm.png',
      }}
    />
  );
});
