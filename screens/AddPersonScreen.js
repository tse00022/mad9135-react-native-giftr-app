import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function AddPersonScreen({ navigation }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  return (
    <View>
      <TextInput style={styles.name} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.dob} placeholder="2003-01-03" value={dob} onChangeText={setDob} />

      <Button title="Save" onPress={()=> {
        navigation.navigate("People");
      }} />
      <Button title="Cancel" />
    </View>
  );
}

const styles = {
    name: {
        textSize: 20,
    },
    dob: {
        textSize: 20,
    }
    
};