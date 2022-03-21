/** @jsxImportSource theme-ui */
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Text, Flex } from "theme-ui";
import ReactMarkdown from "react-markdown";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { linearScale } from "~/utils/linearScale";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";

import * as THREE from "three";

const CarouselFeature = ({ title, description, list }) => {
  const [start, setStart] = useState(false);

  const handleViewport = (e) => {
    setStart(e.isIntersecting);
  };

  return (
    <motion.div
      sx={{ height: "100%", width: "100%", overflow: "hidden" }}
      onViewportEnter={handleViewport}
      onViewportLeave={handleViewport}
    >
      <Box
        sx={{
          m: 0,

          p: ["10%", "5% 5% 7%"],
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
        <Box
          sx={{
            zIndex: 2,
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <Box>
            <Text as="h2" mb="14px">
              {title}
            </Text>
            <Flex
              as="h2"
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                color: "black",
                fontSize: ["40px", "86px"],
                lineHeight: ["40px", "86px"],
                textShadow:
                  "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;",
              }}
            >
              <Text>We are</Text>
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
                  className={start ? "small" : ""}
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
            </Flex>
          </Box>

          <Box>
            <Text
              variant="body"
              sx={{
                lineHeight: ["auto", "36px"],
                fontSize: ["16px", "32px"],
                position: "absolute",
                bottom: ["10%", 0],
                ":after": {
                  background: "black",
                },
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Text>
          </Box>
        </Box>

        {start && (
          <Canvas
            style={{
              top: 0,
              right: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            flat
            camera={{
              zoom: 15,
              position: [20, -7, 0],
              fov: 135,
            }}
          >
            <ambientLight intensity={0.2} />
            <spotLight position={[20, -5, -15]} />

            <Suspense fallback={null}>
              <Cylinder
                list={list}
                rotation={[-Math.PI / 1.1, 0, Math.PI / 1.05]}
                position={[0, -1.5, -2]}
              ></Cylinder>
            </Suspense>

            <Stars />
          </Canvas>
        )}
      </Box>
    </motion.div>
  );
};

export default CarouselFeature;

const Cylinder = (props) => {
  const { list } = props;
  const myref = useRef();
  const [rotation, setRotation] = useState(0);
  const y = useMotionValue(-5);
  const rotateZ = useTransform(y, (value) => value / 4);
  useFrame(
    () => (
      (myref.current.rotation.y += 0.01), setRotation(myref.current.rotation.y)
    )
  );
  return (
    <motion3d.mesh
      position-y={y}
      rotateZ={rotateZ}
      scale={[0.3, 0.3, 0.3]}
      animate={{ y: 0, scale: 1, rotateZ: 100 }}
      transition={{ type: "spring", duration: 4 }}
    >
      <group {...props}>
        <group ref={myref}>
          {list.map((li, i) => (
            <VideoSlice
              key={li.id}
              index={i}
              length={list.length}
              item={li}
              currentRotation={rotation}
            />
          ))}
        </group>
      </group>
    </motion3d.mesh>
  );
};

const VideoSlice = ({ item, index, length, currentRotation }) => {
  const videoSrc = item.video?.url ?? null;
  const contentType = !!item.video?.url;

  const myref = useRef();

  const texture = useLoader(THREE.TextureLoader, item.image.url);
  const videoElemRef = useRef(document.createElement("video"));
  const [video] = useState(() => {
    const vid = videoElemRef.current;
    if (!contentType) return null;
    vid.src = videoSrc;
    vid.style.objectFit = "cover";
    vid.style.width = "100%";
    vid.style.height = "100%";
    vid.crossOrigin = "Anonymous";
    vid.muted = true;
    vid.loop = true;
    vid.autoplay = true;
    vid.playsInline = true;
    vid.load();
    vid.pause();
    vid.currentTime = 1;
    return vid;
  });

  // scale the index by its length between min 0 and max 2 to get the offset for next slice
  const Startpoint = 2 / length;
  const thetaStart =
    Math.PI * (Startpoint + linearScale(index, 0, length, 0, 2));
  const thetaLength = Math.PI * (Startpoint - Startpoint * 0.1);

  const radToDeg = (num) => (num * (180 / Math.PI)) % 360;

  useEffect(() => {
    return () => {
      // clean new elem
      videoElemRef.current.remove();
    };
  }, [currentRotation, videoElemRef.current]);

  return (
    <mesh scale={1}>
      <cylinderBufferGeometry
        ref={myref}
        args={[3, 3, 2.5, 6, 2, true, thetaStart, thetaLength]}
      />
      {contentType && (
        <meshLambertMaterial toneMapped={false} side={THREE.DoubleSide}>
          <videoTexture
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
          />
        </meshLambertMaterial>
      )}
      {!contentType && (
        <meshLambertMaterial
          attach="material"
          map={texture}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  );
};
