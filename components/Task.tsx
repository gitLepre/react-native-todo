import { StyleSheet } from "react-native";
import { ITask } from "../src/models/Task.model";
import Ripple from "react-native-material-ripple";

import { List } from "react-native-paper";
import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";

export const Task = (props: {
  task: ITask;
  setTaskPriority: (taskId: string, priority: boolean) => void;
  setTaskCompletionState: (taskId: string, priority: boolean) => void;
}) => {
  const longPress = () => {
    return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const [prioritary, setPrioritary] = useState(props.task.important);
  const toggleIsImportant = () => {
    setPrioritary((prev) => {
      const next = !prev;
      props.setTaskPriority(props.task.id, next);
      return next;
    });
  };

  const [completionState, setCompletionState] = useState(props.task.completed);
  const toggleCompletionState = () => {
    setCompletionState((prev) => {
      const next = !prev;
      props.setTaskCompletionState(props.task.id, next);
      return next;
    });
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
          <Pressable onPressIn={toggleCompletionState}>
            <List.Icon
              {...props}
              icon={completionState ? "circle" : "circle-outline"}
            />
          </Pressable>
        )}
        right={(props) => (
          <Pressable onPressIn={toggleIsImportant}>
            <List.Icon {...props} icon={prioritary ? "star" : "star-outline"} />
          </Pressable>
        )}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
