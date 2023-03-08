import {Navigation} from 'react-native-navigation';
import {registerChannelsScreen} from '../screens/channels/channels.nav';
import {registerStationsScreen} from '../screens/station/station.nav';
import {registerMiniPlayer} from '../components/mini-player/mini-player.nav';
import {presentMiniPlayer} from '../components/mini-player';
// import {colors} from '@theme/colors';

export const registerScreens = () => {
  registerChannelsScreen();
  registerStationsScreen();
  // registerSplashScreen();
  Navigation.setLazyComponentRegistrator(() => {
    registerMiniPlayer();
    //   registerBanner();
    //   registerLoginScreen();
    //   registerSignupScreen();
    //   registerResetPasswordScreen();
    //   registerVerifyCodeScreen();
    //   registerHomeScreen();
    //   registerOrdersScreen();
    //   registerOrderScreen();
    //   registerProfileScreen();
    //   registerEditProfileScreen();
    //   registerChangePasswordScreen();
    //   registerSettingsScreen();
    //   registerQuoteScreen();
    //   registerCreateScreen();
    //   registerPayOrderScreen();
    //   registerWebViewScreen();
  });
};

export const switchRoot = (
  initialScreenName = 'com.listen181.channels-screen',
) =>
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          animations: {
            setRoot: {
              enabled: false,
              waitForRender: true,
            },
          },
        },
        children: [
          {
            component: {
              name: initialScreenName,
              id: initialScreenName,
              options: {
                layout: {
                  componentBackgroundColor: initialScreenName.includes(
                    'splash-',
                  )
                    ? '#222'
                    : '#fff',
                },
              },
            },
          },
        ],
      },
    },
  });

export const bootNavigation = () => {
  registerScreens();
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: '#fff',
      backgroundColor: '#fff',
    },
    animations: {
      push: {
        waitForRender: true,
      },
      setRoot: {
        waitForRender: true,
      },
      setStackRoot: {
        waitForRender: true,
      },
    },
    topBar: {
      visible: false,
      animate: false,
    },
    bottomTabs: {
      visible: false,
      animate: false,
    },
  });
  Navigation.events().registerAppLaunchedListener(() => {
    return switchRoot().finally(presentMiniPlayer);
  });
};
