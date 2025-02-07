import { View, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Link } from 'expo-router'

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    [key: string]: string;
}

const register = () => {

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (name: string, text: string) => {
        setFormData({
            ...formData,
            [name]: text
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const validateForm = (data: FormData): FormErrors => {
        const errors: FormErrors = {};

        if (!data.username.trim()) {
            errors.username = 'Username is required';
        } else if (data.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        } else if (data.username.length > 10) {
            errors.username = 'Username must be at most 10 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (data.password.length > 16) {
            errors.password = 'Password must be at most 16 characters';
        } else if (!/\d/.test(data.password)) {
            errors.password = 'Password must contain at least one number';
        } else if (!/[a-z]/.test(data.password)) {
            errors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleRegister = () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Implement your registration logic here
            console.log('Register with:', formData);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white dark:bg-gray-900"
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="flex-grow justify-center px-6 py-10"
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <View className="items-center mb-10">
                    <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-4">
                        <Ionicons name="logo-ionic" size={40} color="white" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                        Create an Account
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-300 mt-2 text-center">
                        Sign up to get started
                    </Text>
                </View>

                {/* Form Section */}
                <View className="space-y-4">
                    <Input
                        label='Username'
                        value={formData.username}
                        name='username'
                        onChangeText={handleChange}
                        placeholder='abcd123'
                        error={errors.username}
                        icon='person-outline'
                        touched
                        required
                    />
                    <Input
                        label='Email'
                        value={formData.email}
                        name='email'
                        onChangeText={handleChange}
                        placeholder='abcd123@mail.com'
                        error={errors.email}
                        icon='mail-outline'
                        touched
                        required
                    />
                    <Input
                        label='Password'
                        value={formData.password}
                        name='password'
                        onChangeText={handleChange}
                        placeholder='******'
                        error={errors.password}
                        icon='lock-closed-outline'
                        secureTextEntry
                        touched
                        required
                    />
                    <Input
                        label='Confirm Password'
                        value={formData.confirmPassword}
                        name='confirmPassword'
                        onChangeText={handleChange}
                        placeholder='******'
                        error={errors.confirmPassword}
                        icon='lock-closed-outline'
                        touched
                        secureTextEntry
                        required
                    />

                    {/* Login Button */}
                    <Button
                        onPress={handleRegister}
                        containerClassName="mt-6"
                    >
                        Sign Up
                    </Button>

                    {/* Login Link */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                        </Text>
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity>
                                <Text className="text-blue-500 font-semibold">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default register