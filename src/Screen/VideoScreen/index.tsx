import React, { FC, useState } from 'react';
import { propsVideo, VideoScreenProps } from './types';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './style';
import { useThemeAwareObject } from '@root/Theme/ThemeAwareObject.hook';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from '@root/Theme/Theme.context';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';

export const VideoScreen: FC<VideoScreenProps> = () => {
  const { theme } = useTheme();
  const [isVideo, setIsVideo] = useState(false);
  const [patchVideo, setPatchVideo] = useState<string>();

  let DATA: propsVideo[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
      pathLocal: null,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      uri: 'http://techslides.com/demos/sample-videos/small.mp4',
      pathLocal: null,
    },
  ];
  const onPressOpen = (patch) => {
    setPatchVideo(patch);
    setIsVideo(true);
  };

  const videoPlayer = React.useRef(null);

  const onPressDownloadFile = (uri, id) => {
    const timestamp = Date.now();
    const LOCAL_PATH_TO_VIDEO = `file://${RNFS.ExternalDirectoryPath}/mood-pixel-${timestamp}.mp4`;
    RNFS.downloadFile({
      fromUrl: uri,
      toFile: LOCAL_PATH_TO_VIDEO,
    }).promise.then((response) => {
      if (response.statusCode == 200) {
        setPatchVideo(LOCAL_PATH_TO_VIDEO);
        setIsVideo(true);
        DATA = DATA.map((itemArray) => {
          return itemArray.id === id ? { ...itemArray, pathLocal: LOCAL_PATH_TO_VIDEO } : itemArray;
        });
        console.log(DATA);

        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    });
  };

  const Styles = useThemeAwareObject(createStyles);

  const onBuffer = (e) => {
    console.log(e);
  };
  const videoError = (e) => {
    console.log(e);
  };

  const Item = ({ title, pathLocal, uri, id }) => (
    <View style={Styles.item}>
      <TouchableOpacity
        style={Styles.item}
        onPress={() => {
          pathLocal == null ? onPressOpen(pathLocal) : onPressOpen(uri);
        }}
      >
        <Text style={Styles.textItem}>{title}</Text>
      </TouchableOpacity>

      <FontAwesomeIcon
        icon={faCheck}
        color={pathLocal == null ? theme.color.surface : theme.color.bright}
      />
      <TouchableOpacity
        style={Styles.buttonDownload}
        onPress={() => {
          onPressDownloadFile(uri, id);
        }}
        disabled={pathLocal !== null}
      >
        <Text style={Styles.text}>Download</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} pathLocal={item.pathLocal} uri={item.uri} id={item.id} />
  );
  // console.log(DATA);

  return (
    <View style={Styles.container}>
      {/* <TouchableOpacity onPress={onPressDownloadFile} style={Styles.button}>
        <Text style={Styles.text}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressOpen} style={Styles.button}>
        <Text style={Styles.text}>Open</Text>
      </TouchableOpacity> */}
      <SafeAreaView style={Styles.flatList}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </SafeAreaView>
      {isVideo ? (
        <Video
          source={{
            uri: patchVideo,
          }}
          ref={videoPlayer}
          controls={true}
          onBuffer={onBuffer}
          onError={videoError}
          style={Styles.videoWrapper}
        />
      ) : null}
    </View>
  );
};
