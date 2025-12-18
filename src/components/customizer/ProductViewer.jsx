import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, Outlines, Environment } from '@react-three/drei';
import { useConfiguratorStore } from '../../store/ConfiguratorStore';
import * as THREE from 'three';
import { gsap } from 'gsap';

function CameraController() {
    const { camera, controls } = useThree();
    const currentView = useConfiguratorStore(state => state.currentView);

    useEffect(() => {
        let targetPos = new THREE.Vector3(0, 0, 4.5);
        let targetLook = new THREE.Vector3(0, 0, 0);

        // Define View Presets
        switch (currentView) {
            case 'back':
                targetPos.set(0, 0, -4.5);
                break;
            case 'side':
                targetPos.set(4, 0, 0);
                break;
            case 'interior':
                targetPos.set(0, 0.5, 1); // Zoom in
                break;
            case 'detail':
                targetPos.set(0, 1, 2); // Zoom to detail
                break;
            case 'front':
            default:
                targetPos.set(0, 0, 4.5);
                break;
        }

        // Animate Camera
        gsap.to(camera.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1,
            ease: "power2.inOut"
        });

    }, [currentView, camera]);

    return null;
}

function SelectableMesh({ child, color, selected, onClick }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (hovered) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
    });

    return (
        <mesh
            ref={meshRef}
            geometry={child.geometry}
            material={child.material.clone()} // Clone to avoid sharing materials across unrelated meshes
            position={child.position}
            rotation={child.rotation}
            scale={child.scale}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { setHovered(false); }}
            onClick={(e) => { e.stopPropagation(); onClick(child.name); }}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                color={selected ? '#D4AF37' : (hovered ? new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.1) : color)}
                roughness={0.4}
                metalness={0.2}
            />
            {/* Outline when selected or hovered */}
            {(selected || hovered) && <Outlines thickness={0.05} color={selected ? "#D4AF37" : "white"} />}
        </mesh>
    );
}

function Model({ url, color }) {
    const { scene } = useGLTF(url);
    const [meshes, setMeshes] = useState([]);
    const { selectedPart, updateConfig } = useConfiguratorStore();

    useEffect(() => {
        const foundMeshes = [];
        scene.traverse((child) => {
            if (child.isMesh) {
                foundMeshes.push(child);
            }
        });
        setMeshes(foundMeshes);
    }, [scene]);

    // If no meshes found (e.g. empty GLB), fail gracefully
    if (meshes.length === 0) return <primitive object={scene} />;

    return (
        <group dispose={null}>
            {meshes.map((child, i) => (
                <SelectableMesh
                    key={i}
                    child={child}
                    color={color} // In real app, we'd map parts to specific colors from config
                    selected={selectedPart === child.name}
                    onClick={(name) => updateConfig('selectedPart', name)}
                />
            ))}
        </group>
    );
}

function PlaceholderBag() {
    const { config: currentConfig, updateConfig } = useConfiguratorStore();
    // A more complex placeholder to demonstrate selection
    return (
        <group>
            {/* Body */}
            <mesh
                position={[0, 0, 0]}
                onClick={(e) => { e.stopPropagation(); updateConfig('selectedPart', 'Body') }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <boxGeometry args={[2, 2.5, 1]} />
                <meshStandardMaterial color={currentConfig.selectedPart === 'Body' ? '#D4AF37' : currentConfig.color} />
                {currentConfig.selectedPart === 'Body' && <Outlines thickness={0.05} color="#D4AF37" />}
            </mesh>

            {/* Handle L */}
            <mesh
                position={[-0.5, 1.8, 0]}
                onClick={(e) => { e.stopPropagation(); updateConfig('selectedPart', 'Handle_L') }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                <meshStandardMaterial color={currentConfig.selectedPart === 'Handle_L' ? '#D4AF37' : '#333'} />
                {currentConfig.selectedPart === 'Handle_L' && <Outlines thickness={0.05} color="#D4AF37" />}
            </mesh>
            {/* Handle R */}
            <mesh
                position={[0.5, 1.8, 0]}
                onClick={(e) => { e.stopPropagation(); updateConfig('selectedPart', 'Handle_R') }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                <meshStandardMaterial color={currentConfig.selectedPart === 'Handle_R' ? '#D4AF37' : '#333'} />
                {currentConfig.selectedPart === 'Handle_R' && <Outlines thickness={0.05} color="#D4AF37" />}
            </mesh>

            {/* Floating Label for Selected Part */}
            {currentConfig.selectedPart && (
                <Html position={[0, -2, 0]} center>
                    <div className="px-3 py-1 bg-black/80 rounded-full border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        Selected: {currentConfig.selectedPart}
                    </div>
                </Html>
            )}
        </group>
    );
}

export default function ProductViewer() {
    const { config: currentConfig, productInfo } = useConfiguratorStore();

    // Determine if we should show GLTF or Placeholder
    // For now, defaulting to placeholder to demonstrate the complex selection logic without needing a specific GLB file
    // In production, check productInfo.modelUrl
    const modelType = productInfo.modelUrl ? 'gltf' : 'placeholder';

    return (
        // Canvas is handled by parent Customizer.jsx now for cleaner separation
        <>
            {/* Lighting Setup */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />

            {/* Configurable Model */}
            {/* Forcing Placeholder for demo since we don't have a segmented GLB uploaded yet */}
            <PlaceholderBag />

            {/* If we had a GLB:
            <Model url={productInfo.modelUrl} color={currentConfig.color} /> 
            */}
        </>
    );
}
