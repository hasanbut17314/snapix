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
                    presentation: 'formSheet', // Use 'modal' for a full-screen swipe-up modal experience
                    sheetGrabberVisible: true, // Show a grabber to drag the sheet
                    sheetAllowedDetents: [0.25, 0.85, 1], // Define the height breakpoints for the modal (bottom, middle, full-screen)
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
                    gestureEnabled: true, // Allow gesture swipe to dismiss modal
                    gestureDirection: 'vertical', // Enable vertical gestures for the modal
                    animation: 'slide_from_bottom', // Slide-up animation from the bottom
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