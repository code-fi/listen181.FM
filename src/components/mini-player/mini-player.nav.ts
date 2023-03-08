import {registerComponent} from '../../navigation';
import {MINI_PLAYER_ID} from './mini-player.constants';
import {MiniPlayer} from './mini-player.component';

export const registerMiniPlayer = () =>
  registerComponent(MINI_PLAYER_ID, MiniPlayer, {
    withSafeArea: false,
  });
