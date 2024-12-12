import { View, StyleSheet, Text } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import Colors from "@/constants/Colors";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: any[];
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const [refresh, setRefresh] = useState(0);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        style={styles.sheetContainer}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Listings listings={listings} category={category} refresh={refresh} />
          <View style={styles.absoluteBtn}>
            <TouchableOpacity style={styles.btn} onPress={showMap}>
              <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Map</Text>
              <Ionicons name="map" size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
