import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPreferences, UserDomain } from '@/types/user';

interface AuthContextType {
    user: User | null;
    preferences: UserPreferences | null;
    isAuthenticated: boolean;
    login: (googleUser: any) => void;
    logout: () => void;
    updatePreferences: (prefs: Partial<UserPreferences>) => void;
    setUserDomain: (domain: UserDomain) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedPrefs = localStorage.getItem('userPreferences');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedPrefs) {
            setPreferences(JSON.parse(storedPrefs));
        }
    }, []);

    const login = (googleUser: any) => {
        const newUser: User = {
            id: googleUser.sub || googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            createdAt: new Date(),
            lastLogin: new Date(),
        };

        const newPrefs: UserPreferences = {
            userId: newUser.id,
            domain: 'tech', // Default domain
            theme: 'system',
            notifications: true,
            savedAssessments: [],
        };

        setUser(newUser);
        setPreferences(newPrefs);

        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
    };

    const logout = () => {
        setUser(null);
        setPreferences(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userPreferences');
    };

    const updatePreferences = (prefs: Partial<UserPreferences>) => {
        if (!preferences) return;

        const updated = { ...preferences, ...prefs };
        setPreferences(updated);
        localStorage.setItem('userPreferences', JSON.stringify(updated));
    };

    const setUserDomain = (domain: UserDomain) => {
        updatePreferences({ domain });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                preferences,
                isAuthenticated: !!user,
                login,
                logout,
                updatePreferences,
                setUserDomain,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
