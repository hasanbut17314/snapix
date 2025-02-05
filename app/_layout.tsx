import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  )
}
