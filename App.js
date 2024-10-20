import { StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";
import { PeopleProvider } from "./PeopleContext";
import { SafeAreaProvider  } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </SafeAreaProvider>
  );
}
