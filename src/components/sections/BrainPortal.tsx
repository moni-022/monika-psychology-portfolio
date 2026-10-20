import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { RotateCcw } from "lucide-react";
import type { Mesh, MeshStandardMaterial } from "three";
import "./BrainPortal.css";

type RegionId =
  "frontal" | "parietal" | "temporal" | "occipital" | "limbic" | "cerebellum";
type Region = {
  id: RegionId;
  name: string;
  short: string;
  description: string;
  color: string;
  position: [number, number, number];
};

// These points are approximate learning hotspots, parented to the 3D model so
// they move with it as visitors drag or rotate the brain.
const regions: Region[] = [
  {
    id: "frontal",
    name: "Frontal lobe",
    short: "Planning & decisions",
    description: "Supports planning, self-control and goal-directed behaviour.",
    color: "#cf7f88",
    position: [0.39, -0.12, 0.43],
  },
  {
    id: "parietal",
    name: "Parietal lobe",
    short: "Senses & space",
    description:
      "Combines sensory information and helps map the body in space.",
    color: "#d8a18f",
    position: [-0.02, 0.35, 0.34],
  },
  {
    id: "temporal",
    name: "Temporal lobe",
    short: "Memory & sound",
    description: "Contributes to hearing, language and aspects of memory.",
    color: "#bd7b8b",
    position: [0.28, -0.43, 0.36],
  },
  {
    id: "occipital",
    name: "Occipital lobe",
    short: "Visual processing",
    description: "Key visual areas help process colour, shape and motion.",
    color: "#dfa998",
    position: [-0.39, -0.08, 0.31],
  },
  {
    id: "limbic",
    name: "Limbic network",
    short: "Emotion & learning",
    description:
      "Connected structures contribute to emotion, motivation and memory.",
    color: "#ad788e",
    position: [0.02, -0.02, 0.49],
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    short: "Coordination & timing",
    description:
      "Fine-tunes movement, balance, timing and some forms of learning.",
    color: "#ce958c",
    position: [-0.18, -0.63, 0.2],
  },
];

function BrainModel({
  activeId,
  pinnedId,
  onHover,
  onSelect,
}: {
  activeId: RegionId;
  pinnedId: RegionId | null;
  onHover: (id: RegionId) => void;
  onSelect: (id: RegionId) => void;
}) {
  const { scene } = useGLTF("/models/brain.glb");
  const brainScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      if ("isMesh" in node && node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        const mesh = node as Mesh;
        const sourceMaterials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        const pinkMaterials = sourceMaterials.map((source) => {
          const material = source.clone() as MeshStandardMaterial;
          // Preserve the model's texture while lifting the very dark shadows
          // with a soft rose emissive tint.
          material.emissive.set("#5a2027");
          material.emissiveIntensity = 0.28;
          material.color.set("#ffd0ca");
          material.roughness = Math.max(material.roughness, 0.72);
          material.metalness = Math.min(material.metalness, 0.04);
          return material;
        });
        mesh.material = Array.isArray(mesh.material)
          ? pinkMaterials
          : pinkMaterials[0];
      }
    });
    return clone;
  }, [scene]);

  return (
    <group rotation={[0.04, -0.35, 0]}>
      <group scale={1.48}>
        <primitive object={brainScene} position={[0, -0.2054, -0.057]} />
        {regions.map((region) => (
          <Html
            key={region.id}
            position={region.position}
            center
            distanceFactor={1.8}
            zIndexRange={[30, 0]}
          >
            <button
              type="button"
              className={`brain-3d-hotspot ${activeId === region.id ? "is-active" : ""} ${pinnedId === region.id ? "is-pinned" : ""}`}
              style={{ "--hotspot": region.color } as React.CSSProperties}
              aria-label={`Explore ${region.name}`}
              aria-pressed={pinnedId === region.id}
              onPointerEnter={() => onHover(region.id)}
              onFocus={() => onHover(region.id)}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(region.id);
              }}
            >
              <span className="brain-3d-hotspot-core" />
              <span className="brain-3d-tooltip">
                <strong>{region.name}</strong>
                <small>{region.short}</small>
                <span>{region.description}</span>
              </span>
            </button>
          </Html>
        ))}
      </group>
    </group>
  );
}
useGLTF.preload("/models/brain.glb");

export default function BrainPortal() {
  const [activeId, setActiveId] = useState<RegionId>("frontal");
  const [autoRotate, setAutoRotate] = useState(true);
  const [pinnedId, setPinnedId] = useState<RegionId | null>(null);
  const active =
    regions.find((region) => region.id === (pinnedId ?? activeId)) ??
    regions[0];

  return (
    <div
      className="hero-brain-portal"
      aria-label="Interactive 3D brain explorer"
    >
      <div className="hero-brain-orbit hero-brain-orbit-a" />
      <div className="hero-brain-orbit hero-brain-orbit-b" />
      <div className="hero-brain-canvas">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.1, 3.25], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.7} color="#fff0ee" />
          <hemisphereLight args={["#fff7f3", "#e4a0a4", 1.1]} />
          <directionalLight
            position={[3, 4, 5]}
            intensity={2.4}
            color="#fff1ed"
          />
          <directionalLight
            position={[-3, 1, 2]}
            intensity={1.25}
            color="#ffc1c4"
          />
          <pointLight
            position={[0, -1.5, 2]}
            intensity={0.75}
            color="#f0a0a7"
          />
          <Suspense fallback={null}>
            <BrainModel
              activeId={activeId}
              pinnedId={pinnedId}
              onHover={(id) => {
                setActiveId(id);
                setPinnedId(null);
              }}
              onSelect={(id) => {
                setActiveId(id);
                setPinnedId((current) => (current === id ? null : id));
              }}
            />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.75}
            maxPolarAngle={2.35}
            autoRotate={autoRotate}
            autoRotateSpeed={0.48}
          />
        </Canvas>
      </div>
      <div className="hero-brain-caption">
        <span className="caption-spark">✹</span>
        <span>
          <strong>A mind full of possibilities</strong>
          <small>Hover over a point to explore the brain</small>
        </span>
      </div>
      <div className="hero-brain-controls">
        <button
          className="hero-brain-rotate"
          type="button"
          onClick={() => setAutoRotate((value) => !value)}
          aria-pressed={autoRotate}
        >
          <RotateCcw size={13} />{" "}
          {autoRotate ? "Pause rotation" : "Resume rotation"}
        </button>
        <span className="hero-brain-hint">
          DRAG TO ROTATE <i>·</i> HOVER TO DISCOVER
        </span>
      </div>
      <p className="hero-brain-mobile-detail" aria-live="polite">
        <strong>{active.name}</strong>
        <span>{active.description}</span>
      </p>
      <span className="hero-brain-footnote">
        Brain functions work through interconnected networks.
      </span>
    </div>
  );
}
