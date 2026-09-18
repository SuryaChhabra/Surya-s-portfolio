"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Nebula } from "./Nebula";

const span = (t: number, from: number, to: number) =>
  THREE.MathUtils.clamp((t - from) / (to - from), 0, 1);
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * The burst assigns a colour to each section. That is the whole idea: the
 * site's palette is not decoration applied afterwards, it is what came out
 * of the prism, and every section carries the wavelength it was given.
 */
export const SECTIONS = [
  { id: "video", label: "Video", color: "#ff4d8d", angle: 90 },
  { id: "research", label: "Research", color: "#22d3ee", angle: 30 },
  { id: "built", label: "Built", color: "#9b7bff", angle: -30 },
  { id: "sport", label: "Sport", color: "#f5b301", angle: -90 },
  { id: "events", label: "Events", color: "#2fd8a4", angle: -150 },
  { id: "about", label: "About", color: "#ff8a2b", angle: 150 },
];

type Props = { progress: React.RefObject<number> };

export function BurstScene({ progress }: Props) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 11], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 6]} intensity={40} />
      <Nebula progress={progress} />
      <Burst progress={progress} />
    </Canvas>
  );
}

function Burst({ progress }: Props) {
  const prism = useRef<THREE.Mesh>(null);
  const beam = useRef<THREE.Mesh>(null);
  const rays = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const [landed, setLanded] = useState(false);

  const RADIUS = 4.3;

  /* Where each ray ends — the node that carries the section's colour. */
  const nodes = useMemo(
    () =>
      SECTIONS.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        return {
          ...s,
          rad,
          x: Math.cos(rad) * RADIUS,
          y: Math.sin(rad) * RADIUS,
        };
      }),
    [],
  );

  useFrame((state) => {
    const t = progress.current ?? 0;
    const time = state.clock.elapsedTime;

    /* The prism turns continuously, faster as the burst builds — the
       revolution is what makes the dispersion feel caused rather than
       decorative. */
    if (prism.current) {
      const spin = span(t, 0, 0.55);
      prism.current.rotation.y = time * (0.25 + spin * 1.6);
      prism.current.rotation.z = Math.PI / 2;
      prism.current.scale.setScalar(
        0.55 + ease(span(t, 0, 0.12)) * 0.5 - span(t, 0.75, 1) * 0.25,
      );
      (prism.current.material as THREE.MeshPhysicalMaterial).opacity =
        0.2 * (1 - span(t, 0.8, 1));
    }

    const arrive = ease(span(t, 0.02, 0.22));
    if (beam.current) {
      beam.current.scale.x = arrive;
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        arrive * (1 - span(t, 0.3, 0.45));
    }

    /* Rays fire outward from the prism, each to its own node. */
    const fire = ease(span(t, 0.25, 0.62));
    if (rays.current) {
      rays.current.children.forEach((child, i) => {
        const bar = (child as THREE.Group).children[0] as THREE.Mesh;
        /* Staggered so it reads as a burst rather than one flat expansion. */
        const local = THREE.MathUtils.clamp(fire * 1.5 - i * 0.07, 0, 1);
        bar.scale.x = local;
        (bar.material as THREE.MeshBasicMaterial).opacity = local * 0.85;
      });
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const local = THREE.MathUtils.clamp(fire * 1.5 - i * 0.07, 0, 1);
        const pulse = 1 + Math.sin(time * 1.8 + i) * 0.1;
        child.scale.setScalar(local * pulse);
      });
    }

    const settled = fire > 0.9;
    if (settled !== landed) setLanded(settled);

    state.camera.position.z = 11 + ease(span(t, 0.4, 1)) * 1.6;
    state.camera.position.x = Math.sin(time * 0.12) * 0.25;
    state.camera.position.y = Math.cos(time * 0.09) * 0.15;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh ref={beam} position={[-4.5, 0, 0]}>
        <boxGeometry args={[9, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>

      <mesh ref={prism}>
        <cylinderGeometry args={[1, 1, 1.05, 3]} />
        <meshPhysicalMaterial
          color="#cfe0ff"
          transparent
          opacity={0.2}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
        />
        <Edges threshold={15} color="#cfe0ff" />
      </mesh>

      {/* Rays: rotated groups, bar offset inside so it grows outward from
          the prism rather than from its own midpoint. */}
      <group ref={rays}>
        {nodes.map((n) => (
          <group key={n.id} rotation={[0, 0, n.rad]}>
            <mesh position={[RADIUS / 2, 0, 0]}>
              <boxGeometry args={[RADIUS, 0.035, 0.01]} />
              <meshBasicMaterial color={n.color} transparent opacity={0} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Nodes and labels live outside the rotation. Putting them inside meant
          the DOM label inherited the ray's angle and came out upside down —
          CSS rotates clockwise, three.js counter-clockwise, so cancelling it
          in CSS doubled the rotation instead. */}
      <group ref={nodesRef}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, 0]} scale={0}>
            <sphereGeometry args={[0.17, 20, 20]} />
            <meshBasicMaterial color={n.color} />
            {landed ? (
              <Html
                center
                distanceFactor={12}
                style={{
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  transform: "translateY(-28px)",
                  font: "600 15px/1 system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  color: n.color,
                  textShadow: "0 1px 10px rgba(0,0,0,0.9)",
                }}
              >
                {n.label}
              </Html>
            ) : null}
          </mesh>
        ))}
      </group>
    </>
  );
}
