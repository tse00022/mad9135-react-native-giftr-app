import React, { useContext, useState } from "react";
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
  Platform,
  StyleSheet
} from "react-native";
import PeopleContext from "../PeopleContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from '@expo/vector-icons';
import CModal from "../components/CModal";

export default function PeopleScreen({ navigation }) {
  const { people, deletePerson } = useContext(PeopleContext);
  const [idDelete, setIdDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  

  const renderRightActions = (item) => (
    <TouchableOpacity
      onPress={() => {
        console.log("gogogo", item)
        setIdDelete(item.id);
        setModalMessage(`Sure to delete people ${item.name} ?`);
        setShowModal(true);
      }}
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
    <Swipeable renderRightActions={() => renderRightActions(item)}>
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
          onPress={() => navigation.navigate("IdeaScreen", {id: item.id, name: item.name})}
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
    <View style={{ padding: 10, flex: 1 }}>
      {/* Display empty state */}
      {people && people.length === 0 && (
        <View
          style={{
            height: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="inbox" size={80} color="black" />
          <Text style={{ fontSize: 16, color: "darkgrey" }}>
            No people found
          </Text>
          <Text styles={{ fontSize: 20, color: "darkgrey" }}>Add one</Text>
        </View>
      )}
      {/* Display people list */}
      {people && people.length > 0 && (
        <View>
          <Text style={{ fontSize: 26 }}>People List</Text>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={people}
            style={{ marginTop: 10, height: "100%" }}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      )}

      <CModal
        visible={showModal}
        title="Delete Confirmation"
        message={modalMessage}
        OKHandler={() => {
          deletePerson(idDelete);
          setShowModal(false);
        }}
        CancelHandler={() => {
          setShowModal(false);
        }}
      />

      {/* Floating Action Button */}
      { Platform.OS === 'android' && (
        <TouchableOpacity style={styles.fab} onPress={()=>{navigation.navigate("AddPersonScreen")}}>
            <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>)}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});