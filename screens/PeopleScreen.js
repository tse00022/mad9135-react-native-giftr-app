import React, { useContext } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Button, FlatList, View, Text, Image } from "react-native";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen({ navigation }) {
  const { people, deletePerson } = useContext(PeopleContext);

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)}
      style={{backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 5,
        height: "100%",
      }}
    >
      <Text style={{}}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View
        style={{
          borderRadius: 5,
          padding: 10,
          backgroundColor: "lightgrey",
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ fontSize: 16, color: "darkgrey" }}>
          {item.dob}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ padding: 10 }}>
      {people && people.length === 0 && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <Image
            source={require("../assets/empty.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16, color: "darkgrey" }}>
            No people found,{" "}
          </Text>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddPersonScreen");
              }}
            ><Text styles={{ fontSize: 16, color: "darkgrey", }}>Add one</Text></TouchableOpacity>
        </View>
      )}
      {people && people.length > 0 && (
        <View>
          <Text style={{ fontSize: 20 }}>People List</Text>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={people}
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
    </GestureHandlerRootView>
  );
}
