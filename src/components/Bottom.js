import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";

const Bottom = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Form");
  };

  return (
    <View style={styles.bottomMenuContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.iconContainer}>
          <AntDesignIcon name="pluscircleo" size={22} color="black" />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Create New Form
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 13,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  bottomMenuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    padding: 2,
    paddingHorizontal: 5,
  },
  bottomMenuText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  activeIcon: {
    color: "#5d20d2",
  },
  bottomMenuItem: {
    alignItems: "center",
  },
});

export default Bottom;
