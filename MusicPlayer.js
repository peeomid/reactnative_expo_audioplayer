import React, { Component } from 'react';
import Player from './Player';
import { BackHandler } from 'react-native';
// import i18n from '../../Assets/I18n/i18n';
// import { Actions } from 'react-native-router-flux';
export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const TRACKS = [
      {
        title: 'Stressed Out',
        subtitle: 'Twenty One Pilots',
        albumArtUrl: "https://cdn-images-1.medium.com/max/1344/1*fF0VVD5cCRam10rYvDeTOw.jpeg",
        audioUrl: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3"
      },
      {
        title: 'Stressed Out',
        subtitle: 'Twenty One Pilots',
        albumArtUrl: "https://cdn-images-1.medium.com/max/1344/1*fF0VVD5cCRam10rYvDeTOw.jpeg",
        audioUrl: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3"
      }
    ];
    return <Player tracks={TRACKS} />
  }
}