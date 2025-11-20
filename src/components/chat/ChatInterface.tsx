import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, User, Bot } from 'lucide-react';
import { Message } from '@/hooks/useAvatarChat';
import { cn } from '@/lib/utils';
import Turnstile from 'react-turnstile';

interface ChatInterfaceProps {
    messages: Message[];
    isTyping: boolean;
    onSendMessage: (message: string, captchaToken: string) => void;
}

const ChatInterface = ({ messages, isTyping, onSendMessage }: ChatInterfaceProps) => {
    const [inputValue, setInputValue] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && captchaToken) {
            onSendMessage(inputValue, captchaToken);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="p-4 border-b bg-muted/30">
                <h2 className="font-semibold text-lg">Chat with Qichao</h2>
                <p className="text-xs text-muted-foreground">Powered by AI Knowledge Base</p>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3 max-w-[85%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border"
                            )}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={cn(
                                "p-3 rounded-lg text-sm",
                                msg.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted text-foreground rounded-tl-none"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 mr-auto max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="bg-muted p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
                <div className="mb-2 flex justify-center">
                    <Turnstile
                        sitekey="0x4AAAAAACB6xzHT3xzLpxdS" // Cloudflare Test Site Key
                        onVerify={(token) => setCaptchaToken(token)}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping || !captchaToken}>
                        <Send size={18} />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
