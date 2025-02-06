import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    error?: string;
    touched?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    multiline?: boolean;
    maxLength?: number;
    required?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
}

export default function CustomInput({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    touched,
    keyboardType = 'default',
    autoCapitalize = 'none',
    multiline = false,
    maxLength,
    required = false,
    icon,
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [labelAnim] = useState(new Animated.Value(value ? 1 : 0));

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(labelAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <View className="w-full mb-6">
            {/* Floating Label */}
            <Animated.Text
                className="absolute text-gray-600 bg-white px-1 z-10"
                style={{
                    transform: [
                        {
                            translateY: labelAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, -10],
                            }),
                        },
                    ],
                    left: 12,
                    fontSize: labelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                    }),
                }}
            >
                {label}
                {required && <Text className="text-red-500"> *</Text>}
            </Animated.Text>

            {/* Input Container */}
            <View className={`relative flex-row items-center bg-white 
                rounded-xl shadow-sm border ${Platform.OS === 'ios' ? 'shadow-gray-200' : ''} 
                        ${isFocused ? 'border-primary' : 'border-gray-200'}
                        ${error && touched ? 'border-red-500' : ''}`}>
                {icon && (
                    <View className="pl-4">
                        <Ionicons name={icon} size={20} color="#6B7280" />
                    </View>
                )}
                <TextInput
                    className={`flex-1 px-4 py-3.5 ${icon ? 'pl-2' : 'pl-4'}
                        ${multiline ? 'h-24' : 'h-12'} rounded-xl text-base`}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFocused ? placeholder : ''}
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    maxLength={maxLength}
                    textAlignVertical={multiline ? 'top' : 'center'}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        className="absolute right-3 h-full justify-center"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="#6B7280"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message */}
            {error && touched && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                    {error}
                </Text>
            )}

            {/* Character Count */}
            {maxLength && (
                <Text className="text-right text-gray-500 text-xs mt-1">
                    {value?.length || 0}/{maxLength}
                </Text>
            )}
        </View>
    );
}