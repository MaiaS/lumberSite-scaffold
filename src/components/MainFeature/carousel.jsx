/** @jsxImportSource theme-ui */
import { useRef, useState } from "react";
import { Box, Flex, Text } from "theme-ui";
import ReactMarkdown from "react-markdown";
import { DoubleSide } from 'three'

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CarouselFeature = ({ title, description, list }) => {
  const [small, setSmall] = useState(false);

  return (
    <>
      <button onClick={() => setSmall(!small)}>set</button>
      <Box
        sx={{
          m: 0,
          p: "60px 0 0 42px",
          overflow: "hidden",
          height: "100%",
          position: "relative",
          backgroundColor: "black",
          color: "white",
          ".small": {
            width: "100%",
          },
        }}
      >
        <Box>
          <Text as="h2" mb="14px">
            {title}
          </Text>
          <Text
            as="h2"
            sx={{
              color: "black",
              fontSize: "86px",
              textShadow:
                "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;",
            }}
          >
            We are
            <Box
              sx={{
                background: "brand",
                height: "50px",
                width: "50px",
                display: "inline-block",
                borderRadius: "50%",
                mx: "10px",
                position: "relative",
                animate: "3s flash infinite",
              }}
            >
              <Box
                className={small ? "small" : ""}
                sx={{
                  aspectRatio: "1",
                  position: "absolute",

                  width: "10000%",
                  zIndex: 2,
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "scale(1) translate(-50%, -50%)",
                  transformOrigin: "center",
                  background: "brand",
                  transition: "1s ease",
                }}
              ></Box>
            </Box>
            <Text color="white">Lumber</Text>
          </Text>
        </Box>
        <Box>
          <Text
            variant="body"
            sx={{
              lineHeight: "36px",
              fontSize: "32px",
              position: "absolute",
              bottom: "10%",
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Text>
        </Box>
        <Canvas>
          <ambientLight />
          <Cylander></Cylander>
        </Canvas>
      </Box>
    </>
  );
};

export default CarouselFeature;

const Cylander = () => {
  const myref = useRef();

  const shaderArgs = {
    side: DoubleSide,
    uniforms: {
      uLength: { value: 0.13 },
      uProgress: { value: 0 }
    },
    vertexShader: `
      varying vec3 vPos;
      varying vec2 vUv;
      uniform float uLength;
      uniform float uProgress;
      #define PI 3.141592653589793

      void main() {
        vUv = uv;
        vec3 pos = position;
        
        vec3 pos2 = pos;
        pos2.z = 1.;
        pos2.z -= pos2.x * PI * uLength;
        pos2.z += uLength;


        pos = mix(pos, pos2, uProgress);
        vPos = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
      }
    `,
    fragmentShader: `
      varying vec3 vPos;
      varying vec2 vUv;
      #define PI 3.14159265
      void main() {
        vec2 uv = vUv;
        float x = vPos.x;
        vec3 col = vec3(vPos.x);
        gl_FragColor = vec4(col, 1.);
      } 
    `
  }

  useFrame(() => (myref.current.rotation.y += 0.01));
  myref.current?.castShadow = true;
  myref.current?.receiveShadow = true;
  console.log(myref.current);
  return (
    <mesh ref={myref}>
      <cylinderBufferGeometry args={[1.1, 1.1, 2, 40, 2, true, 0, Math.PI * 5]} />
      <shaderMaterial args={[shaderArgs]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
};
