import { View, Text, Pressable, Image, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { getRelativeTime } from '@/utils/formatDate';
import { useToggleLikeMutation } from '@/services/postApi';

interface PostCardProps {
    _id: string;
    title: string;
    description?: string;
    owner: { username: string, profilePic: string, _id: string };
    mediaUrl?: string;
    createdAt: Date;
    likes?: Array<string>;
    comments?: Array<string>;
}

const PostCard = ({ _id, title, description, owner, mediaUrl, createdAt, likes, comments }: PostCardProps) => {

    const isDark = useColorScheme() === "dark";
    const [isLiked, setIsLiked] = useState(false);
    const [toggleLike] = useToggleLikeMutation();

    const handleLike = async () => {
        try {
            setTimeout(async () => await toggleLike({ postId: _id }), 250);
            setIsLiked(!isLiked);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className="w-full py-5">
            <View className="flex flex-row gap-3 items-center px-3">
                <Image
                    className='h-11 w-11 rounded-full'
                    source={{ uri: owner?.profilePic }}
                />
                <View>
                    <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                        {owner?.username}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-300 line-clamp-1">
                        {getRelativeTime(createdAt)}
                    </Text>
                </View>
            </View>
            <View className="mt-4 px-3 pb-3">
                <Text className="text-lg font-semibold dark:text-gray-200">{title}</Text>
                {description && <Text className="text-sm dark:text-gray-300 text-gray-500 line-clamp-3">{description}</Text>}
            </View>
            {mediaUrl && <Image className='object-cover w-full' source={{ uri: mediaUrl }} height={300} />}
            <View className='py-2 px-12 flex flex-row justify-between items-center w-full border-b border-gray-300 dark:border-gray-600'>
                <Pressable className="flex-row items-center gap-2">
                    <Text className="text-gray-500 text-xs dark:text-white">
                        {`${likes?.length || 0} people likes this`}
                    </Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-2">
                    <Text className="text-gray-500 text-xs dark:text-white">
                        {`${comments?.length || 0} comments`}
                    </Text>
                </Pressable>
            </View>
            <View className='py-2 px-14 flex flex-row justify-between items-center w-full border-b border-gray-300 dark:border-gray-600'>
                <Pressable onPress={handleLike} className="flex-row items-center gap-2">
                    <Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color={isLiked ? "red" : isDark ? "#ffffff" : "#1f2937"} />
                    <Text className="text-black dark:text-white text-sm">Like</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-2">
                    <Ionicons name="chatbubble-outline" size={22} color={isDark ? "#ffffff" : "#1f2937"} />
                    <Text className="text-black dark:text-white text-sm">Comment</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PostCard