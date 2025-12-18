import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, ContactShadows, Environment, useGLTF } from '@react-three/drei';

import { motion as m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function BagModel(props) {
    // Placeholder Mesh since we don't have a real GLB yet
    // In production: const { nodes, materials } = useGLTF('/assets/bag.glb')
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = Math.sin(t / 4) / 4;
        ref.current.rotation.z = Math.sin(t / 4) / 10;
        ref.current.position.y = Math.sin(t / 1.5) / 10;
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Simple Bag Geometry Placeholder */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.5, 3.2, 1.2]} />
                <meshStandardMaterial
                    color="#5D4037"
                    roughness={0.3}
                    metalness={0.1}
                />
            </mesh>
            {/* Strap */}
            <mesh position={[0, 2, 0]} castShadow>
                <torusGeometry args={[0.8, 0.1, 16, 100, Math.PI]} />
                <meshStandardMaterial color="#3E2723" />
            </mesh>
            {/* Front Pocket */}
            <mesh position={[0, -0.5, 0.7]} castShadow>
                <boxGeometry args={[1.8, 1.5, 0.2]} />
                <meshStandardMaterial color="#4E342E" />
            </mesh>

            {/* Hotspots */}
            <Html position={[1.2, 1, 0.6]} distanceFactor={8}>
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-mono whitespace-nowrap">
                    ● Italian Full-Grain
                </div>
            </Html>
            <Html position={[-1.2, 0, 0.6]} distanceFactor={8}>
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-mono whitespace-nowrap">
                    ● Brass Hardware
                </div>
            </Html>
            <Html position={[0, -1, 0.8]} distanceFactor={8}>
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-mono whitespace-nowrap">
                    ● Hand-Stitched
                </div>
            </Html>
        </group>
    );
}

function Lighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Environment preset="city" />
        </>
    );
}

export default function Hero3D() {
    return (
        <div className="h-full w-full relative bg-transparent">
            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }}>
                    <Lighting />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <BagModel rotation={[0, Math.PI / 8, 0]} />
                    </Float>
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
        </div>
    );
}
