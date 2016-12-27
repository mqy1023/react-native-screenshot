/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  UIManager,
  CameraRoll,
  View,
} from 'react-native';

export default class ScreenShot extends Component {

  constructor() {
    super();
    this.state ={
      uri: undefined
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text ref={ txt => this.text = txt } onPress={this.takeScreenshot} style={styles.button}>
          点击我截图
        </Text>
        <Image style={styles.image} source={{uri: this.state.uri}}/>
      </View>
    );
  }

  takeScreenshot = () => { //   截图并保存

    // 全屏截图
    // UIManager
    //   .takeSnapshot('window', {format: 'png', quality: 0.9}) // See UIManager.js for options
    //   .then(uri => CameraRoll.saveToCameraRoll(uri))
    //   .catch((error) => alert(error));

    // 自定义截Text文字部分
    UIManager
      .takeSnapshot(this.text, {format: 'png', width: 100, height: 20, quality: 1}) // See UIManager.js for options
      .then((uri) => {
        this.setState({uri})
        return uri;
      })
      .then(uri => CameraRoll.saveToCameraRoll(uri))
      .catch((error) => alert(error));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginBottom: 10,
    fontWeight: '500',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('ScreenShot', () => ScreenShot);
