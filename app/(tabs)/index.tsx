import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listingData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsDataGeo from "@/assets/data/airbnb-listings.geo.json";

const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const items = useMemo(() => listingData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen options={{ header: () => <ExploreHeader onCategoryChanged={onDataChanged} /> }} />
      <ListingsMap listings={ListingsDataGeo} />
    </View>
  );
};

export default Page;
