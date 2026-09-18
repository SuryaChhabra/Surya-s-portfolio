"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A soft radial falloff, drawn once and reused by every cloud. */
function useCloudTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,0.85)");
    g.addColorStop(0.35, "rgba(255,255,255,0.28)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

const CLOUDS: { color: string; position: [number, number, number]; scale: number }[] = [
  { color: "#3a1f6b", position: [-7, 2.5, -14], scale: 17 },
  { color: "#0d4b63", position: [6.5, -1.5, -16], scale: 20 },
  { color: "#6b1f4a", position: [1.5, 4.5, -19], scale: 15 },
  { color: "#1f3a6b", position: [-3, -4, -12], scale: 13 },
];

/**
 * Deep-field backdrop: a few large additive clouds plus a parallaxing star
 * field. Cheap by design — sprites with a shared gradient texture rather
 * than a volumetric shader, which would cost far more than it is worth
 * behind a foreground that carries the actual meaning.
 */
export function Nebula({ progress }: { progress: React.RefObject<number> }) {
  const texture = useCloudTexture();
  const clouds = useRef<THREE.Group>(null);
  const stars = useRef<THREE.Points>(null);

  const starGeometry = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      /* Spread across a slab deep enough to parallax convincingly. */
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = -Math.random() * 40 - 4;
      sizes[i] = Math.random() * 0.06 + 0.015;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  useFrame((state) => {
    const t = progress.current ?? 0;
    const time = state.clock.elapsedTime;

    if (clouds.current) {
      clouds.current.rotation.z = time * 0.008;
      /* Drifts forward slightly as you scroll, so the field has depth. */
      clouds.current.position.z = t * 3;
      clouds.current.children.forEach((c, i) => {
        const s = c as THREE.Sprite;
        s.material.opacity = 0.26 + Math.sin(time * 0.25 + i) * 0.05;
      });
    }

    if (stars.current) {
      stars.current.rotation.y = time * 0.006;
      stars.current.position.z = t * 6;
    }
  });

  return (
    <group>
      <points ref={stars} geometry={starGeometry}>
        <pointsMaterial
          size={0.055}
          sizeAttenuation
          color="#cfe3ff"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <group ref={clouds}>
        {CLOUDS.map((c, i) => (
          <sprite key={i} position={c.position} scale={[c.scale, c.scale, 1]}>
            <spriteMaterial
              map={texture}
              color={c.color}
              transparent
              opacity={0.26}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
