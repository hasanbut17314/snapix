import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Login() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold mb-4">Login Screen</Text>
            <Link href="/(auth)/register" className="text-blue-500">
                Create an account
            </Link>
        </View>
    );
}