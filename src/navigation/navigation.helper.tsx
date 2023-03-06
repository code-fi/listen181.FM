import React from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';
// import {ThemeProvider} from '@shopify/restyle';
// import theme from '@theme/index';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  OverlayProps,
  PushScreenParams,
  RegisterComponentOptions,
} from './navigation.types';
// import {colors} from '@theme/colors';
import {
  DEFAULT_OVERLAY_NAME,
  SHOW_MODAL_ANIMATION_CONFIG,
} from './navigation.constants';
import {compose} from '../utils/xtra';
import {MiniPlayer} from '../components/mini-player';

const withMiniPlayerProvider = (Component: NavigationFunctionComponent) => {
  return (props: any) => (
    <>
      <Component {...props} />
      <MiniPlayer />
    </>
  );
};

const withSaferAreaProvider = (Component: NavigationFunctionComponent) => {
  return (props: any) => (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Component {...props} />
    </SafeAreaProvider>
  );
};

const defaultOptions: RegisterComponentOptions = {
  withSafeArea: true,
};

export const registerComponent = (
  componentName: string,
  Component: NavigationFunctionComponent<any>,
  options?: RegisterComponentOptions,
) => {
  const componentTree = [];
  const {withSafeArea, withMiniPlayer} = {
    ...defaultOptions,
    ...options,
  };

  if (withSafeArea) {
    componentTree.push(withSaferAreaProvider);
  }

  if (withMiniPlayer) {
    componentTree.push(withMiniPlayerProvider);
  }

  const wrappedComponent = compose(...componentTree)(Component);

  return Navigation.registerComponent(
    componentName,
    () => wrappedComponent,
    () => Component,
  );
};

export const pushScreen = (params: PushScreenParams) => {
  return Navigation.push(params.currentComponentId, {
    component: {
      id: params.componentId,
      name: params.name,
      passProps: params.passProps,
      options: {
        bottomTabs: {
          visible: params.withBottomTabs,
        },
        ...params.options,
      },
    },
  });
};

export const pushScreenAsModal = (params: PushScreenParams) => {
  return Navigation.showModal({
    component: {
      id: params.componentId,
      name: params.name,
      passProps: params.passProps,
      options: {
        bottomTabs: {
          visible: params.withBottomTabs,
        },
        ...params.options,
      },
    },
  });
};

export const goBack = (currentComponentId: string) =>
  Navigation.pop(currentComponentId);

export const closeModal = (currentComponentId: string) =>
  Navigation.dismissModal(currentComponentId);

export const showOverlay = (props: OverlayProps) =>
  Navigation.showOverlay({
    component: {
      id: props.overlayId,
      name: DEFAULT_OVERLAY_NAME,
      passProps: props,
      options: {
        modalPresentationStyle:
          OptionsModalPresentationStyle.overCurrentContext,
        layout: {
          componentBackgroundColor: 'rgba(0,0,0,0.4)',
          backgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: props.canDismiss ?? true,
        },
        animations: {
          showModal: {
            alpha: SHOW_MODAL_ANIMATION_CONFIG,
          },
          dismissModal: {
            alpha: {
              ...SHOW_MODAL_ANIMATION_CONFIG,
              from: 1,
              to: 0,
            },
          },
        },
      },
    },
  });

export const dismissOverlay = (overlayId: string) =>
  Navigation.dismissOverlay(overlayId);
