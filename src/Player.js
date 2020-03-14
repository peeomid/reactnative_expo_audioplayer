import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
// import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
// import Video from 'react-native-video';
import { Audio } from 'expo-av';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackInstance: null,
      isPlaying: false,
      previouslyPlay: false,
      volume: 1.0,
      isBuffering: false,
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      currentIndex: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    if (isPlaying) {
      await playbackInstance.pauseAsync()
      this.setState({
        isPlaying: !isPlaying
      })
    } else if (playbackInstance) {
      await playbackInstance.playAsync();
      this.setState({
        isPlaying: !isPlaying
      })
    }
  }

  handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < this.props.tracks.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }

  handleNextTrack = async () => {
    // console.log('next');
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < this.props.tracks.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }

  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state

    try {
      const playbackInstance = new Audio.Sound()
      // console.log('track');
      // console.log(this.props.tracks[currentIndex].audioUrl);
      const source = {
        uri: this.props.tracks[currentIndex].audioUrl
      }

      const status = {
        shouldPlay: isPlaying,
        volume
      }

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      await playbackInstance.loadAsync(source, status, false)
      this.setState({ playbackInstance })
    } catch (e) {
      console.log(e)
    }
  }

  onPlaybackStatusUpdate = status => {
    // console.log('status updated');
    // console.log(status);
    if (status.isLoaded == true) {
      this.setState({ 
        totalLength: status.durationMillis,
        currentPosition: status.positionMillis
      });
    }
    this.setState({
      isBuffering: status.isBuffering
    })
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }
 
  async seek(value) {
    const { previouslyPlay, playbackInstance } = this.state;
    await playbackInstance.setPositionAsync(value);
    if (previouslyPlay) {
      await playbackInstance.playAsync();
      this.setState({
        isPlaying: true,
        previouslyPlay: false
      })
    }
  }

  async sliding() {
    // console.log('sliding');
    const { isPlaying, playbackInstance } = this.state;
    if (isPlaying) {
      await playbackInstance.pauseAsync();
      this.setState({
        isPlaying: false,
        previouslyPlay: true
      });
    }
  }



  render() {
    const track = this.props.tracks[this.state.selectedTrack];

    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        {/* <Header message="Playing From Charts" /> */}
        <TrackDetails title={track.title} subtitle={track.subtitle} />
        {this.props.displayArt ? <AlbumArt url={track.albumArtUrl} /> : ''}
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={this.sliding.bind(this)}
          currentPosition={this.state.currentPosition}
        />
        <Controls
          onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn })}
          onPressPlay={this.handlePlayPause}
          onPressPause={this.handlePlayPause}
          onBack={this.handlePreviousTrack}
          onForward={this.handleNextTrack}
          paused={!this.state.isPlaying} />
        {/* {video} */}
      </View>
    );
  }
}

Player.defaultProps = {
  displayArt: true
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};

export default Player;