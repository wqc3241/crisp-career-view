import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import AvatarScene from "./AvatarScene";
import ChatInterface from "./ChatInterface";
import { useAvatarChat } from "@/hooks/useAvatarChat";

const AvatarChat = () => {
  const { messages, isTyping, isSpeaking, sendMessage } = useAvatarChat();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with Virtual Me
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] p-0 gap-0 overflow-hidden flex flex-col md:flex-row border-none bg-transparent shadow-2xl">
        {/* Left Side - 3D Avatar Scene */}
        <div className="w-full md:w-[45%] h-[40%] md:h-full relative">
          <AvatarScene isSpeaking={isSpeaking} />
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-full md:w-[55%] h-[60%] md:h-full bg-background rounded-b-lg md:rounded-r-lg md:rounded-bl-none overflow-hidden">
          <ChatInterface messages={messages} isTyping={isTyping} onSendMessage={sendMessage} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarChat;
