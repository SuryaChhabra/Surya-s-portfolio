"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * A solid triangular prism built from an extruded, bevelled triangle rather
 * than a 3-sided cylinder. The bevel is what sells it: real glass catches
 * light along every edge, and a hard-edged extrusion reads as a flat shape
 * no matter how good the material is.
 */
export function GlassPrism({ size = 2.6, depth = 1.9 }: { size?: number; depth?: number }) {
  const geometry = useMemo(() => {
    const h = size * Math.sqrt(3) / 2;
    const shape = new THREE.Shape();
    shape.moveTo(0, h * (2 / 3));
    shape.lineTo(-size / 2, -h / 3);
    shape.lineTo(size / 2, -h / 3);
    shape.closePath();

    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.045,
      bevelSegments: 3,
      curveSegments: 1,
    });
    g.center();
    return g;
  }, [size, depth]);

  return (
    <mesh geometry={geometry}>
      {/* Real refraction needs a render target; this is the one object on the
          page worth spending it on. Samples kept low — the effect is in the
          distortion and the edges, not in sample count. */}
      <MeshTransmissionMaterial
        samples={6}
        resolution={256}
        transmission={1}
        thickness={1.6}
        ior={1.62}
        chromaticAberration={0.35}
        anisotropy={0.2}
        roughness={0.02}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.05}
        clearcoat={1}
        attenuationDistance={12}
        attenuationColor="#f2f7ff"
        color="#ffffff"
      />
    </mesh>
  );
}
