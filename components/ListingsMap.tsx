import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.51837749387272,
  longitude: 13.403030356563338,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();
  const mapRef = useRef<any>(null);

  // When a marker is selected, navigate to the listing page
  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{ longitude: geometry.coordinates[0], latitude: geometry.coordinates[1] }}
      >
        <View style={styles.marker}>
          <Text style={{ color: "#000", alignItems: "center", fontFamily: "mon-sb" }}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    // <View style={styles.container}>
    <MapView
      ref={mapRef}
      animationEnabled={false}
      style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      initialRegion={INITIAL_REGION}
      clusterColor="#fff"
      clusterTextColor="#000"
      clusterFontFamily="mon-sb"
      renderCluster={renderCluster}
    >
      {listings.features.map((item: ListingGeo) => (
        <Marker
          coordinate={{ latitude: +item.properties.latitude, longitude: +item.properties.longitude }}
          key={item.properties.id}
          onPress={() => onMarkerSelected(item)}
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>$ {item.properties.price}</Text>
          </View>
        </Marker>
      ))}
    </MapView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
});

export default ListingsMap;
