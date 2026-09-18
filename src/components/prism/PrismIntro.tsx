"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Nebula } from "./Nebula";
import { GlassPrism } from "./GlassPrism";
import { SpectrumFan } from "./SpectrumFan";

type Props = {
  progress: React.RefObject<number>;
  active: React.RefObject<number>;
};

export function PrismIntro({ progress, active }: Props) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[-6, 3, 5]} intensity={2.4} />
      <pointLight position={[4, -2, 4]} intensity={30} color="#9fd7ff" />

      {/* Glass needs something to refract. Light cards are rendered locally,
          so nothing is fetched and the scene still has an environment. */}
      <Environment resolution={160}>
        <Lightformer position={[-7, 1, 3]} scale={[6, 10, 1]} intensity={7} color="#ffffff" />
        <Lightformer position={[6, 4, 2]} scale={[7, 6, 1]} intensity={3} color="#bfe2ff" />
        <Lightformer position={[0, -6, 4]} scale={[10, 4, 1]} intensity={2.2} color="#ffd6ea" />
        <Lightformer position={[0, 0, -6]} scale={[12, 12, 1]} intensity={1.4} color="#7c8cff" />
      </Environment>

      <Nebula progress={progress} />
      <Stage progress={progress} active={active} />
    </Canvas>
  );
}

function Stage({ progress, active }: Props) {
  const prism = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = progress.current ?? 0;
    const time = state.clock.elapsedTime;

    if (prism.current) {
      /* A slow, continuous turn. The prism is the subject, so it stays large
         and centred and simply rotates — it never shrinks out of the way. */
      prism.current.rotation.y = -0.35 + time * 0.12 + t * 0.9;
      prism.current.rotation.x = Math.sin(time * 0.18) * 0.05;
      prism.current.rotation.z = Math.sin(time * 0.13) * 0.03;
    }

    if (beam.current) {
      const arrive = THREE.MathUtils.clamp(t / 0.12, 0, 1);
      beam.current.scale.x = arrive;
      (beam.current.material as THREE.MeshBasicMaterial).opacity = arrive * 0.9;
    }

    /* Barely-there drift so the frame never feels locked. */
    state.camera.position.x = -0.4 + Math.sin(time * 0.1) * 0.18;
    state.camera.position.y = Math.cos(time * 0.08) * 0.12;
    state.camera.lookAt(0.3, 0, 0);
  });

  return (
    <>
      {/* Incoming white beam, pivoting from off-screen left */}
      <group position={[-9, 0.55, 0]}>
        <mesh ref={beam} position={[4.6, 0, 0]}>
          <planeGeometry args={[9.2, 0.055]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={prism} position={[-0.6, 0, 0]}>
        <GlassPrism size={3.4} depth={2.4} />
      </group>

      <SpectrumFan progress={progress} active={active} />
    </>
  );
}
