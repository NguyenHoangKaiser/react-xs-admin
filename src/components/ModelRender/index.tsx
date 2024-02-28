/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import type { MeshProps } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Outline, Select, Selection } from '@react-three/postprocessing';
import React, { useRef, useState } from 'react';
import type { Mesh } from 'three';

function Box(props: MeshProps) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ModelRender() {
  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor={0xffffff} edgeStrength={100} width={1000} />
        </EffectComposer>
        <Hover>
          <Box position={[-1, 0, 0]} />
        </Hover>
        <Hover>
          <Box position={[1, 0, 0]} />
        </Hover>
      </Selection>
      <OrbitControls />
    </Canvas>
  );
}
interface IHoverProps {
  children: React.ReactNode;
}

export function Hover(props: IHoverProps) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  return (
    <Select enabled={hovered}>
      {childrenWithProps(props.children, {
        ref: meshRef,
        onPointerOver: () => setHover(true),
        onPointerOut: () => setHover(false),
      })}
    </Select>
  );
}

const childrenWithProps = (children: React.ReactNode, props: any) =>
  React.Children.map(children, (child: any) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });
