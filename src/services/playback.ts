import TrackPlayer, {Event} from 'react-native-track-player';
import {noop} from '../utils/xtra';
import {getAppStore} from '../store';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, noop);

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    const {player} = getAppStore();
    player.togglePlayer(true);
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    const {player} = getAppStore();
    player.togglePlayer(true);
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, noop);

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, noop);

  TrackPlayer.addEventListener(Event.PlaybackState, noop);
}
