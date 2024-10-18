import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PeopleScreen"
          component={PeopleScreen}
          options={({ navigation }) => ({
            title: "People",
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("AddPersonScreen")}
                title="Add Person"
              />
            ),
          })}
        />
        <Stack.Screen name="AddPersonScreen" component={AddPersonScreen} />
        <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
