import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendChatMessage, ChatMessage, extractUsername } from '@/services/groqService';
import { useAuth } from '@/contexts/AuthContext';

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'Hi! I\'m your Personal Guider. I can help you understand your strengths, explore career paths, or answer any questions about your assessment. Feel free to tell me your name! How can I help you today?',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberedName, setRememberedName] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { user, preferences } = useAuth();

    // Load remembered name from localStorage
    useEffect(() => {
        const savedName = localStorage.getItem('chatbot_username');
        if (savedName) {
            setRememberedName(savedName);
        }
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: input.trim(),
        };

        // Check if user is introducing themselves
        const detectedName = extractUsername(input);
        if (detectedName) {
            setRememberedName(detectedName);
            localStorage.setItem('chatbot_username', detectedName);
        }

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const context = {
                userDomain: preferences?.domain,
                userName: rememberedName || user?.name || detectedName || undefined,
                currentModule: getCurrentModule(),
            };

            const response = await sendChatMessage([...messages, userMessage], context);

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: response,
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentModule = (): string => {
        const path = window.location.pathname;
        if (path.includes('assessment')) return 'Assessment';
        if (path.includes('results')) return 'Results Dashboard';
        if (path.includes('domain')) return 'Domain Selection';
        return 'Landing Page';
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg bg-gradient-hero hover:shadow-xl transition-shadow"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X className="h-6 w-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <MessageCircle className="h-6 w-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
                    >
                        <Card className="glass-card rounded-2xl shadow-2xl overflow-hidden border-primary/20">
                            {/* Header */}
                            <div className="bg-gradient-hero p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">Personal Guider</h3>
                                    <p className="text-xs text-white/80">
                                        {rememberedName ? `Helping ${rememberedName}` : 'Always here to help'}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="h-96 p-4" ref={scrollRef}>
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-secondary text-secondary-foreground'
                                                    }`}
                                            >
                                                {message.role === 'user' ? (
                                                    <User className="w-4 h-4" />
                                                ) : (
                                                    <Bot className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div
                                                className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-secondary text-secondary-foreground'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-2"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div className="bg-secondary rounded-2xl px-4 py-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Input */}
                            <div className="p-4 border-t border-border bg-background/50">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything..."
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        size="icon"
                                        className="bg-gradient-hero"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
