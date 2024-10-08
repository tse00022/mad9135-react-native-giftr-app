import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import PeopleContext from "../PeopleContext";

export default function AddPersonScreen({ navigation }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson} = useContext(PeopleContext)

  const savePerson = () => {
    if (!name || !dob) {
      alert("Please fill in all fields");
      return;
    }
    addPerson(name, dob);
    // save person
    navigation.goBack();
  }

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={{flex:1, padding: 20, justifyContent: "space-between"}}>
      <View>
          <Text style={{fontSize: 26, marginBottom: 20}}>Add Person</Text>
          <View style={{marginVertical: 20}}>
              <Text style={{fontSize: 20}}>Person Name</Text>
              <TextInput style={{fontSize: 20, borderBottomColor: "grey", borderBottomWidth: 2}} value={name} onChangeText={setName} />
          </View>
          
          <View style={{marginVertical: 20}}>
              <Text style={{fontSize: 20}}>Date of Birth</Text>
              <TextInput style={{fontSize: 20, borderBottomColor: "grey", borderBottomWidth: 2}} value={dob} onChangeText={setDob} />
          </View>
      </View>

      <View style={{alignItems:"center"}}>
        <TouchableOpacity
          onPress={savePerson}
          style={{alignItems: "center", justifyContent: "center", height: 40, backgroundColor: "skyblue", marginBottom: 10, borderColor: "Black", borderWidth: 1, width: "94%"}}
        >
          <Text style={{fontSize: 18, color: "white"}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goBack}
          style={{alignItems: "center", justifyContent: "center", height: 40, backgroundColor: "crimson", borderColor: "darkred", borderWidth: 1, width: "94%"}}
        >
          <Text style={{fontSize: 18, color: "white"}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
};