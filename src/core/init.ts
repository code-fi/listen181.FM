import {bootNavigation} from '../navigation/navigation.config';
import {initAppStore} from '../store';
import SoundPlayer from 'react-native-sound-player';
import {noop} from '../utils/xtra';

export const bootApp = () => {
  SoundPlayer.setMixAudio(false);
  SoundPlayer.addEventListener('FinishedLoadingURL', noop);
  initAppStore();
  bootNavigation();
};
