import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [goal, setGoal] = useState(""); // Stores user input
  const [goals, setGoals] = useState([]); // Stores the list of goals

  // Load fonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Function to add a goal
  const addGoalHandler = () => {
    if (goal.trim().length === 0) return; // Prevent empty input
    setGoals((prevGoals) => [
      ...prevGoals,
      { id: Math.random().toString(), text: goal },
    ]);
    setGoal(""); // Clear input after adding
  };

  // Function to delete a goal when clicked
  const deleteGoalHandler = (goalId) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      {/* Input and Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter goal..."
          placeholderTextColor="#888"
          value={goal}
          onChangeText={setGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
          <Text style={styles.addButtonText}>ADD GOAL</Text>
        </TouchableOpacity>
      </View>

      {/* List of Goals */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteGoalHandler(item.id)}>
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#6A1B9A",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6A1B9A",
    padding: 10,
    borderRadius: 5,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#6A1B9A",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  goalItem: {
    padding: 10,
    backgroundColor: "#6A1B9A",
    borderRadius: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
    textAlign: "center",
  },
});
