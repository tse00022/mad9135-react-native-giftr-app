import React, { useContext } from "react";
import { Button, FlatList, View, Text, Image } from "react-native";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen({navigation}) {

  const { people } = useContext(PeopleContext)

  return (
    <View style={{padding: 10}}>
        { people && people.length === 0 && 
          <View style={{height: "100%", justifyContent:"center", alignItems: "center", paddingBottom:100}}>
            <Image 
              source={require("../assets/empty.png")}
              style={{width: 50, height: 50}} 
              resizeMode="contain"
            />
            <Text style={{fontSize: 16, color: "darkgrey"}}>No people found</Text> 
          </View>
        }
        {
          people && people.length > 0 &&
          <View>
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
          </View>
        }
        
    </View>
  );
}