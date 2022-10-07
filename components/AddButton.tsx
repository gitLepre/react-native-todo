import { View, StyleSheet, TextInput } from "react-native";
import { IconButton, Button } from "react-native-paper";

import React, { useCallback, useMemo, useRef, useState } from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ITask } from "../src/models/Task.model";

const AddButton = (props: { onAddTask: (task: Partial<ITask>) => void }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [180], []);

  const [enteredTaskTitle, setEnteredTaskTitle] = useState("");
  const [enteredTaskDescription, setEnteredTaskDescription] = useState("");

  const handleSheetChanges = useCallback((index: number) => {
    // todo
  }, []);

  const handleTaskTitleInput = (enteredText: string) => {
    setEnteredTaskTitle(enteredText);
  };

  const handleTaskDescriptionInput = (enteredText: string) => {
    setEnteredTaskDescription(enteredText);
  };

  const addTask = () => {
    if (enteredTaskTitle)
      props.onAddTask({
        title: enteredTaskTitle,
        description: enteredTaskDescription,
      });
    setEnteredTaskTitle("");
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <View style={styles.addIconContainer}>
        <View style={styles.addIconSpacer}>
          <View style={styles.addIconWrapper}>
            <IconButton
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}
              icon="plus"
              size={24}
              style={styles.addIcon}
            />
          </View>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={bottomSheetStyles.bs}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={bottomSheetStyles.bsInput}
            placeholder="Aggiungi un task"
            onChangeText={handleTaskTitleInput}
            value={enteredTaskTitle}
          ></TextInput>

          {/* <TextInput
            multiline={true}
            numberOfLines={3}
            style={bottomSheetStyles.bsInput}
            placeholder="Aggiungi un task"
            onChangeText={handleTaskDescriptionInput}
            value={enteredTaskDescription}
          ></TextInput> */}

          <View style={bottomSheetStyles.bsActions}>
            <IconButton
              icon="format-list-text"
              size={24}
              onPress={() => console.log("Pressed")}
            />

            <IconButton
              icon="calendar-check"
              size={24}
              onPress={() => console.log("Pressed")}
            />

            <IconButton
              icon="heart-outline"
              size={24}
              onPress={() => console.log("Pressed")}
            />

            <View style={{ flex: 1 }}></View>
            <Button onPress={addTask}>Salva</Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default AddButton;

const bottomSheetStyles = StyleSheet.create({
  bs: {
    marginHorizontal: 16,
    maxHeight: 400,
  },
  bsActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  bsInput: {
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});

const styles = StyleSheet.create({
  addIconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 23,
    width: "100%",
  },
  addIconSpacer: {
    padding: 3,
    borderRadius: 400,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  addIconWrapper: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#efefef",
  },
  addIcon: {
    backgroundColor: "#fff",
    width: 38,
    height: 38,
  },
});
