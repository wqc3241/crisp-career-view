import { useState, useCallback, useRef, useEffect } from 'react';

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

    // Mock knowledge base response
    const generateResponse = async (userMessage: string) => {
        setIsTyping(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        let response = "I'm not sure about that, but I can tell you about Qichao's work at Lucid Motors or his side projects.";

        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
            response = "Qichao has extensive experience as a Product Manager at Lucid Motors, BlueSnap, and Harmony Plus. He specializes in financial services, payments, and EdTech.";
        } else if (lowerMsg.includes('project') || lowerMsg.includes('side')) {
            response = "He has built several impressive AI projects like Cinely.AI (batch image editing) and Talkify (language learning). You can check them out in the AI Projects tab!";
        } else if (lowerMsg.includes('skill') || lowerMsg.includes('tech')) {
            response = "He is proficient in Product Strategy, Data Analytics, and AI/LLM integration. On the technical side, he works with React, Python, and various AI APIs.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
            response = "You can reach out to him via LinkedIn or check his resume for contact details.";
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
        speak(response);
    };

    const sendMessage = useCallback(async (content: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        await generateResponse(content);
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
