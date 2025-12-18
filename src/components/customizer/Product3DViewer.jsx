import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, ContactShadows, Float, useTexture, PresentationControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { AlertTriangle, ShoppingBag, Shirt, Footprints, Layers } from 'lucide-react';

// --- MATERIALS ---

const LeatherMaterial = ({ color, leatherType = 'full-grain', normalMapUrl = '/assets/leather_normal.png' }) => {
    const normalMap = useTexture(normalMapUrl);
    normalMap.repeat.set(4, 4);
    normalMap.wrapS = 1000;
    normalMap.wrapT = 1000;

    const roughnessMap = {
        "full-grain": 0.6,
        "top-grain": 0.45,
        nubuck: 0.85,
        exotic: 0.35,
    };

    const metalnessMap = {
        "full-grain": 0.02,
        "top-grain": 0.05,
        nubuck: 0.01,
        exotic: 0.12,
    };

    return (
        <meshPhysicalMaterial
            color={color}
            roughness={roughnessMap[leatherType] || 0.6}
            metalness={metalnessMap[leatherType] || 0.1}
            clearcoat={leatherType === "exotic" ? 0.4 : 0.1}
            clearcoatRoughness={0.3}
            normalMap={normalMap}
            normalScale={[0.5, 0.5]}
            envMapIntensity={1.2}
            sheen={0.3}
            sheenRoughness={0.8}
            sheenColor={new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.2)}
        />
    );
};

const HardwareMaterial = ({ type = 'gold', color }) => {
    // If explicit color is provided (from customizer), use it. Otherwise map 'type'.
    const materials = {
        brass: { color: "#B5A642", roughness: 0.25, metalness: 0.95 },
        silver: { color: "#E8E8E8", roughness: 0.15, metalness: 0.98 },
        gold: { color: "#FFD700", roughness: 0.2, metalness: 0.95 },
        gunmetal: { color: "#3A3A3A", roughness: 0.3, metalness: 0.9 },
        "antique-brass": { color: "#8B7355", roughness: 0.45, metalness: 0.75 },
    };

    // Simple logic: if 'color' prop passed (like #FFD700), use it. Else invoke type preset.
    const mat = color ? { color, roughness: 0.2, metalness: 0.95 } : (materials[type] || materials.gold);

    return <meshStandardMaterial color={mat.color} roughness={mat.roughness} metalness={mat.metalness} />;
};

// --- MODELS ---

function JacketModel({ config, animationPhase, onPartClick }) {
    const groupRef = useRef(null)

    // Default fallbacks
    const bodyColor = config.body || config.color || '#8B4513';
    const sleevesColor = config.sleeves || bodyColor;
    const hardColor = config.hardware || '#FFD700';

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.03
        }
    })

    return (
        <group ref={groupRef} scale={1.5 * animationPhase} position={[0, -0.2, 0]}>
            {/* Front left panel */}
            <mesh position={[-0.22, 0.05, 0.14]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[0.48, 1.2, 0.18]} radius={0.04} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Front right panel */}
            <mesh position={[0.22, 0.05, 0.14]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[0.48, 1.2, 0.18]} radius={0.04} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Back panel */}
            <mesh position={[0, 0.05, -0.08]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[1.0, 1.25, 0.15]} radius={0.04} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Sleeves */}
            <group position={[-0.58, 0.25, 0]} rotation={[0.08, 0, 0.35]}>
                <mesh onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('sleeves'); }}>
                    <cylinderGeometry args={[0.13, 0.16, 0.55, 20]} />
                    <LeatherMaterial color={sleevesColor} />
                </mesh>
            </group>
            <group position={[0.58, 0.25, 0]} rotation={[0.08, 0, -0.35]}>
                <mesh onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('sleeves'); }}>
                    <cylinderGeometry args={[0.13, 0.16, 0.55, 20]} />
                    <LeatherMaterial color={sleevesColor} />
                </mesh>
            </group>

            {/* Hardware Zipper */}
            <mesh position={[0.08, 0.1, 0.24]} rotation={[0, 0, 0.12]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('hardware'); }}>
                <boxGeometry args={[0.04, 0.9, 0.015]} />
                <HardwareMaterial color={hardColor} />
            </mesh>
        </group>
    )
}

function BagModel({ config, animationPhase, onPartClick }) {
    const groupRef = useRef(null)

    const bodyColor = config.body || '#8B4513';
    const handleColor = config.handle || '#654321';
    const hardColor = config.hardware || '#FFD700';

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06 - 0.15
        }
    })

    return (
        <group ref={groupRef} scale={1.4 * animationPhase} position={[0, -0.15, 0]}>
            {/* Main bag body */}
            <mesh position={[0, 0, 0]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[0.9, 0.75, 0.4]} radius={0.035} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Bag top flap */}
            <mesh position={[0, 0.42, 0.06]} rotation={[-0.12, 0, 0]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[0.92, 0.12, 0.42]} radius={0.025} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Handle straps */}
            <mesh position={[-0.22, 0.62, 0]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('handle'); }}>
                <torusGeometry args={[0.16, 0.022, 16, 32, Math.PI]} />
                <LeatherMaterial color={handleColor} />
            </mesh>
            <mesh position={[0.22, 0.62, 0]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('handle'); }}>
                <torusGeometry args={[0.16, 0.022, 16, 32, Math.PI]} />
                <LeatherMaterial color={handleColor} />
            </mesh>

            {/* Hardware Accents */}
            <mesh position={[0, 0.38, 0.22]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('hardware'); }}>
                <RoundedBox args={[0.1, 0.08, 0.025]} radius={0.015} smoothness={4}>
                    <HardwareMaterial color={hardColor} />
                </RoundedBox>
            </mesh>
        </group>
    )
}

function BootModel({ config, animationPhase, onPartClick }) {
    const groupRef = useRef(null)
    const bodyColor = config.body || config.color || '#8B4513';
    const soleColor = '#0a0a0a';

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle idle animation
        }
    })

    const BootShape = ({ xOffset }) => (
        <group position={[xOffset, 0, 0]}>
            {/* Foot/toe box */}
            <mesh position={[0, -0.25, 0.15]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <RoundedBox args={[0.28, 0.2, 0.58]} radius={0.045} smoothness={4}>
                    <LeatherMaterial color={bodyColor} />
                </RoundedBox>
            </mesh>

            {/* Ankle/shaft */}
            <mesh position={[0, 0.18, 0]} onClick={(e) => { e.stopPropagation(); onPartClick && onPartClick('body'); }}>
                <cylinderGeometry args={[0.14, 0.15, 0.6, 24]} />
                <LeatherMaterial color={bodyColor} />
            </mesh>

            {/* Sole */}
            <mesh position={[0, -0.38, 0.1]}>
                <RoundedBox args={[0.3, 0.05, 0.55]} radius={0.015} smoothness={4}>
                    <meshStandardMaterial color={soleColor} roughness={0.95} />
                </RoundedBox>
            </mesh>
        </group>
    )

    return (
        <group ref={groupRef} scale={1.5 * animationPhase}>
            <BootShape xOffset={-0.22} />
            <BootShape xOffset={0.22} />
        </group>
    )
}

// ... Additional models can be added following this pattern ...

function ProductModel({ productType, config, animationPhase, onPartClick }) {
    const safeConfig = typeof config === 'string' ? { body: config } : (config || {});

    switch (productType) {
        case "jacket":
            return <JacketModel config={safeConfig} animationPhase={animationPhase} onPartClick={onPartClick} />
        case "bag":
            return <BagModel config={safeConfig} animationPhase={animationPhase} onPartClick={onPartClick} />
        case "boots":
        case "boot": // Handle both singular/plural
            return <BootModel config={safeConfig} animationPhase={animationPhase} onPartClick={onPartClick} />
        default:
            return <BagModel config={safeConfig} animationPhase={animationPhase} onPartClick={onPartClick} />
    }
}

class WebGLErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("WebGL Error caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

function FallbackPreview({ productType, config }) {
    const safeConfig = typeof config === 'string' ? { body: config } : (config || {});
    const bodyColor = safeConfig.body || safeConfig.color || '#8B4513';

    // Select icon based on product type
    const ProductIcon = () => {
        switch (productType) {
            case 'jacket': return <Shirt size={120} color={bodyColor} strokeWidth={1} />;
            case 'bag': return <ShoppingBag size={120} color={bodyColor} strokeWidth={1} />;
            case 'boots': return <Footprints size={120} color={bodyColor} strokeWidth={1} />;
            default: return <Layers size={120} color={bodyColor} strokeWidth={1} />;
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8">
            <div className="relative mb-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <ProductIcon />
                <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                    <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: bodyColor }} />
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{productType} Preview</h3>
            <p className="text-center max-w-xs text-sm text-gray-500 mb-6">
                3D rendering is unavailable on this device. Showing simplified 2D preview.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                <AlertTriangle size={14} />
                <span>WebGL Disabled</span>
            </div>
        </div>
    );
}

export default function Product3DViewer({ productType, config, zoom = 1, rotation = 0, onPartClick }) {
    const [animationPhase, setAnimationPhase] = useState(0)
    const [currentProduct, setCurrentProduct] = useState(productType)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Transition Logic
    useEffect(() => {
        if (productType !== currentProduct) {
            setIsTransitioning(true)
            setAnimationPhase(0)
            const timer = setTimeout(() => {
                setCurrentProduct(productType)
                // Entrance
                let phase = 0
                const interval = setInterval(() => {
                    phase += 0.08
                    if (phase >= 1) {
                        setAnimationPhase(1)
                        setIsTransitioning(false)
                        clearInterval(interval)
                    } else {
                        setAnimationPhase(phase)
                    }
                }, 20)
            }, 350)
            return () => clearTimeout(timer)
        }
    }, [productType, currentProduct])

    useEffect(() => {
        setAnimationPhase(1); // Immediate start for initial render
    }, [])

    return (
        <div className="w-full h-full relative bg-gradient-to-b from-gray-50 to-gray-200">
            <WebGLErrorBoundary fallback={<FallbackPreview productType={productType} config={config} />}>
                <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[8, 8, 8]} angle={0.18} penumbra={1} intensity={1.4} castShadow />

                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 4, tension: 1200 }}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                    >
                        <group scale={zoom}>
                            <ProductModel
                                productType={currentProduct}
                                config={config}
                                animationPhase={animationPhase}
                                onPartClick={onPartClick}
                            />
                        </group>
                    </PresentationControls>

                    <ContactShadows position={[0, -1.4, 0]} opacity={0.55} scale={5} blur={2.2} far={4} color="#000000" />
                    <Environment preset="studio" />
                </Canvas>
            </WebGLErrorBoundary>
            <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Interactive 3D Preview • Click parts to edit</p>
            </div>
        </div>
    )
}
