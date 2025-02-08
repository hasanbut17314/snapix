import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useGetPostsQuery } from "@/services/postApi";
import { useState, useEffect } from "react";

export default function Home() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const { data, isLoading, refetch } = useGetPostsQuery({ page, limit });

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        refetch();
    }, [page])

    return (
        <View className="flex-1 p-4">
            <Text className="text-xl font-bold">Home Feed</Text>
            <Link href="/post/123" className="text-blue-500">
                View Post
            </Link>
        </View>
    );
}