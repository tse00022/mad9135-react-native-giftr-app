import React from "react";
import { Button, View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <View
        style={{
          flex: 1,
          paddingTop: 0, // It seems navigation add extra padding at the top, so I set it to 0
          paddingBottom: insets.bottom,
        }}
      >
        <Stack.Navigator initialRouteName="PeopleScreen">
          <Stack.Screen
            name="PeopleScreen"
            component={PeopleScreen}
            options={Platform.OS === 'ios' ? ({ navigation }) => ({
              title: "People",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("AddPersonScreen")}
                  title="Add Person"
                />
              ),
            }) : undefined}
          />
          <Stack.Screen 
            name="AddPersonScreen" 
            component={AddPersonScreen} 
          />
          <Stack.Screen 
            name="IdeaScreen" 
            component={IdeaScreen} 
            options={({ navigation, route }) => ({
              title: `Ideas`,
              headerRight: Platform.OS === 'ios' ? () => (
                <Button
                  onPress={() => navigation.navigate("AddIdeaScreen", { id: route.params.id, name: route.params.name })}
                  title="Add Idea"
                />
              ): undefined,
            })}
          />
          <Stack.Screen 
            name="AddIdeaScreen" 
            component={AddIdeaScreen} 
            options={({ navigation, route }) => ({
              title: `Add Idea`,
            })}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
