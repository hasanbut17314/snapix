import * as SecureStore from 'expo-secure-store';

const KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER: 'user'
} as const;

export const secureStorage = {

    async setTokens(accessToken: string, refreshToken: string) {
        try {
            await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken);
            await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken);
        } catch (error) {
            console.error('Error saving tokens:', error);
        }
    },

    async getTokens() {
        try {
            const accessToken = await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
            const refreshToken = await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error getting tokens:', error);
            return { accessToken: null, refreshToken: null };
        }
    },

    async setUser(user: any) {
        try {
            await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user:', error);
        }
    },

    async getUser() {
        try {
            const user = await SecureStore.getItemAsync(KEYS.USER);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    async clear() {
        try {
            await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
            await SecureStore.deleteItemAsync(KEYS.USER);
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
}