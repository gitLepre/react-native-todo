import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

export const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content
        titleStyle={{ marginLeft: 32, textAlign: "center" }}
        title="Attività"
      />
      <Avatar.Image
        style={styles.icon}
        size={32}
        source={require("../assets/jpg/me.jpg")}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 16,
  },
});

export default Header;
