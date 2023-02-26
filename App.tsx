import React, {useState, useCallback, useEffect} from 'react';
import SoundPlayer from 'react-native-sound-player';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const playIcon = require('./play.png');
const stopIcon = require('./stop.png');
const {width, height} = Dimensions.get('window');
const App = () => {
  const [playing, setPlaying] = useState(false);
  const [meta, setMeta] = useState();
  const [album, setAlbum] = useState();

  useEffect(() => {}, []);

  const onPlay = useCallback(() => {
    if (playing) {
      SoundPlayer.stop();
    } else {
      SoundPlayer.playUrl(
        'https://listen.181fm.com/181-powerexplicit_128k.mp3',
      );
    }
    setPlaying(prev => !prev);
  }, [playing]);

  useEffect(() => {
    SoundPlayer.setMixAudio(false);

    const fetchMeta = () => {
      fetch(
        'https://player.181fm.com/streamdata.php?i=181-powerexplicit_128k.mp3&h=listen.181fm.com&p=7080',
      )
        .then(response => {
          response.json().then(setMeta);
        })
        .catch(console.info);
    };

    fetchMeta();

    let metaFetcher = setInterval(() => {
      fetchMeta();
    }, 22000);

    return () => {
      clearInterval(metaFetcher);
    };
  }, []);

  useEffect(() => {
    if (meta?.song) {
      fetch(
        'https://player.181fm.com/album.php?key=' +
          encodeURIComponent(meta.song),
      )
        .then(response => {
          response.json().then(setAlbum);
        })
        .catch(console.info);
    }
  }, [meta?.song]);
  return (
    <ImageBackground
      blurRadius={10}
      style={{
        height: height,
        width: width,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
      source={{uri: album?.Image}}>
      <StatusBar
        barStyle="light-content"
        hidden={playing}
        showHideTransition="slide"
        animated
      />
      <View
        style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.25)'}]}
      />
      {meta ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: width * 0.5,
              height: width * 0.5,
              marginBottom: 16,
              borderRadius: 8,
              overflow: 'hidden',
            }}
            source={{uri: album?.Image}}
          />
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFF',
              textAlign: 'center',
              marginVertical: 8,
            }}>
            {meta.song}
          </Text>
          <Text style={{color: '#f0f0f0'}}>{meta.artist}</Text>
        </View>
      ) : null}
      <TouchableOpacity onPress={onPlay} style={{paddingVertical: 32}}>
        <Image
          style={{width: 48, height: 48, tintColor: '#fff'}}
          source={playing ? stopIcon : playIcon}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default App;
