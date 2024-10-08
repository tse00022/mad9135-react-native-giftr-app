import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleScreen from './screens/PeopleScreen';
import AddPersonScreen from './screens/AddPersonScreen';

export default function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <AddPersonScreen />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
});
