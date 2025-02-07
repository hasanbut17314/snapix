import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    activeOpacity?: number,
    containerClassName?: string,
    textClassName?: string,
    onPress?: () => void,
    disabled?: boolean,
    icon?: keyof typeof Ionicons.glyphMap,
    iconSize?: number,
    isLoading?: boolean
}

const Button = ({
    children,
    activeOpacity = 0.4,
    containerClassName,
    textClassName,
    onPress,
    disabled = false,
    icon,
    iconSize = 24,
    isLoading = false
}: ButtonProps) => {
    return (
        <TouchableOpacity
            className={`bg-primary ${disabled ? 'opacity-60' : ''} px-5 py-3 rounded-xl ${containerClassName}`}
            activeOpacity={activeOpacity}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className={`text-white font-semibold text-lg text-center ${textClassName}`}>
                {isLoading ? <ActivityIndicator size="small" color="white" /> : (
                    <Text className='gap-3 items-center justify-center text-center'>
                        {icon && <Ionicons name={icon} size={iconSize} color="white" />}
                        {children}
                    </Text>
                )}
            </Text>
        </TouchableOpacity>
    )
}

export default Button