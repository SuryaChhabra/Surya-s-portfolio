"use client";

import { useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { SHAPE_COLORS, type ShapeColor } from "./palette";

export type ShapeKind = "blob" | "capsule" | "torus" | "box" | "knot";

export type ShapeSpec = {
  kind: ShapeKind;
  color: ShapeColor;
  /** Resting position in world space. */
  position: [number, number, number];
  scale: number;
  /** Seeds the drift so no two shapes move in phase. */
  seed: number;
};

type Props = {
  spec: ShapeSpec;
  /** When true the shape holds still (prefers-reduced-motion). */
  still: boolean;
  onGrab: (grabbed: boolean) => void;
};

/* Spring constants for the squash-and-release when a shape is poked. */
const STIFFNESS = 170;
const DAMPING = 14;

export function Shape({ spec, still, onGrab }: Props) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  /* Requests a repaint while the render loop is in "demand" mode. */
  const invalidate = useThree((state) => state.invalidate);

  /* Hand-rolled spring: `value` chases `target`, carrying velocity so the
     shape overshoots and settles instead of easing flatly. Kept in a ref so
     it never triggers a React render inside the frame loop. */
  const spring = useRef({ value: 1, velocity: 0, target: 1 });

  /* Extra spin added on click, decaying back to the idle drift. */
  const kick = useRef(0);

  useFrame((state, rawDelta) => {
    const g = group.current;
    if (!g) return;

    /* Clamp delta so a backgrounded tab doesn't explode the spring on return. */
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;

    const s = spring.current;
    s.target = hovered ? 1.18 : 1;

    if (still) {
      /* Reduced motion: hold the resting pose and let hover resize in one
         step, so a single rendered frame is always correct. */
      s.value = s.target;
      s.velocity = 0;
      g.scale.setScalar(spec.scale * s.value);
      g.position.set(...spec.position);
      g.rotation.set(0.4 + spec.seed, spec.seed * 2, 0);
      return;
    }

    const force = (s.target - s.value) * STIFFNESS - s.velocity * DAMPING;
    s.velocity += force * delta;
    s.value += s.velocity * delta;
    g.scale.setScalar(spec.scale * s.value);

    kick.current *= 1 - Math.min(1, delta * 2.2);

    /* Idle drift — three offset sines so the motion never visibly loops. */
    const { seed } = spec;
    g.position.set(
      spec.position[0] + Math.sin(t * 0.34 + seed) * 0.22,
      spec.position[1] + Math.sin(t * 0.47 + seed * 1.7) * 0.3,
      spec.position[2] + Math.cos(t * 0.29 + seed) * 0.18,
    );

    g.rotation.x = t * 0.16 + seed;
    g.rotation.y = t * 0.21 + seed * 2 + kick.current;
  });

  function handlePointerOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setHovered(true);
    onGrab(true);
    invalidate();
  }

  function handlePointerOut() {
    setHovered(false);
    onGrab(false);
    invalidate();
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    /* Punch the spring downward so it squashes, then rebounds past rest. */
    spring.current.velocity -= 9;
    kick.current += 3.4;
    invalidate();
  }

  const color = SHAPE_COLORS[spec.color];

  return (
    <group
      ref={group}
      position={spec.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <Geometry kind={spec.kind} color={color} />
    </group>
  );
}

function Geometry({ kind, color }: { kind: ShapeKind; color: string }) {
  /* Glossy, slightly translucent "candy clay": high clearcoat over a soft
     base, so the coloured lights read as highlights on a rounded surface. */
  const material = (
    <meshPhysicalMaterial
      color={color}
      roughness={0.28}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.22}
      sheen={0.6}
      sheenColor={color}
    />
  );

  switch (kind) {
    case "blob":
      return (
        <mesh>
          <icosahedronGeometry args={[1, 24]} />
          {/* Distortion needs dense geometry, hence the high detail above. */}
          <MeshDistortMaterial
            color={color}
            distort={0.34}
            speed={1.6}
            roughness={0.26}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </mesh>
      );
    case "capsule":
      return (
        <mesh>
          <capsuleGeometry args={[0.55, 0.9, 12, 32]} />
          {material}
        </mesh>
      );
    case "torus":
      return (
        <mesh>
          <torusGeometry args={[0.78, 0.3, 24, 64]} />
          {material}
        </mesh>
      );
    case "knot":
      return (
        <mesh>
          <torusKnotGeometry args={[0.62, 0.24, 128, 24]} />
          {material}
        </mesh>
      );
    case "box":
      return (
        <RoundedBox args={[1.25, 1.25, 1.25]} radius={0.34} smoothness={6}>
          {material}
        </RoundedBox>
      );
  }
}
