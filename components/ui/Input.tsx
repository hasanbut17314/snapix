import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Animated, Platform, useColorScheme } from 'react-native';
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

export default function Input({
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
    const inputRef = useRef<TextInput>(null);

    const isDark = useColorScheme() === 'dark';

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

    const handleContainerPress = () => {
        inputRef.current?.focus();
    };

    return (
        <View className="w-full mb-6">
            <TouchableOpacity
                activeOpacity={1}
                onPress={handleContainerPress}
                className="relative"
            >
                {/* Floating Label */}
                <Animated.Text
                    className="absolute text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 py-1 -mt-1 z-10"
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
                            outputRange: [17, 13],
                        }),
                    }}
                >
                    {label}
                    {required && <Text className="text-red-500"> *</Text>}
                </Animated.Text>

                {/* Input Container */}
                <View className={`relative flex-row items-center bg-white dark:bg-gray-900 
                    rounded-xl shadow-sm border ${Platform.OS === 'ios' ? 'shadow-gray-200' : ''} 
                    ${isFocused ? 'border-primary' : 'border-gray-200'}
                    ${error && touched ? 'border-red-500' : ''}`}
                >
                    {icon && (
                        <View className="pl-4">
                            <Ionicons
                                name={icon}
                                size={20}
                                color={isDark ? '#9CA3AF' : '#6B7280'}
                            />
                        </View>
                    )}
                    <TextInput
                        ref={inputRef}
                        className={`flex-1 px-4 py-4 dark:text-gray-300 text-black ${icon ? 'pl-2' : 'pl-4'}
                            ${multiline ? 'h-24' : 'h-[52px]'} rounded-xl text-lg`}
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
            </TouchableOpacity>

            {/* Error Message */}
            {error && touched && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                    {error}
                </Text>
            )}

            {/* Character Count */}
            {maxLength && (
                <Text className="text-right text-gray-500 dark:text-gray-300 text-xs mt-1">
                    {value?.length || 0}/{maxLength}
                </Text>
            )}
        </View>
    );
}