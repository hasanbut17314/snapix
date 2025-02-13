import { View, Text, Modal, Pressable, TextInput, Image, FlatList } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useGetCommentsQuery } from '@/services/postApi'
import CommentSkeleton from '../skeleton/CommentSkeleton'

interface CommentModalProps {
    postId: string,
    userId: string,
    isOpen: boolean,
    onClose: () => void
}

interface CommentProps {
    _id: string,
    content: string,
    owner: {
        username: string,
        profilePic: string,
        _id: string
    }
}

const CommentModal = ({ postId, userId, isOpen, onClose }: CommentModalProps) => {

    const [comment, setComment] = useState('');

    const { data: response, isLoading, isError } = useGetCommentsQuery({ postId });
    const [comments, setComments] = useState<CommentProps[]>([]);

    useEffect(() => {
        if (response) {
            setComments(response.data);
        }
    }, [response]);

    const renderComments = useCallback(({ item }: { item: CommentProps }) => {
        return (
            <View className='py-3 w-full flex flex-row'>
                <Image
                    source={{ uri: item.owner.profilePic }}
                    className='w-12 h-12 rounded-full'
                    resizeMode='cover'
                />
                <View className='ml-3'>
                    <Text className='text-lg font-semibold'>{item.owner.username}</Text>
                    <Text className='text-gray-500'>{item.content}</Text>
                </View>
            </View>
        )
    }, []);

    const renderEmpty = useCallback(() => {
        if (isLoading) {
            return (
                <>
                    {Array(10).fill("").map((_, index) => (
                        <CommentSkeleton key={index} />
                    ))}
                </>
            )
        }
        if (isError) {
            return (
                <View className='flex-1 justify-center items-center p-12'>
                    <Text className='text-gray-500'>Something went wrong</Text>
                </View>
            )
        }
        if (comments?.length === 0) {
            return (
                <View className='flex-1 justify-center items-center p-12'>
                    <Text className='text-gray-500'>No comments yet</Text>
                </View>
            )
        }
    }, [isLoading, isError, comments]);

    const handleAddComment = async () => {
        console.log(comment);

    }
    return (
        <Modal
            animationType="slide"
            visible={isOpen}
            onRequestClose={onClose}
            transparent={true}
            statusBarTranslucent
            presentationStyle="overFullScreen"
        >
            <View className="flex-1 bg-black/50">
                <View className="mt-auto h-[80%] bg-white dark:bg-gray-900 rounded-t-3xl">
                    <SafeAreaView className="flex-1">
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                            <Pressable
                                onPress={onClose}
                                className="p-2"
                            >
                                <Ionicons name="close" size={24} color="gray" />
                            </Pressable>
                            <Text className="text-lg font-semibold">
                                Comments
                            </Text>
                            <View className="w-10" />
                        </View>

                        {/* Comments List */}
                        <View className="flex-1 px-4">
                            <FlatList
                                data={comments}
                                keyExtractor={item => item._id}
                                renderItem={renderComments}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={renderEmpty}
                            />

                        </View>

                        {/* Comment Input */}
                        <View className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
                            <TextInput
                                placeholder="Add a comment..."
                                value={comment}
                                onChangeText={setComment}
                                className="px-3 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-primary relative"
                                maxLength={250}
                            />
                            <Pressable className='absolute right-6 top-[17px]' onPress={handleAddComment}>
                                <Ionicons name="send" size={24} color="#168aad" />
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    )
}

export default memo(CommentModal)