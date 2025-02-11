import { router, Stack } from "expo-router";
import { Pressable, Text, useColorScheme } from "react-native";

const PostLayout = () => {
    const isDark = useColorScheme() === "dark";
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Post',
                    headerBackTitle: 'Back'
                }}
            />
            <Stack.Screen
                name="comments"
                options={{
                    presentation: 'formSheet',
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.85, 1],
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                    },
                    headerShadowVisible: false,
                    headerTitle: 'Comments',
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: '600',
                        color: isDark ? '#ffffff' : '#000000',
                    },
                    headerTitleAlign: 'center',
                    contentStyle: {
                        backgroundColor: isDark ? '#000000' : '#ffffff',
                    },
                    // For iOS
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    animation: 'slide_from_bottom',
                }}
            />
            <Stack.Screen
                name="edit"
                options={{
                    title: 'Edit Post',
                    headerBackTitle: 'Post'
                }}
            />
        </Stack>
    );
};

export default PostLayout