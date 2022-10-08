import { StatusBar } from "expo-status-bar";

import { SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Footer from "./components/Footer";

import { IconButton, MD3Colors } from "react-native-paper";
import Header from "./components/Header";
import AddButton from "./components/AddButton";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import React, { useState } from "react";
import { ITask } from "./src/models/Task.model";
import { Task } from "./components/Task";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (task: Partial<ITask>) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Math.random().toString(),
        title: task?.title || "",
        description: task?.description || "",
        important: task?.important || false,
        completed: false,
      },
    ]);
  };

  const setTaskPriority = (taskId: string, priority: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority: priority } : t))
    );
  };

  const setTaskCompletionState = (taskId: string, completionState: boolean) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: completionState } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((t) => t.id !== id));
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.stretch}>
        <GestureHandlerRootView style={styles.stretch}>
          <StatusBar style={"auto"} />
          <Header></Header>

          <View style={styles.stretch}>
            <FlatList
              data={tasks}
              renderItem={(x) => {
                return (
                  <Task
                    task={x.item}
                    setTaskPriority={setTaskPriority}
                    setTaskCompletionState={setTaskCompletionState}
                  ></Task>
                );
              }}
            />
          </View>

          {/* <Image
          style={{ width: 40, height: 40, borderRadius: 400 }}
          source={require("./assets/jpg/me.jpg")}
        /> */}

          <Footer></Footer>
          <AddButton onAddTask={addTask}></AddButton>
        </GestureHandlerRootView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  stretch: {
    flex: 1,
  },

  addTaskBtnContainer: {
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 5,
  },
});
