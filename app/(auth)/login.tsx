import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '@/components/ui/Input';

// TODO: Check for KeyboardAwareScrollView library for keyboard handling
export default function Login() {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        identifier: '',
        password: '',
    });

    const handleLogin = () => {
        // Validate form
        const newErrors = {
            identifier: !formData.identifier ? 'Username or email is required' : '',
            password: !formData.password ? 'Password is required' : '',
        };
        setErrors(newErrors);

        if (!newErrors.identifier && !newErrors.password) {
            // Implement your login logic here
            console.log('Login with:', formData);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="flex-grow justify-center px-6 py-10"
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <View className="items-center mb-8">
                    <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
                        <Ionicons name="logo-ionic" size={40} color="white" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-800">
                        Welcome Back!
                    </Text>
                    <Text className="text-gray-500 mt-2 text-center">
                        Please sign in to continue
                    </Text>
                </View>

                {/* Form Section */}
                <View className="space-y-4">
                    <CustomInput
                        label="Username or Email"
                        placeholder="Enter your username or email"
                        value={formData.identifier}
                        onChangeText={(text) =>
                            setFormData(prev => ({ ...prev, identifier: text }))}
                        error={errors.identifier}
                        touched={true}
                        icon="person-outline"
                        required
                    />
                    <CustomInput
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChangeText={(text) =>
                            setFormData(prev => ({ ...prev, password: text }))}
                        secureTextEntry
                        error={errors.password}
                        touched={true}
                        icon="lock-closed-outline"
                        required
                    />

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/forgot-password')}
                        className="self-end"
                    >
                        <Text className="text-blue-500 text-sm">
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-primary py-3 rounded-xl mt-6 shadow-sm"
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600">
                            Don't have an account?{' '}
                        </Text>
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity>
                                <Text className="text-blue-500 font-semibold">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}