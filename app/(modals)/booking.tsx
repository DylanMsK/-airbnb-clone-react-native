import { View, Text, StyleSheet, TextInput, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";

// @ts-ignore
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Page = () => {
  const router = useRouter();

  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGropus);

  let today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
    setGroups(guestsGropus);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}
      <View style={styles.card}>
        {openCard !== 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search-outline" size={20} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destinations"
                  placeholderTextColor={Colors.grey}
                />
              </View>
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 25, paddingLeft: 20, paddingRight: 20, marginBottom: 30 }}
            >
              {places.map((item, idx) => (
                <TouchableOpacity key={idx} onPress={() => setSelectedPlace(idx)}>
                  <Image source={item.img} style={selectedPlace === idx ? styles.placeSelected : styles.place} />
                  <Text
                    style={{ fontFamily: selectedPlace === idx ? "mon-sb" : "mon", paddingTop: 6, textAlign: "center" }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* When */}
      <View style={styles.card}>
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              When's yout trip?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  borderColor: "transparent",
                  mainColor: Colors.primary,
                }}
                current={getFormatedDate(new Date(), "YYYY/MM/DD")}
                selected={getFormatedDate(new Date(), "YYYY/MM/DD")}
                onSelectedChange={(date: any) => {
                  console.log(date);
                }}
                mode="calendar"
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* Who */}
      {/* Where */}
      <View style={styles.card}>
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who's coming?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((item, idx) => (
                <View key={idx} style={[styles.guestItem, idx + 1 < groups.length ? styles.itemBorder : {}]}>
                  <View>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 14 }}>{item.text}</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[idx].count = newGroups[idx].count > 0 ? newGroups[idx].count - 1 : 0;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={groups[idx].count > 0 ? Colors.grey : "#cdcdcd"}
                      />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "mon", fontSize: 16, minWidth: 18, textAlign: "center" }}>
                      {item.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[idx].count = newGroups[idx].count < 10 ? newGroups[idx].count + 1 : 10;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={onClearAll} style={{ justifyContent: "center" }}>
            <Text style={{ fontFamily: "mon-sb", fontSize: 18, textDecorationLine: "underline" }}>Clear all</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons name="search-outline" size={24} color="#fff" style={defaultStyles.btnIcon} />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 18,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 18,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    alignItems: "center",
    alignContent: "center",
    marginBottom: 4,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: Colors.grey,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});

export default Page;
