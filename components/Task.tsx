import { StyleSheet } from "react-native";
import { ITask } from "../src/models/Task.model";
import Ripple from "react-native-material-ripple";

import { List } from "react-native-paper";
import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";

export const Task = (props: { task: ITask }) => {
  const longPress = () => {
    console.log("pressed");
    return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  return (
    <Pressable android_ripple={{ color: "#ededed" }} onLongPress={longPress}>
      <List.Item
        title={props.task.title}
        titleNumberOfLines={5}
        titleEllipsizeMode="tail"
        description={props.task.description}
        descriptionNumberOfLines={2}
        descriptionEllipsizeMode="tail"
        left={(props) => (
          <Pressable onPressIn={() => null}>
            <List.Icon {...props} icon="circle-outline" />
          </Pressable>
        )}
        right={(props) => (
          <Pressable onPressIn={() => null}>
            <List.Icon {...props} icon="star-outline" />
          </Pressable>
        )}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
