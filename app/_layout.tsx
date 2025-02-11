import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}