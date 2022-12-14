import { View } from "react-native";
import React from "react";

import { IconButton, MD3Colors } from "react-native-paper";
import { StyleSheet } from "react-native";

export const Footer = () => {
  return (
    <View style={styles.footerWrapper}>
      <View style={styles.fakeBorderTop}></View>

      <View style={styles.roundBorderWrapper}>
        <View style={styles.roundBorder}></View>
      </View>

      <View style={styles.footer}>
        <IconButton
          icon="menu"
          size={24}
          onPress={() => console.log("Pressed")}
          iconColor={MD3Colors.primary0}
        />

        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor={MD3Colors.primary0}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    height: 56,
    overflow: "hidden",
  },
  fakeBorderTop: {
    borderTopWidth: 2,
    borderTopColor: "#efefef",
  },
  roundBorderWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    bottom: 25,
    zIndex: 1,
  },
  roundBorder: {
    backgroundColor: "white",
    width: 63,
    height: 63,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#efefef",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Footer;
