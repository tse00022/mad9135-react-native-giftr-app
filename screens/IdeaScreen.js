import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import { useContext, useState } from "react";
import PeopleContext from "../PeopleContext";
import CModal from "../components/CModal";

export default IdeaScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  const { people, getIdeas, deleteIdea } = useContext(PeopleContext);
  const [idDelete, setIdDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ fontSize: 26 }}>{`${name}'s IDeas`}</Text>
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
