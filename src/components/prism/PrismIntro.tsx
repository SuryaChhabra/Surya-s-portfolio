"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Nebula } from "./Nebula";
import { GlassPrism } from "./GlassPrism";
import { SpectrumFan } from "./SpectrumFan";

type Props = {
  progress: React.RefObject<number>;
  active: React.RefObject<number>;
  /** False once the frame has scrolled away — the scene then stops rendering. */
  pinned?: boolean;
  /** Phones: fewer pixels and a cheaper refraction pass. */
  lite?: boolean;
};

export function PrismIntro({ progress, active, pinned = true, lite = false }: Props) {
  return (
    <Canvas
      dpr={lite ? [1, 1.3] : [1, 1.7]}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      /* Transmission is the most expensive thing here, so it renders only
         while the frame is actually on screen. */
      frameloop={pinned ? "always" : "demand"}
      style={{ position: "absolute", inset: 0 }}
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
        {/* Directly behind the glass, so there is something bright to
            transmit. Without it the prism refracts empty space and reads
            as a black slab however good the material is. */}
        <Lightformer position={[2, 1, -5]} scale={[7, 7, 1]} intensity={4.5} color="#dce9ff" />
      </Environment>

      <Nebula progress={progress} />
      <Stage progress={progress} active={active} lite={lite} />
    </Canvas>
  );
}

function Stage({ progress, active, lite = false }: Props) {
  const prism = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  /* Where the glass currently faces, so the spectrum can leave from its
     actual exit edge rather than from a point it no longer occupies. */
  const spinRef = useRef(0);
  const beamTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 4;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.86, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 4);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const t = progress.current ?? 0;
    const time = state.clock.elapsedTime;

    /* Beam, glass and spectrum are one rigid arrangement, so the whole thing
       is placed rather than each piece. On a wide screen the glass sits in
       the right third with the copy beside it; on a phone there is no right
       third, so it moves up and shrinks and the copy goes underneath. */
    const narrow = state.size.width < 820;

    /* Nothing in the arrangement moves for a phone. Both scaling it and
       sliding it left flare the glass to flat white: transmission thickness
       is in world units so it does not scale with the mesh, and the key light
       is a large card off to the left, so walking the prism towards it turns
       the whole face into a mirror. Re-framing is the camera's job. */

    /* The glow is placed rather than carried, because scaling the whole
       arrangement would drag it in behind the glass — close enough that the
       transmission pass reads pure white and the prism stops looking like
       glass at all. It follows the glass; it does not shrink with it. */
    if (glow.current) {
      glow.current.position.set(1.9, 0.6, -5);
    }

    if (prism.current) {
      /* The scroll turns the glass — that is the whole gesture, so most of
         the turn is driven by scroll position. It covers about 150 degrees:
         it passes edge-on partway through and comes back to a full triangle,
         so the turn reads as a turn rather than an ease and never parks on
         the flat view. The clock keeps it moving while nobody is scrolling.

         The turn finishes at 40% of the act. Everything after it is
         consequence: the light comes out, the words step aside, the glass
         backs off, the page moves on. Running the turn the full length —
         which it once did — meant the glass was still rotating while the
         spectrum flooded and while the frame handed over, three things
         landing at once on the last pixel of scroll anybody had a reason
         to spend. */
      const turn = Math.min(1, t / 0.4);
      const spin = -0.55 + turn * 3.4 + time * 0.09;
      prism.current.rotation.y = spin;
      spinRef.current = spin;
      prism.current.rotation.x = Math.sin(time * 0.18) * 0.05;
      prism.current.rotation.z = -0.06 + Math.sin(time * 0.13) * 0.03;

      /* Once the light is out the glass has done its job: it drifts back
         and thins out so the spectrum, not the object, is the last thing
         seen — and so the shrinking happens while the first section is
         already rising into the frame beneath it, rather than after. */
      const exit = THREE.MathUtils.clamp((t - 0.72) / 0.28, 0, 1);
      prism.current.position.z = -exit * 3.2;
      prism.current.scale.setScalar(1 - exit * 0.18);
    }

    if (beam.current) {
      const arrive = THREE.MathUtils.clamp((t - 0.03) / 0.12, 0, 1);
      beam.current.scale.x = Math.max(arrive, 0.0001);
      (beam.current.material as THREE.MeshBasicMaterial).opacity = arrive * 0.9;
    }

    /* Barely-there drift so the frame never feels locked. On a phone the
       camera pulls back and squares up on the glass instead: the arrangement
       itself never moves, because walking the prism towards the key light —
       a large card off to the left — turns its whole face into a mirror and
       it stops reading as glass at all. */
    state.camera.position.x =
      (narrow ? 2.05 : -0.4) + Math.sin(time * 0.1) * 0.18;
    state.camera.position.y =
      (narrow ? -2.85 : 0) + Math.cos(time * 0.08) * 0.12;
    state.camera.position.z = narrow ? 16.5 : 9.5;
    state.camera.lookAt(narrow ? 2 : 0.3, narrow ? -2.85 : 0, 0);
  });

  return (
    <>
      {/* What the glass is actually looking at: without something bright
          behind it, the prism refracts empty space and reads as a black slab
          however good the material is. */}
      <Glow meshRef={glow} />

      <group>
      {/* Incoming white beam, pivoting from off-screen left */}
      <group position={[-9, 1.55, 0]}>
        <mesh ref={beam} position={[5.3, 0, 0]}>
          <planeGeometry args={[10.6, 0.055]} />
          {/* The tip fades rather than stopping: a hard end shows up as a
              bright stub through the glass from some angles. */}
          <meshBasicMaterial
            map={beamTexture}
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={prism} position={[2, 0.3, 0]}>
        <GlassPrism size={3.6} depth={1.9} lite={lite} />
      </group>

      <SpectrumFan progress={progress} active={active} spin={spinRef} />
      </group>
    </>
  );
}

/** A soft additive disc sitting behind the prism, for the glass to carry. */
function Glow({ meshRef }: { meshRef: React.RefObject<THREE.Mesh | null> }) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.3, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh ref={meshRef} position={[1.9, 0.6, -5]}>
      <planeGeometry args={[11, 11]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.5}
        color="#b9d4ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
