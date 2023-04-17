import {bootNavigation} from '../navigation/navigation.config';
import {initAppStore} from '../store';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {PlaybackService} from '../services/playback';

export const bootApp = () => {
  TrackPlayer.registerPlaybackService(() => PlaybackService);
  TrackPlayer.setupPlayer({
    autoUpdateMetadata: true,
  }).finally(() => {
    TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Stop],
      compactCapabilities: [Capability.Stop, Capability.Play],
    });
    //   .finally(() => {
    //   TrackPlayer.addEventListener(Event.PlaybackState, noop);
    //   TrackPlayer.addEventListener(Event.PlaybackQueueEnded, noop);
    //   TrackPlayer.addEventListener(Event.PlaybackTrackChanged, noop);
    //   TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, noop);
    //   TrackPlayer.addEventListener(Event.RemoteStop, noop);
    // });
  });
  initAppStore();

  bootNavigation();
};
