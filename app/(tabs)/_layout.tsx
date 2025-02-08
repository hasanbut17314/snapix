import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { useLogoutMutation } from "@/services/authApi";
import useAuth from "@/hooks/useAuth";
import Toast from "react-native-toast-message";

export default function TabLayout() {

    const isDark = useColorScheme() === "dark";

    const [logout, { isLoading }] = useLogoutMutation();
    const { logout: logoutUserLocally } = useAuth();

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
            await logoutUserLocally();
            router.replace("/(auth)/login");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Logout Failed! Please try again',
            })
            console.log(error);
        }
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#168aad",
                headerStyle: {
                    backgroundColor: isDark ? "#111827" : "#ffffff",
                },
                headerTitleStyle: {
                    color: isDark ? "#ffffff" : "#111827",
                },
                tabBarStyle: {
                    backgroundColor: isDark ? "#111827" : "#ffffff",
                },
                tabBarLabelStyle: {
                    color: isDark ? "#ffffff" : "#1f2937",
                },
                tabBarInactiveTintColor: isDark ? "#ffffff" : "#1f2937",
                headerTitle: "Snapix",
                headerRight: () =>
                    <View className="px-4">
                        <Pressable className="flex-row items-center gap-2" onPress={handleLogout} disabled={isLoading}>
                            <Ionicons name="log-out-outline" size={24} color={isDark ? "#ffffff" : "#1f2937"} />
                            <Text className="text-black dark:text-white">Logout</Text>
                        </Pressable>
                    </View>
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notifications",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}