import { View, Button, Text, StyleSheet, SafeAreaView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0]?.emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    if (!firstName || !lastName) return;

    try {
      await user?.update({ firstName, lastName });
    } catch (error) {
      console.log("🚀 ~ file: profile.tsx:33 ~ onSaveUser ~ error:", error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      user?.setProfileImage({ file: base64 });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>
      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName ?? ""}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName ?? ""}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: "mon-sb" }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={20} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />}

      {!isSignedIn && (
        <Link href="/(modals)/login" asChild>
          <Button title="Login" color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "mon-b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
