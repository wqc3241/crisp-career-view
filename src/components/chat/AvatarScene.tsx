import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface AvatarSceneProps {
    isSpeaking: boolean;
}

const AvatarScene = ({ isSpeaking }: AvatarSceneProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">

            {/* Placeholder for 3D Scene */}
            <div className="text-center p-6 z-10">
                <div className={`w-32 h-32 mx-auto mb-4 rounded-full bg-blue-500/20 border-4 border-blue-400 flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'scale-110 shadow-[0_0_30px_rgba(96,165,250,0.6)]' : 'shadow-[0_0_15px_rgba(96,165,250,0.3)]'}`}>
                    <div className={`w-24 h-24 rounded-full bg-blue-400/80 transition-all duration-150 ${isSpeaking ? 'scale-90' : 'scale-100'}`} />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Virtual Qichao</h3>
                <p className="text-blue-200 text-sm max-w-xs mx-auto">
                    I'm listening! Ask me about my projects or experience.
                </p>

                {/* Instructions for 3D Integration */}
                <div className="mt-8 p-4 bg-black/40 rounded-lg text-xs text-left text-slate-400 font-mono border border-slate-700">
                    <p className="font-bold text-slate-300 mb-2">// To enable 3D Avatar:</p>
                    <p>1. npm install three @react-three/fiber @react-three/drei</p>
                    <p>2. Import Canvas from @react-three/fiber</p>
                    <p>3. Load your GLB model here</p>
                </div>
            </div>

            {/* Background Animation Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
            </div>
        </div>
    );
};

export default AvatarScene;
