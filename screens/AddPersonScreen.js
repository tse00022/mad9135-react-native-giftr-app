import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="2003-01-03" value={dob} onChangeText={setDob} />

      <Button title="Save" />
      <Button title="Cancel" />
    </View>
  );
}