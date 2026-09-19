"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BANDS } from "./bands";

/** Soft-edged streak: bright at the prism, fading out along its length. */
function useStreakTexture() {
  return useMemo(() => {
    const w = 256;
    const h = 64;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    /* Along the beam: intense at the exit face, falling away. */
    const along = ctx.createLinearGradient(0, 0, w, 0);
    along.addColorStop(0, "rgba(255,255,255,1)");
    along.addColorStop(0.25, "rgba(255,255,255,0.85)");
    along.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = along;
    ctx.fillRect(0, 0, w, h);

    /* Across the beam: soft edges, so neighbouring bands blend into one
       continuous rainbow rather than reading as separate bars. */
    const across = ctx.createLinearGradient(0, 0, 0, h);
    across.addColorStop(0, "rgba(0,0,0,1)");
    across.addColorStop(0.5, "rgba(0,0,0,0)");
    across.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = across;
    ctx.fillRect(0, 0, w, h);

    return new THREE.CanvasTexture(canvas);
  }, []);
}

type Props = {
  progress: React.RefObject<number>;
  /** Which band the scroll is currently on. */
  active: React.RefObject<number>;
  /** The glass's current rotation about Y, in radians. */
  spin?: React.RefObject<number>;
  length?: number;
};

/* Half the prism's on-screen width as it turns: the triangle is 3.6 across
   and 1.9 deep, so the silhouette narrows to roughly the depth when it goes
   edge-on and the exit edge travels a long way in. */
function exitX(spin: number) {
  return 2 + Math.abs(Math.cos(spin)) * 1.75 + Math.abs(Math.sin(spin)) * 0.95 - 0.5;
}

export function SpectrumFan({ progress, active, spin, length = 9.5 }: Props) {
  const texture = useStreakTexture();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = progress.current ?? 0;
    const current = active.current ?? 0;
    const time = state.clock.elapsedTime;

    /* The fan opens once the beam is through the glass. */
    const emerge = THREE.MathUtils.clamp((t - 0.18) / 0.32, 0, 1);
    /* At the end every wavelength is out at full strength: the spectrum is
       complete before the page hands over to the sections. */
    const flood = THREE.MathUtils.clamp((t - 0.82) / 0.18, 0, 1);

    /* Follow the exit edge, or the rainbow detaches from the glass every
       time the prism turns far enough to change its silhouette. */
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        exitX(spin?.current ?? 0),
        0.2,
      );
    }

    group.current?.children.forEach((child, i) => {
      const pivot = child as THREE.Group;
      const mesh = pivot.children[0] as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;

      /* Every band is present once the light is through — the active one
         simply burns brighter, so the spectrum stays whole while the scroll
         picks out which wavelength is speaking. */
      const focus = THREE.MathUtils.lerp(i === current ? 1 : 0.28, 1, flood);
      const shimmer = 1 + Math.sin(time * 1.4 + i * 0.7) * 0.06;
      mat.opacity = emerge * focus * shimmer;

      /* Rotate the pivot, not the plane: the plane sits offset inside it, so
         the band swings from the glass rather than about its own midpoint. */
      const spread = THREE.MathUtils.lerp(0.25, 1, emerge);
      pivot.rotation.z = THREE.MathUtils.degToRad(BANDS[i].angle) * spread;
      pivot.scale.setScalar(1 + flood * 0.35);
    });
  });

  return (
    <group ref={group} position={[3.05, 0.6, 0]}>
      {BANDS.map((b) => (
        /* Pivot sits at the exit face; the plane is offset half its length
           inside it, so the fan opens from the glass. */
        <group key={b.id}>
          <mesh position={[length / 2, 0, 0]}>
            <planeGeometry args={[length, 0.62]} />
            <meshBasicMaterial
              map={texture}
              color={b.color}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
