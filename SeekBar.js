import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Slider
} from 'react-native';

// var Slider = require('react-native-slider');
// import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

const SeekBar = ({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40 }]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onValueChange={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        style={styles.slider}
        minimumTrackTintColor='rgba(0, 0, 0, 0.5)'
        maximumTrackTintColor='rgba(220, 220, 220, 0.5)' />
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    // backgroundColor: 'red',
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  // track: {
  //   height: 2,
  //   borderRadius: 1,
  // },
  // thumb: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: 'white',
  // },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});