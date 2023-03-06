import {Options} from 'react-native-navigation';
import {PropsWithChildren} from 'react';
import {FlexStyle} from 'react-native';

export interface RegisterComponentOptions {
  withSafeArea?: boolean;
  withMiniPlayer?: boolean;
}

export interface PushScreenParams {
  currentComponentId: string;
  componentId: string;
  name: string;
  passProps?: Record<string, any>;
  withBottomTabs?: boolean;
  options?: Options;
}

export interface OverlayProps extends PropsWithChildren {
  overlayId: string;
  canDismiss?: boolean;
  onDismiss?: () => void;
  onDisappear?: () => void;
  overlayAccessibilityLabel?: string;
  overlayColor?: string;
  justifyContent?: FlexStyle['justifyContent'];
}
