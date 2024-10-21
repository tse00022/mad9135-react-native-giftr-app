import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import PeopleContext from "../PeopleContext";
import DatePicker from "react-native-modern-datepicker";
import CModal from "../components/CModal";

export default function AddPersonScreen({ navigation }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { addPerson } = useContext(PeopleContext);
  const [modalMessage, setModalMessage] = useState("");

  const savePerson = () => {
    if (!name) {
      setModalMessage("Please enter name");
      setShowModal(true);
      return;
    }

    if (!dob) {
      setModalMessage("Please enter date of birth");
      setShowModal(true);
      return;
    }

    addPerson(name, dob);
    // save person
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={{ padding: 10, flex: 1 }}>
          {/* Name, Dob input controls */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 26, marginBottom: 20 }}>Add Person</Text>

            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                Person Name
              </Text>
              <TextInput
                style={{
                  fontSize: 20,
                  borderBottomColor: "grey",
                  borderBottomWidth: 2,
                }}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontSize: 20 }}>Date of Birth</Text>
              <DatePicker
                onSelectedChange={(date) => setDob(date.replace(/\//g, "-"))}
                mode="calendar"
              />
            </View>
          </View>
          {/* Save and Cancel buttons */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={savePerson}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                backgroundColor: "skyblue",
                marginBottom: 10,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goBack}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                backgroundColor: "red",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          {/* Modal */}
          <CModal
            visible={showModal}
            title="Error"
            message={modalMessage}
            OKHandler={() => setShowModal(false)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
