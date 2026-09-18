"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { buildStars, EDGES, SPECTRUM, type Star } from "./constellation";

/* The scroll is divided into four beats. Each returns 0→1 within its own
   span so the pieces can be animated independently. */
const span = (t: number, from: number, to: number) =>
  THREE.MathUtils.clamp((t - from) / (to - from), 0, 1);

const ease = (x: number) => 1 - Math.pow(1 - x, 3);

type Props = { progress: React.RefObject<number> };

export function PrismScene({ progress }: Props) {
  const stars = useMemo(buildStars, []);

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 6]} intensity={60} />
      <Scene stars={stars} progress={progress} />
    </Canvas>
  );
}

function Scene({
  stars,
  progress,
}: {
  stars: Star[];
  progress: React.RefObject<number>;
}) {
  const beam = useRef<THREE.Mesh>(null);
  const prism = useRef<THREE.Mesh>(null);
  const fan = useRef<THREE.Group>(null);
  const points = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  /* Labels are DOM, so they ignore the mesh scale and were visible from the
     first frame. They get their own gate. */
  const [labelled, setLabelled] = useState(false);

  /* All constellation segments in one buffer; drawRange reveals them in
     order, which is what makes the lines appear to be drawn. */
  const lineGeometry = useMemo(() => {
    const verts: number[] = [];
    for (const [a, b] of EDGES) {
      verts.push(...stars[a].position, ...stars[b].position);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [stars]);

  useFrame((state) => {
    const t = progress.current ?? 0;

    /* Beat 1 — the beam arrives. */
    const arrive = span(t, 0, 0.18);
    if (beam.current) {
      beam.current.scale.x = ease(arrive);
      beam.current.position.x = -7 + ease(arrive) * 3.5;
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        arrive * (1 - span(t, 0.42, 0.55));
    }

    /* Beat 2 — it hits the prism, which turns to catch the light. */
    const hit = span(t, 0.12, 0.42);
    if (prism.current) {
      prism.current.rotation.z = Math.PI / 2;
      prism.current.rotation.y = -0.6 + hit * 1.2 + state.clock.elapsedTime * 0.08;
      prism.current.scale.setScalar(0.6 + ease(span(t, 0, 0.15)) * 0.4);
      /* Fully out of the way once the constellation takes over. */
      (prism.current.material as THREE.MeshPhysicalMaterial).opacity =
        0.18 * (1 - span(t, 0.5, 0.68));
      prism.current.visible = t < 0.7;
    }

    /* Beat 3 — dispersion fans out, then hands off to the stars. */
    const split = ease(span(t, 0.2, 0.5));
    const retire = span(t, 0.5, 0.68);
    if (fan.current) {
      fan.current.children.forEach((child, i) => {
        const group = child as THREE.Group;
        const spread = (i - (SPECTRUM.length - 1) / 2) * 0.115;
        group.rotation.z = spread * split;
        group.scale.x = split;
        const mesh = group.children[0] as THREE.Mesh;
        (mesh.material as THREE.MeshBasicMaterial).opacity =
          split * (1 - retire) * 0.9;
      });
    }

    /* Beat 4 — the spectrum resolves into scattered points, which then join. */
    const settle = ease(span(t, 0.5, 0.78));
    const wantLabels = settle > 0.55;
    if (wantLabels !== labelled) setLabelled(wantLabels);
    if (points.current) {
      points.current.children.forEach((child, i) => {
        const star = stars[i];
        const [x, y, z] = star.position;
        /* Points begin on the fan's arc and travel to their final place. */
        const angle = (i - (stars.length - 1) / 2) * 0.13;
        const fx = 1.5 + settle * 0;
        const startX = fx + Math.cos(angle) * 4;
        const startY = Math.sin(angle) * 4;
        child.position.set(
          THREE.MathUtils.lerp(startX, x, settle),
          THREE.MathUtils.lerp(startY, y, settle),
          THREE.MathUtils.lerp(0, z, settle),
        );
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6 + i) * 0.08;
        child.scale.setScalar(settle * pulse);
      });
    }

    if (lines.current) {
      const draw = span(t, 0.72, 0.98);
      const total = EDGES.length * 2;
      lineGeometry.setDrawRange(0, Math.floor(ease(draw) * total));
      (lines.current.material as THREE.LineBasicMaterial).opacity = draw > 0 ? 0.7 : 0;
    }

    /* Pull BACK as the figure completes so the whole shape fits — moving
       toward the scene zoomed in and threw the outer stars off-screen. */
    state.camera.position.z = 12 + ease(span(t, 0.5, 1)) * 3.2;
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Incoming white light */}
      <mesh ref={beam} position={[-7, 0, 0]}>
        <boxGeometry args={[7, 0.045, 0.045]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>

      {/* The prism: a triangular column, glassy enough to read as one */}
      <mesh ref={prism} position={[-1.2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 1.1, 3]} />
        <meshPhysicalMaterial
          color="#cfe0ff"
          transparent
          opacity={0.18}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
        />
        {/* Real transmission needs a render target to refract; an edge read
            gives the glass silhouette far more cheaply and reliably. */}
        <Edges threshold={15} color="#bcd4ff" />
      </mesh>

      {/* Dispersion */}
      <group ref={fan} position={[-0.2, 0, 0]}>
        {SPECTRUM.map((c, i) => (
          /* Group sits at the exit point; the bar is offset inside it, so
             rotation fans from the prism instead of crossing over itself. */
          <group key={c}>
            <mesh position={[3.5, 0, -i * 0.012]}>
              <boxGeometry args={[7, 0.045, 0.01]} />
              <meshBasicMaterial color={c} transparent opacity={0} />
            </mesh>
          </group>
        ))}
      </group>

      {/* The work, as points of light */}
      <group ref={points} position={[0.9, 0, 0]} scale={0.92}>
        {stars.map((s) => (
          <mesh key={s.id} scale={0}>
            <sphereGeometry args={[0.13, 20, 20]} />
            <meshBasicMaterial color={s.color} />
            {labelled ? (
            <Html
              center
              distanceFactor={13}
              style={{
                pointerEvents: "none",
                whiteSpace: "nowrap",
                transform: "translateY(-22px)",
                font: "500 13px/1.2 system-ui, sans-serif",
                color: "rgba(255,255,255,0.86)",
                textShadow: "0 1px 6px rgba(0,0,0,0.8)",
              }}
            >
              {s.title}
            </Html>
            ) : null}
          </mesh>
        ))}
      </group>

      <lineSegments ref={lines} geometry={lineGeometry} position={[0.9, 0, 0]} scale={0.92}>
        <lineBasicMaterial color="#9fd7ff" transparent opacity={0} />
      </lineSegments>
    </>
  );
}
