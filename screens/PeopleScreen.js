import React, { useContext } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import {
  Button,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import PeopleContext from "../PeopleContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PeopleScreen({ navigation }) {
  const { people, deletePerson } = useContext(PeopleContext);

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)}
      style={{
        backgroundColor: "red",
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          <Text style={{ fontSize: 16, color: "darkgrey" }}>{item.dob}</Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate("IdeaScreen", {id: item.id})}
          style={{ justifyContent: "center" }}
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
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
          <AntDesign name="inbox" size={80} color="black" />
          <Text style={{ fontSize: 16, color: "darkgrey" }}>
            No people found
          </Text>
          <Text styles={{ fontSize: 20, color: "darkgrey" }}>Add one</Text>
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
