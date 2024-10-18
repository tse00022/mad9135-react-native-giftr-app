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
        <TouchableOpacity
          style={{
            height: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
        >
          <Image
            source={require("../assets/empty.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16, color: "darkgrey" }}>
            No people found
          </Text>
          <Text styles={{ fontSize: 20, color: "darkgrey", }}>Add one</Text>
        </TouchableOpacity>
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
