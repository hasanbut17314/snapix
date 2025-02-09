import { View, Text } from 'react-native'
import React from 'react'

const PostCardSkeleton = () => {
    return (
        <View className="w-full py-4">
            <View className="flex flex-row gap-3 items-center px-3">
                <View className="h-11 w-11 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <View className='flex gap-1'>
                    <View className="h-2 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                    <View className="h-2 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                </View>
            </View>
            <View className="mt-4 px-3 pb-3">
                <View className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2 rounded-lg" />
                <View className="h-2 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                <View className="h-2 w-full my-1 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                <View className="h-2 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
            </View>
            <View className="w-full h-52 bg-gray-300 dark:bg-gray-700 animate-pulse mt-2" />
        </View>
    )
}

export default PostCardSkeleton