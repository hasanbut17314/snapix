import { useState, useEffect, useCallback } from 'react';
import { secureStorage } from "@/utils/secureStorage";

const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tokens, setTokens] = useState<{
        accessToken: string | null;
        refreshToken: string | null;
    }>({ accessToken: null, refreshToken: null });

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const [userData, tokenData] = await Promise.all([
                    secureStorage.getUser(),
                    secureStorage.getTokens()
                ]);
                setUser(userData);
                setTokens(tokenData);
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const logout = useCallback(async () => {
        try {
            await secureStorage.clear();
            setUser(null);
            setTokens({ accessToken: null, refreshToken: null });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }, []);

    const updateUser = useCallback(async (newUserData: any) => {
        try {
            await secureStorage.setUser(newUserData);
            setUser(newUserData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }, []);

    const updateTokens = useCallback(async (accessToken: string, refreshToken: string) => {
        try {
            await secureStorage.setTokens(accessToken, refreshToken);
            setTokens({ accessToken, refreshToken });
        } catch (error) {
            console.error('Error updating tokens:', error);
        }
    }, []);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        tokens,
        logout,
        updateUser,
        updateTokens
    };
};

export default useAuth;