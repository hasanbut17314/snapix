import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
    return (
        <View className="flex-1 p-4">
            <Text className="text-xl font-bold">Home Feed</Text>
            <Link href="/post/123" className="text-blue-500">
                View Post
            </Link>
        </View>
    );
}