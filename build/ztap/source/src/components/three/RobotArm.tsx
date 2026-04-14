'use client';

import { useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ── Match fr5.png: white painted polymer body, yellow joint rings ──────────
const MAT_BODY = new THREE.MeshPhysicalMaterial({
  color:              new THREE.Color('#F5F5F3'),
  metalness:          0.0,
  roughness:          0.22,
  clearcoat:          0.8,
  clearcoatRoughness: 0.12,
  reflectivity:       0.3,
});
const MAT_RING = new THREE.MeshPhysicalMaterial({
  color:              new THREE.Color('#FECE00'),
  metalness:          0.0,
  roughness:          0.30,
  clearcoat:          0.6,
  clearcoatRoughness: 0.15,
});

// Flat disc = joint ring (thin in one axis)
function isRing(geo: THREE.BufferGeometry): boolean {
  geo.computeBoundingBox();
  const s = new THREE.Vector3();
  geo.boundingBox!.getSize(s);
  const d = [s.x, s.y, s.z].sort((a, b) => a - b);
  return d[2] > 0.002 && d[0] / d[2] < 0.14;
}

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
    gl.toneMapping        = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
  }, [gl]);
  return null;
}

function ArmModel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scene: src } = useGLTF('/fr5.glb');
  const rootRef = useRef<THREE.Group>(null!);

  const scene = useMemo(() => {
    const clone = src.clone(true);
    clone.traverse((n) => {
      if (!(n instanceof THREE.Mesh)) return;
      n.geometry.computeVertexNormals();
      n.material      = isRing(n.geometry) ? MAT_RING : MAT_BODY;
      n.castShadow    = true;
      n.receiveShadow = true;
    });
    return clone;
  }, [src]);

  useFrame((state) => {
    if (!rootRef.current) return;
    const t = state.clock.elapsedTime;
    const e = 1 - Math.pow(1 - Math.min(1, scrollRef.current), 2);
    rootRef.current.rotation.y = e * 0.28 + Math.sin(t * 0.3) * 0.018;
  });

  return (
    // Base rotation to match reference image side-profile pose
    // Y=-1.48 shows the elbow profile; flip is now fixed in the GLB
    <group ref={rootRef} rotation={[0.05, -1.48, 0]} scale={2.0}>
      <primitive object={scene} />
    </group>
  );
}

interface Props {
  scrollRef: React.MutableRefObject<number>;
  style?: React.CSSProperties;
}

export default function RobotArm({ scrollRef, style }: Props) {
  return (
    <Canvas
      style={{ ...style, background: 'transparent' }}
      camera={{ position: [0.3, 0.05, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      shadows="soft"
      dpr={[1.5, 2]}
    >
      <SceneSetup />

      {/* Studio HDRI — clean neutral environment for white plastic */}
      <Environment preset="studio" environmentIntensity={0.9} />

      {/* Key light upper-right matching reference render */}
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      {/* Soft fill from left */}
      <directionalLight position={[-5, 3, 2]}  intensity={0.35} />
      {/* Ground bounce */}
      <directionalLight position={[0, -5, 3]}  intensity={0.12} />

      <Suspense fallback={null}>
        <ArmModel scrollRef={scrollRef} />
      </Suspense>

      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.09}
        scale={5}
        blur={5}
        far={2}
        color="#777777"
      />
    </Canvas>
  );
}

useGLTF.preload('/fr5.glb');
