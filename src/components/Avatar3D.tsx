import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import avatarImage from '@/assets/avatar.jpg';

const RotatingAvatar = ({ onClick }: { onClick: () => void }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(avatarImage);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Avatar3D = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    if (isSpeaking) return;

    const introduction = "Hi! I'm Alex Doe, a Senior Product Manager specializing in building user-centric products that bridge the gap between technology and business goals. With a passion for AI and data-driven decisions, I thrive on creating impactful digital experiences.";

    const utterance = new SpeechSynthesisUtterance(introduction);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative w-48 h-48 mx-auto mb-8 cursor-pointer group">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RotatingAvatar onClick={handleClick} />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isSpeaking && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to hear introduction
      </p>
    </div>
  );
};

export default Avatar3D;
