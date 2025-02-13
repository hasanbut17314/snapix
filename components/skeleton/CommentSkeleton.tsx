import { View } from 'react-native'

const CommentSkeleton = () => {
    return (
        <View className='py-3 w-full flex flex-row justify-center items-center gap-3'>
            <View className='w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse'></View>
            <View className='ml-3'>
                <View className='h-3 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg'></View>
                <View className='h-2 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg mt-2'></View>
                <View className='h-2 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg'></View>
                <View className='h-2 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg'></View>
            </View>
        </View>
    )
}

export default CommentSkeleton