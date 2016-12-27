# React Native截屏&自定义截图

![全屏截图](./screencast/image1.png)
![自定义截图](./screencast/image2.png)

## 一、链接CameraRoll库
CameraRoll库所在位置：xxxProject/node_modules/React-native/Libraries/CameraRoll

[官方链接库步骤](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

## 二、截屏并保存代码
```javascript
UIManager
  .takeSnapshot('window', {format: 'png', quality: 0.9}) // See UIManager.js for options
  .then(uri => CameraRoll.saveToCameraRoll(uri))
  .catch((error) => alert(error));
```

## 三、自定义截图范围
查看[UIManager源码](https://github.com/facebook/react-native/blob/master/Libraries/ReactNative/UIManager.js)
```javascript
UIManager.takeSnapshot = async function(
  view ?: 'window' | React.Element<any> | number,
  options ?: {
    width ?: number,
    height ?: number,
    format ?: 'png' | 'jpeg',
    quality ?: number,
  },
) {
  // ...
}
```

自定义例子：截`Text`的部分，并保存在宽200*高20的画布中
```javascript
<Text ref={ txt => this.text = txt } >
  点击我截图
</Text>

UIManager
  .takeSnapshot(this.text, {format: 'png', width: 100, height: 20, quality: 1})
  .then((uri) => {
    this.setState({uri})
    return uri;
  })
  .then(uri => CameraRoll.saveToCameraRoll(uri))
  .catch((error) => alert(error));
};
```

#### 问题1
The app's Info.plist must contain an NSPhotoLibraryUsageDescription key with
a string value explaining to the user how the app uses this data.

解决方案：
从iOS10开始，访问相册需要用户授权。需要在Info.plist中添加一条名为NSCameraUsageDescription的键，
然后在其值中填写向用户请求权限的具体描述。编辑完成后这个键在Xcode中实际会显示为Privacy - Camera Usage Description。


#### 安卓截屏
根据[官网cameraroll](http://facebook.github.io/react-native/releases/0.39/docs/cameraroll.html)
貌似至少目前`官网cameraroll`并没很好支持安卓，建议可以尝试[rn-camera-roll](https://github.com/bamlab/rn-camera-roll)
