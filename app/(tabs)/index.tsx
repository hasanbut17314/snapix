import { View, Text, FlatList } from "react-native";
import { Link } from "expo-router";
import { useGetPostsQuery } from "@/services/postApi";
import { useState, useEffect } from "react";
import PostCard from "@/components/posts/PostCard";
import PostCardSkeleton from "@/components/skeleton/PostCardSkeleton";

export default function Home() {
    const [page, setPage] = useState(1);
    const limit = 12

    const { data: response, isLoading, refetch } = useGetPostsQuery({ page, limit });
    const posts = response?.data?.posts || [];


    const handleLoadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        refetch();
    }, [page])

    return (
        <View className="flex-1 bg-white dark:bg-gray-900">
            <Text className="text-xl font-bold">Home Feed</Text>
            <Link href="/post/123" className="text-blue-500">
                View Post
            </Link>
            {isLoading &&
                Array(3).fill(0).map((_, i) => <PostCardSkeleton key={i} />)
            }
            <View className="flex-1">
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <PostCard {...item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={isLoading}
                />
            </View>
        </View>
    );
}