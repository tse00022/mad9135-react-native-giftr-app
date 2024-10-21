import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import { useContext, useState } from "react";
import PeopleContext from "../PeopleContext";
import CModal from "../components/CModal";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default IdeaScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  const { people, getIdeas, deleteIdea } = useContext(PeopleContext);
  const [idDelete, setIdDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ fontSize: 26 }}>{`${name}'s IDeas`}</Text>
      {/* Empty state */}
      {getIdeas(id).length === 0 && (
        <TouchableOpacity
          style={{
            height: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("AddIdeaScreen", { id, name });
          }}
        >
          <MaterialCommunityIcons name="power-plug-off-outline" size={80} color="black" />
          <Text style={{ fontSize: 16, color: "darkgrey" }}>
            No idea found
          </Text>
          <Text styles={{ fontSize: 20, color: "darkgrey" }}>Add one</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={getIdeas(id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: "lightgrey",
              marginVertical: 5,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <View>
              <Image
                src={item.img}
                alt={item.text}
                style={{ width: item.width, height: item.height }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 18 }}>{item.text}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIdDelete(item.id);
                  setShowModal(true);
                  setModalMessage(`Sure to delete idea ${item.text}?`);
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  backgroundColor: "red",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <CModal
        visible={showModal}
        title="Delete Idea"
        message={modalMessage}
        OKHandler={() => {
          if (idDelete) {
            deleteIdea(id, idDelete);
            setIdDelete(null);
            setShowModal(false);
          }
        }}
        CancelHandler={() => {
          setIdDelete(null);
          setShowModal(false);
        }}
      />
    </View>
  );
};
