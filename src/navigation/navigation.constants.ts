import {OptionsAnimationPropertyConfig} from 'react-native-navigation';

export const SHOW_MODAL_ANIMATION_CONFIG: OptionsAnimationPropertyConfig = {
  from: 0,
  to: 1,
  duration: 200,
  interpolation: {type: 'accelerate'},
};

export const DEFAULT_OVERLAY_NAME = 'com.arbta.default-overlay';
