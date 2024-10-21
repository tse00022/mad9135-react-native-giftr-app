import {FlatList, Text, View} from 'react-native';
import { useContext } from 'react';
import PeopleContext from '../PeopleContext';

export default IdeaScreen = ({navigation, route}) => {
    const {id, name} = route.params;
    const { people, getIdeas } = useContext(PeopleContext);

    return (
        <View style={{padding: 10, flex: 1}}>
            <Text style={{ fontSize: 26 }}>IDeas</Text>
            <FlatList
                data={getIdeas(id)}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{padding: 10, backgroundColor: "lightgrey", marginVertical: 5, borderRadius: 5}}>
                        <Text style={{fontSize: 18}}>{item.idea}</Text>
                        <Text style={{fontSize: 18}}>{item.text}</Text>
                        <Text style={{fontSize: 18}}>{item.img}</Text>
                        <Text style={{fontSize: 18}}>{item.width}</Text>
                    </View>
                )}
            />
        </View>
    )
}
