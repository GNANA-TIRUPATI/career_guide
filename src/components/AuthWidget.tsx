import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function LoginButton() {
    const { login } = useAuth();
    const { toast } = useToast();

    const handleSuccess = (credentialResponse: any) => {
        try {
            if (!credentialResponse.credential) {
                throw new Error('No credential received');
            }

            // Decode JWT token to get user info
            const token = credentialResponse.credential;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const userInfo = JSON.parse(jsonPayload);

            login(userInfo);

            toast({
                title: "Login Successful!",
                description: `Welcome back, ${userInfo.name}!`,
            });
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login Failed",
                description: "There was an error signing in. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleError = () => {
        console.error('Google Login Failed');
        toast({
            title: "Login Failed",
            description: "Could not connect to Google. Please try again.",
            variant: "destructive",
        });
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="pill"
        />
    );
}

function UserMenu() {
    const { user, logout } = useAuth();
    const { toast } = useToast();

    if (!user) return null;

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.picture} alt={user.name} />
                        <AvatarFallback className="bg-gradient-hero text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function AuthWidget() {
    const { isAuthenticated, user } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
        >
            {isAuthenticated && user ? (
                <UserMenu />
            ) : (
                <Card className="glass-card p-1 rounded-full">
                    <LoginButton />
                </Card>
            )}
        </motion.div>
    );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
        console.warn('Google Client ID is not configured. Login will be disabled.');
        return <>{children}</>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
