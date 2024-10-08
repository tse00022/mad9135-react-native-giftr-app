import { Button, FlatList, View, Text, SafeAreaView } from "react-native";

export default function PeopleScreen({navigation}) {
  const people = [
    {
      id: "d825796c-4fc1-4879-ad86-048ece613581",
      name: "Tom",
      dob: "2001-01-09",
    },
    {
      id: "b825796d-4fc1-4879-ad86-048ece613582",
      name: "Megan",
      dob: "2001-02-28",
    },
    {
      id: "a825796e-4fc1-4879-ad86-048ece613583",
      name: "Tom",
      dob: "2001-04-28",
    },
  ];

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