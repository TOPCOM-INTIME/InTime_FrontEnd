import React from 'react';
import {View, Button, RefreshControl} from 'react-native';
import MapMake from '../components/MapMake';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Map_Marker() {
  const [refresh, setRefresh] = React.useState(false);
  const pushMe = React.useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => setRefresh(false));
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <Button
          style={{flex: 1}}
          onPress={() => pushMe()}
          color="#EE2F48"
          title="파트너 위치 갱신"
        />
        <MapMake />
      </View>
    </>
  );
}

export default Map_Marker;
