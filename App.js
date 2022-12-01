import { View, Text } from "react-native";
import MapView, {Polyline, PROVIDER_DEFAULT, UrlTile, Marker} from 'react-native-maps';

export default function App() {
  return (
    <View>
      <MapView
        style={{width:"100%", height:"100%"}}
        showsScale={true}
        initialCamera={{
          center: {
            latitude: 51.163361,
            longitude: 10.447683,
          },
          heading: 40,
          altitude: 2190000,
        }}
        provider={PROVIDER_DEFAULT}
        mapType={"standard"}
      >
      
        <UrlTile
          urlTemplate={"https://b.tile.openstreetmap.de/{z}/{x}/{y}.png"}
          maximumZ={19}
          shouldReplaceMapContent={true} // <- the buggy thing
          // on first load of the app the openstreetmap is shown like it should,
          // the apple map is not shown, but the city name layer is shown which should not.
          // problem is the city name layer ABOVE the openstreetmap
          // 
          // if you change the value to false and save (fast refresh) and then set it back to true
          // (also save -> fast refresh) the name layer is gone. problem: the polyline is gone to the background
          // (you can see it when zooming in while the tiles were loaded from the server). This should not happen.
          //
          // the bug has to be fixed in the react-native-maps module: https://github.com/react-native-maps/react-native-maps/
          // some description auf the bug here: https://github.com/react-native-maps/react-native-maps/issues/4458
        />
        
        <Polyline 
          coordinates={[{latitude: 50, longitude: 7}, {latitude: 54,longitude:13}]}
          strokeColor="#ff0000"
          strokeWidth={4}
          zIndex={10}
        />
        
        <Marker
          coordinate={{latitude: 51.163361, longitude: 10.447683 }}
        />
        
      </MapView>
      
    </View>
  );
}
