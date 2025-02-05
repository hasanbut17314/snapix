import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PostScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View className="flex-1 p-4">
            <Text className="text-xl">Post {id}</Text>
        </View>
    );
}