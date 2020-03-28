import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
  displayBackForward,
}) => (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <Ionicons style={[styles.hide, styles.secondaryControl, shuffleOn ? [] : styles.off]} name='ios-shuffle' size={18} color='#444' />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity onPress={onBack}>
        <Ionicons style={[displayBackForward ? [] : styles.hide]} name='ios-skip-backward' size={30} color='#444' />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
      {!paused ?
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <Ionicons style={styles.centerButton} name='ios-pause' size={72} color='#444' />
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Ionicons style={styles.centerButton} name='ios-play' size={72} color='#444' />
          </View>
        </TouchableOpacity>
      }
      <View style={{ width: 20 }} />
      <TouchableOpacity onPress={onForward}
        disabled={forwardDisabled}>
        <Ionicons style={[displayBackForward ? [] : styles.hide]} name='ios-skip-forward' size={30} color='#444' />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
        <Ionicons style={[styles.hide, , styles.secondaryControl, repeatOn ? [] : styles.off]} name='ios-repeat' size={18} color='#444' />
      </TouchableOpacity>
    </View>
  );

export default Controls;

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    display: 'flex',
    height: 72,
    width: 72,
    // borderWidth: 1,
    // borderColor: '#444',
    // borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  },
  centerButton: {
  }
})