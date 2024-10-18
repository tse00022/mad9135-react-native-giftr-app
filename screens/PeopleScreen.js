import React, { useContext } from "react";
import { Button, FlatList, View, Text, SafeAreaView } from "react-native";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen({navigation}) {

  const { people } = useContext(PeopleContext)

  return (
    <View style={{padding: 10}}>
        <Text style={{fontSize: 20}}>People List</Text>
        <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{borderRadius: 5, marginVertical: 5, padding: 10, backgroundColor: "lightgrey"}}>
                <Text style={{fontSize: 18}}>{item.name}</Text>
                <Text style={{fontSize: 16, color: "darkgrey"}}>{item.dob}</Text>
            </View>
            )}
        />
        <Button title="Add Person" onPress={() => {
            navigation.navigate("AddPerson");
        }} />
    </View>
  );
}