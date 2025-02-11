import { View, Text, Pressable, Image, useColorScheme } from 'react-native';
import React, { memo, useState, useCallback, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getRelativeTime } from '@/utils/formatDate';
import { useToggleLikeMutation } from '@/services/postApi';
import { PostTypes } from '@/types/PostTypes';
import useAuth from '@/hooks/useAuth';

const PostCard = ({
    _id,
    title,
    description,
    owner,
    mediaUrl,
    createdAt,
    likes,
    comments
}: PostTypes) => {

    const { user } = useAuth();
    const userId = user?._id;
    const postLiked = useMemo(() => likes?.some(like => like._id === userId), [likes, userId]);

    const isDark = useColorScheme() === "dark";
    const [isLiked, setIsLiked] = useState(postLiked || false);
    const [likesCount, setLikesCount] = useState(likes?.length || 0);
    const [toggleLike] = useToggleLikeMutation();

    const handleLike = useCallback(async () => {
        try {
            setIsLiked(prev => !prev);
            setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

            await toggleLike({ postId: _id }).unwrap();
        } catch (error) {
            // Revert the optimistic update on error
            setIsLiked(prev => !prev);
            setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
            console.log('Like error:', error);
        }
    }, [_id, isLiked]);

    const renderUserInfo = useCallback(() => (
        <View className="flex flex-row gap-3 items-center px-3">
            <Image
                className="h-11 w-11 rounded-full"
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
    ), [owner, createdAt]);

    const renderContent = useCallback(() => (
        <View className="mt-4 px-3 pb-3">
            <Text className="text-lg font-semibold dark:text-gray-200">{title}</Text>
            {description && (
                <Text className="text-sm dark:text-gray-300 text-gray-500 line-clamp-3">
                    {description}
                </Text>
            )}
        </View>
    ), [title, description]);

    const renderMedia = useCallback(() => (
        mediaUrl && (
            <Image
                className="w-full h-[300px]"
                source={{ uri: mediaUrl }}
                resizeMode="cover"
            />
        )
    ), [mediaUrl]);

    const renderStats = useCallback(() => (
        <View className="py-2 px-12 flex-row justify-between items-center w-full border-b border-gray-300 dark:border-gray-600">
            <Text className="text-gray-500 text-xs dark:text-white">
                {`${likesCount} people likes this`}
            </Text>
            <Text className="text-gray-500 text-xs dark:text-white">
                {`${comments?.length || 0} comments`}
            </Text>
        </View>
    ), [likesCount, comments]);

    const renderActions = useCallback(() => (
        <View className="py-2 px-14 flex-row justify-between items-center w-full border-b border-gray-300 dark:border-gray-600">
            <Pressable
                onPress={handleLike}
                className="flex-row items-center gap-2"
            >
                <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={22}
                    color={isLiked ? "red" : isDark ? "#ffffff" : "#1f2937"}
                />
                <Text className="text-black dark:text-white text-sm">Like</Text>
            </Pressable>

            <Pressable className="flex-row items-center gap-2">
                <Ionicons
                    name="chatbubble-outline"
                    size={22}
                    color={isDark ? "#ffffff" : "#1f2937"}
                />
                <Text className="text-black dark:text-white text-sm">Comment</Text>
            </Pressable>
        </View>
    ), [isLiked, isDark, handleLike]);

    return (
        <View className="w-full py-5">
            {renderUserInfo()}
            {renderContent()}
            {renderMedia()}
            {renderStats()}
            {renderActions()}
        </View>
    );
};

export default memo(PostCard);