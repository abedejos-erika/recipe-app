import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  console.disableYellowBox = true;

  return (
    <SafeAreaProvider>
      <StatusBar   />
      <Navigation />
    </SafeAreaProvider>
  );
}
