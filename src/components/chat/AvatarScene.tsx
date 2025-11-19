import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
interface AvatarSceneProps {
  isSpeaking: boolean;
}
const AvatarScene = ({
  isSpeaking
}: AvatarSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">

            {/* Placeholder for 3D Scene */}
            <div className="text-center p-6 z-10">
                <div className={`w-32 h-32 mx-auto mb-4 rounded-full border-4 border-blue-400 flex items-center justify-center transition-all duration-300 overflow-hidden ${isSpeaking ? 'scale-110 shadow-[0_0_30px_rgba(96,165,250,0.6)]' : 'shadow-[0_0_15px_rgba(96,165,250,0.3)]'}`}>
                    <img src="/profile-pic.jpg" alt="Qichao Wang" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Virtual Qichao</h3>
                <p className="text-blue-200 text-sm max-w-xs mx-auto">
                    I'm listening! Ask me about my projects or experience.
                </p>

                {/* Instructions for 3D Integration */}
                
            </div>

            {/* Background Animation Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
            </div>
        </div>;
};
export default AvatarScene;