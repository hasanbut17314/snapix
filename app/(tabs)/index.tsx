import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useGetPostsQuery } from "@/services/postApi";
import { useState, useCallback, useEffect, useMemo } from "react";
import PostCard from "@/components/posts/PostCard";
import PostCardSkeleton from "@/components/skeleton/PostCardSkeleton";
import { PostTypes } from "@/types/PostTypes";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<PostTypes[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const limit = 12;

    const {
        data: response,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useGetPostsQuery({ page, limit });

    const totalPages = useMemo(() => response?.data?.totalPages || 1, [response?.data?.totalPages]);
    useEffect(() => {
        if (response?.data?.posts) {
            if (page === 1) {
                setPosts(response.data.posts);
            } else {
                setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
            }
        }
    }, [response]);

    const handleLoadMore = useCallback(() => {
        if (!isFetching && totalPages && page < totalPages) {
            setPage(prev => prev + 1);
        }
    }, [isFetching, page, totalPages]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const renderCard = useCallback(({ item }: { item: PostTypes }) => (
        <PostCard {...item} />
    ), []);

    const renderFooter = useCallback(() => {
        if (isFetching) {
            return (
                <View className="flex-row items-center justify-center p-4">
                    <ActivityIndicator size="small" className="m-4" />
                </View>
            );
        } else if (page === totalPages) {
            return (
                <View className="pb-8 pt-4 px-4">
                    <View className="items-center space-y-2">
                        <View className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center">
                            <Ionicons
                                name="checkmark-done-circle"
                                size={28}
                                color="#10B981"
                            />
                        </View>
                        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            You're All Caught Up
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            You've seen all the latest posts. Check back later for more!
                        </Text>
                    </View>
                </View>
            );
        } else {
            return null;
        }

    }, [isFetching, page, totalPages]);

    const renderEmpty = useCallback(() => {
        if (isLoading) {
            return (
                <>
                    {Array(3).fill(0).map((_, i) => (
                        <PostCardSkeleton key={i} />
                    ))}
                </>
            );
        }

        if (isError) {
            return (
                <View className="flex-1 justify-center items-center p-4">
                    <Text className="text-gray-500 text-center">
                        Something went wrong. Please try again later.
                    </Text>
                </View>
            );
        }

        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-gray-500 text-center">
                    No posts found.
                </Text>
            </View>
        );
    }, [isLoading, isError]);

    const keyExtractor = useCallback((item: PostTypes) => item._id, []);

    return (
        <View className="flex-1 bg-white dark:bg-gray-900">
            <Text className="text-xl font-bold">Home Feed</Text>
            <Link href="/post/123" className="text-blue-500">
                View Post
            </Link>

            <FlatList
                data={posts}
                keyExtractor={keyExtractor}
                renderItem={renderCard}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={10}
                initialNumToRender={5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={!posts.length ? { flex: 1 } : undefined}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
        </View>
    );
}