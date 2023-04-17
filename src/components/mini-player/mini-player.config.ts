import { Navigation } from "react-native-navigation";
import {MINI_PLAYER_ID} from './mini-player.constants';

export const presentMiniPlayer = () => {
  Navigation.showOverlay({
    component: {
      id: MINI_PLAYER_ID,
      name: MINI_PLAYER_ID,
      passProps: {
        // text,
        // theme,
        // duration,
        // type,
        // onDismissCallback: this.dismissCallback,
      },
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
        layout: {
          backgroundColor: 'transparent',
          componentBackgroundColor: 'transparent',
        },
      },
    },
  });
};
