"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Shape, type ShapeSpec } from "./Shape";

/* The cluster sits in the right-hand third of the frame. The headline owns the
   left, and shapes drifting over type is the fastest way to make a hero
   unreadable — so every resting position here clears the text column, with
   margin left over for the drift in Shape.tsx. */
const SHAPES: ShapeSpec[] = [
  { kind: "blob", color: "coral", position: [3.35, 0.75, 0], scale: 1.15, seed: 0.0 },
  { kind: "knot", color: "violet", position: [1.9, 2.4, -0.9], scale: 0.58, seed: 1.4 },
  { kind: "capsule", color: "mint", position: [4.95, -0.5, -0.7], scale: 0.76, seed: 2.7 },
  { kind: "torus", color: "butter", position: [2.45, -2.1, 0.45], scale: 0.78, seed: 3.9 },
  { kind: "box", color: "pink", position: [5.6, -2.55, -2.2], scale: 0.6, seed: 5.1 },
  { kind: "blob", color: "cyan", position: [1.6, -0.75, -2.7], scale: 0.5, seed: 6.3 },
];

/* Portrait screens are far narrower in world units, so the desktop cluster
   would sit straight on top of the copy. Phones get their own arrangement,
   tucked into the empty band above the headline and below the buttons. */
const COMPACT_SHAPES: ShapeSpec[] = [
  { kind: "blob", color: "coral", position: [0.8, 2.45, -0.4], scale: 0.62, seed: 0.0 },
  { kind: "knot", color: "violet", position: [-0.95, 2.85, -1.1], scale: 0.4, seed: 1.4 },
  { kind: "capsule", color: "mint", position: [1.0, -2.8, -0.9], scale: 0.46, seed: 2.7 },
  { kind: "torus", color: "butter", position: [-1.0, -3.15, -1.6], scale: 0.38, seed: 3.9 },
];

type Props = {
  still: boolean;
  compact: boolean;
  /** False when the hero is scrolled out of view — stops the render loop. */
  active: boolean;
  onHoverChange: (hovering: boolean) => void;
};

export function ClayScene({ still, compact, active, onHoverChange }: Props) {
  const specs = compact ? COMPACT_SHAPES : SHAPES;

  return (
    <Canvas
      /* Cap DPR: at 3x on a phone this scene is fill-rate bound for no visible gain. */
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      /* "demand" rather than "never": the scene still paints its first frame
         (and repaints on interaction), it just stops running a continuous loop
         when idle off-screen or when motion is disabled. "never" would leave
         reduced-motion visitors staring at an empty canvas. */
      frameloop={active ? "always" : "demand"}
      style={{ pointerEvents: "auto" }}
    >
      <Rig still={still} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 5]} intensity={1.5} />
      <pointLight position={[-6, 2, 4]} intensity={90} color="#7c5cff" distance={22} />
      <pointLight position={[6, -3, 3]} intensity={70} color="#ff5e3a" distance={22} />

      {/* Reflections come from light cards rendered locally — no HDRI is
          fetched, so the scene works offline and adds no network cost. */}
      <Environment resolution={192}>
        <Lightformer position={[0, 4, -6]} scale={[10, 6, 1]} intensity={2.2} color="#fff4e6" />
        <Lightformer position={[-5, -1, 3]} scale={[6, 6, 1]} intensity={1.4} color="#22d3ee" />
        <Lightformer position={[5, 2, 3]} scale={[6, 6, 1]} intensity={1.4} color="#ff4d8d" />
      </Environment>

      <group>
        {specs.map((spec, i) => (
          <Shape
            key={i}
            spec={spec}
            still={still}
            onGrab={onHoverChange}
          />
        ))}
      </group>
    </Canvas>
  );
}

/** Leans the camera toward the pointer, for parallax against the headline. */
function Rig({ still }: { still: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 9));

  useFrame((state, rawDelta) => {
    if (still) return;
    const delta = Math.min(rawDelta, 0.05);

    target.current.set(
      state.pointer.x * 1.15,
      state.pointer.y * 0.7,
      9,
    );
    /* Frame-rate independent damping toward the target. */
    camera.position.lerp(target.current, 1 - Math.pow(0.0015, delta));
    camera.lookAt(0, 0, 0);
  });

  return null;
}
