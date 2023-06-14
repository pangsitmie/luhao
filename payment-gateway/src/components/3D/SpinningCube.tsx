import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const SpinningCube = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxBufferGeometry args={[5, 5, 5]} />
            <meshStandardMaterial color={"gold"} />
        </mesh>
    );
};

