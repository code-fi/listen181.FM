import {registerComponent} from '../../navigation';
import {ChannelsScreen} from './channels.screen';

export const registerChannelsScreen = () => {
  return registerComponent('com.listen181.channels-screen', ChannelsScreen, {
    withMiniPlayer: true,
  });
};
