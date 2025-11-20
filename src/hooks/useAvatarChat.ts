import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export const useAvatarChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hi! I'm Qichao's virtual avatar. Ask me anything about his experience, projects, or skills!",
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const generateResponse = async (userMessage: string, captchaToken: string) => {
        setIsTyping(true);

        try {
            const { data, error } = await supabase.functions.invoke('chat-avatar', {
                body: { query: userMessage, captchaToken },
            });

            if (error) throw error;

            const response = data.reply || "I'm having trouble connecting to my brain right now. Please try again later.";

            const newMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, newMessage]);
            speak(response);
        } catch (error) {
            console.error('Error calling chat function:', error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error while thinking. Please try again.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const sendMessage = useCallback(async (content: string, captchaToken: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        await generateResponse(content, captchaToken);
    }, []);

    const speak = (text: string) => {
        setIsSpeaking(true);
        // Mock speech duration based on text length
        const duration = Math.min(text.length * 50, 5000);
        setTimeout(() => setIsSpeaking(false), duration);
    };

    return {
        messages,
        isTyping,
        isSpeaking,
        sendMessage,
    };
};
