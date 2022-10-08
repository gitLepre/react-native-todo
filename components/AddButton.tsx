import { View, StyleSheet, TextInput } from "react-native";
import { IconButton, Button } from "react-native-paper";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ITask } from "../src/models/Task.model";

const AddButton = (props: { onAddTask: (task: Partial<ITask>) => void }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [140, 190], []);

  const [enteredTaskTitle, setEnteredTaskTitle] = useState("");
  const [enteredTaskDescription, setEnteredTaskDescription] = useState("");
  const [descriptionInputOpen, setdescriptionInputOpen] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    // todo
  }, []);

  const handleTaskTitleInput = (enteredText: string) => {
    setEnteredTaskTitle(enteredText);
  };

  useEffect(() => {
    console.log(enteredTaskTitle);
  }, [enteredTaskTitle]);

  const handleTaskDescriptionInput = (enteredText: string) => {
    setEnteredTaskDescription(enteredText);
  };

  const toggleDescriptionInput = () => {
    setdescriptionInputOpen((prev) => {
      const next = !prev;
      if (next) snapTo(1);
      else snapTo(0);
      return next;
    });
  };

  const snapTo = (i: number) => {
    bottomSheetRef.current?.snapToIndex(i);
  };

  const addTask = () => {
    if (enteredTaskTitle)
      // if (enteredTaskTitle || (enteredTaskDescription && descriptionInputOpen))
      props.onAddTask({
        title: enteredTaskTitle,
        description: enteredTaskDescription,
        // description: descriptionInputOpen ? enteredTaskDescription : "",
      });
    setEnteredTaskTitle("");
    setEnteredTaskDescription("");
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

  const renderBSFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props}>
        <View style={bottomSheetStyles.bsActions}>
          <IconButton
            icon="format-list-text"
            size={24}
            onPress={toggleDescriptionInput}
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
          <Button
            disabled={enteredTaskTitle === "" && enteredTaskDescription === ""}
            onPress={addTask}
          >
            Salva
          </Button>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <>
      <View style={styles.addIconContainer}>
        <View style={styles.addIconSpacer}>
          <View style={styles.addIconWrapper}>
            <IconButton
              onPress={() => (descriptionInputOpen ? snapTo(1) : snapTo(0))}
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
        containerHeight={130}
        contentHeight={110}
        keyboardBlurBehavior={"restore"}
        footerComponent={renderBSFooter}
      >
        <BottomSheetView style={bottomSheetStyles.bs}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={bottomSheetStyles.bsTitleInput}
            placeholder="Nuova attività"
            onChangeText={handleTaskTitleInput}
            value={enteredTaskTitle}
          ></TextInput>

          {/* <TextInput
            multiline={true}
            numberOfLines={3}
            style={{
              ...bottomSheetStyles.bsTitleDescription,
              display: descriptionInputOpen ? "flex" : "none",
            }}
            placeholder="Aggiungi i dettagli"
            onChangeText={handleTaskDescriptionInput}
            value={enteredTaskDescription}
          ></TextInput> */}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default AddButton;

const bottomSheetStyles = StyleSheet.create({
  bs: {
    marginHorizontal: 16,
    height: 1200,
  },
  bsActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  bsTitleInput: {
    width: "100%",
    // paddingHorizontal: 16,
    maxHeight: 60, // 8 lines 112
    lineHeight: 15,
    fontSize: 14,
  },
  bsTitleDescription: {
    width: "100%",
    // paddingHorizontal: 16,
    lineHeight: 13,
    marginTop: 8,
    maxHeight: 39, // 6 lines 78
    fontSize: 12,
    opacity: 0.72,
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
    borderRadius: 60,
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
