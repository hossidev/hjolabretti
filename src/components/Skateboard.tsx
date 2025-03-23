/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type SkateboardProps = {
  wheelTextureURLs: string[];
  wheelTextureURL: string;
  deckTextureURLs: string[];
  deckTextureURL: string;
  truckColor: string;
  boltColor: string;
  constantWheelSpin?: boolean;
  pose?: "upright" | "side";
};

type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh;
    Wheel1: THREE.Mesh;
    Wheel2: THREE.Mesh;
    Deck: THREE.Mesh;
    Wheel4: THREE.Mesh;
    Bolts: THREE.Mesh;
    Wheel3: THREE.Mesh;
    Baseplates: THREE.Mesh;
    Truck1: THREE.Mesh;
    Truck2: THREE.Mesh;
  };
  materials: object;
};

export function Skateboard({
  wheelTextureURL,
  wheelTextureURLs,
  deckTextureURL,
  deckTextureURLs,
  truckColor,
  boltColor,
  constantWheelSpin = false,
  pose = "upright",
}: SkateboardProps) {
  const wheelRefs = useRef<THREE.Object3D[]>([]);

  const { nodes } = useGLTF("/skateboard.gltf") as unknown as GLTFResult;

  // Wheel Textures
  const wheelTextures = useTexture(wheelTextureURLs);
  wheelTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const wheelTextureIndex = wheelTextureURLs.findIndex(
    (url) => url === wheelTextureURL
  );
  const wheelTexture = wheelTextures[wheelTextureIndex];

  // Deck Textures
  const deckTextures = useTexture(deckTextureURLs);
  deckTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const deckTextureIndex = deckTextureURLs.findIndex(
    (url) => url === deckTextureURL
  );
  const deckTexture = deckTextures[deckTextureIndex];

  const gripTapeDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
  const gripTapeRoughness = useTexture("/skateboard/griptape-roughness.webp");

  const gripTapeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: gripTapeDiffuse,
      bumpMap: gripTapeRoughness,
      roughnessMap: gripTapeRoughness,
      bumpScale: 3.5,
      roughness: 0.8,
      color: "#555555",
    });

    if (gripTapeDiffuse) {
      gripTapeDiffuse.wrapS = THREE.RepeatWrapping;
      gripTapeDiffuse.wrapT = THREE.RepeatWrapping;
      gripTapeDiffuse.repeat.set(9, 9);
      gripTapeDiffuse.needsUpdate = true;

      gripTapeRoughness.wrapS = THREE.RepeatWrapping;
      gripTapeRoughness.wrapT = THREE.RepeatWrapping;
      gripTapeRoughness.repeat.set(9, 9);
      gripTapeRoughness.needsUpdate = true;

      gripTapeRoughness.anisotropy = 8;
    }

    return material;
  }, [gripTapeDiffuse, gripTapeRoughness]);

  const boltMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: boltColor,
        metalness: 0.5,
        roughness: 0.3,
      }),
    [boltColor]
  );

  const metalNormal = useTexture("/skateboard/metal-normal.avif");
  metalNormal.wrapS = THREE.RepeatWrapping;
  metalNormal.wrapT = THREE.RepeatWrapping;
  metalNormal.anisotropy = 8;
  metalNormal.repeat.set(8, 8);

  const truckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: truckColor,
        normalMap: metalNormal,
        normalScale: new THREE.Vector2(0.3, 0.3),
        metalness: 0.8,
        roughness: 0.25,
      }),
    [truckColor, metalNormal]
  );

  const deckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: deckTexture,
        roughness: 0.1,
      }),
    [deckTexture]
  );

  const wheelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wheelTexture,
        roughness: 0.35,
      }),
    [wheelTexture]
  );

  // Add Wheel Refs
  const addToWheelRefs = (ref: THREE.Object3D | null) => {
    if (ref && !wheelRefs.current.includes(ref)) {
      wheelRefs.current.push(ref);
    }
  };

  useFrame(() => {
    if (!wheelRefs.current || !constantWheelSpin) return;
    for (const wheel of wheelRefs.current) {
      wheel.rotation.x += 0.2;
    }
  });

  useEffect(() => {
    if (!wheelRefs.current || constantWheelSpin) return;
    for (const wheel of wheelRefs.current) {
      gsap.to(wheel.rotation, {
        x: "-=30",
        duration: 2.5,
        ease: "circ.out",
      });
    }
  }, [constantWheelSpin, wheelTextureURL]);

  const positions = useMemo(
    () =>
      ({
        upright: {
          rotation: [0, 0, 0],
          position: [0, 0, 0],
        },
        side: {
          rotation: [0, 0, Math.PI / 2],
          position: [0, 0.295, 0],
        },
      }) as const,
    []
  );

  return (
    <group
      dispose={null}
      rotation={positions[pose].rotation}
      position={positions[pose].position}
    >
      <group name="Scene">
        <mesh
          name="GripTape"
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={gripTapeMaterial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          name="Wheel1"
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={wheelMaterial}
          position={[0.238, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={wheelMaterial}
          position={[-0.237, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={deckMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel3"
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={wheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={wheelMaterial}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Bolts"
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={boltMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={truckMaterial}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={truckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={truckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/skateboard.gltf");
