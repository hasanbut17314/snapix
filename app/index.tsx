import { useEffect } from 'react';
import { router } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import { ActivityIndicator, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      router.replace(isAuthenticated ? '/(tabs)' : '/(auth)/login');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <SafeAreaView className="flex h-full w-full justify-center items-center">
      <View className="flex-1 items-center justify-center gap-4">
        <Image
          source={require('../assets/images/snapix.png')}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
}