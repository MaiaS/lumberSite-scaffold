/** @jsxImportSource theme-ui */
import { useEffect, useRef } from "react";
import { Box, Flex, Text } from "theme-ui";

// need to change eyelid,
// need to make blink
// need to follow scroll

const EyeLid = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 79 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M39.4689 0.671875C22.6405 0.671875 8.01242 5.2046 0.561279 11.8717C8.01242 18.5388 22.6405 23.0715 39.4689 23.0715C56.2975 23.0715 70.9256 18.5388 78.3765 11.8717C70.9256 5.2046 56.2975 0.671875 39.4689 0.671875Z"
      />
    </svg>
  );
};

const Eyes = ({ content }) => {
  return (
    <>
      <Flex
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EyeBall />
        <EyeBall />
      </Flex>
    </>
  );
};

const EyeBall = () => {
  const eyeWhiteRef = useRef();
  const pupilRef = useRef();
  const maskRef = useRef();

  //rotating eyeball
  useEffect(() => {
    const followMe = (e) => {
      if (!eyeWhiteRef.current || !pupilRef.current) return;
      const pupil = pupilRef.current.getBoundingClientRect();
      const eye = eyeWhiteRef.current.getBoundingClientRect();
      const center = {
        x: e.x,
        y: e.y,
      };
      const elemCenter = {
        x: eye.left + eye.width / 2,
        y: eye.top + eye.height / 2,
      };
      const radian = Math.atan2(
        elemCenter.x - center.x,
        (elemCenter.y - center.y) * -1
      );
      const degree = radian * (180 / Math.PI) * -1 + 180;
      eyeWhiteRef.current.style.transform = `rotate(-${degree}deg)`;
      maskRef.current.style.transform = `rotate(${degree}deg)`;
    };
    window.addEventListener("mousemove", followMe);
    return () => window.removeEventListener("mousemove", followMe);
  }, []);

  return (
    <Box
      ref={eyeWhiteRef}
      sx={{
        height: "20%",
        overflow: "hidden",
        aspectRatio: "1",
        borderRadius: "50%",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {/* <Box
        ref={maskRef}
        sx={{
          height: "50%",
          width: "100%",
          top: "25%",
          position: "relative",
          borderRadius: "50%",

          // clipPath: "ellipse(50% 20% at 50%)",
          backgroundColor: "white",
        }}
      ></Box> */}
      <Box
        ref={maskRef}
        sx={{
          height: "100%",
          width: "100%",
          top: "0%",
          left: "0%",
          position: "absolute",
        }}
      >
        <EyeLid />
      </Box>
      <Box
        ref={pupilRef}
        sx={{
          height: "25%",
          width: "25%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          position: "absolute",
          borderRadius: "50%",
          transformOrigin: "0 0",
          backgroundColor: "black",
        }}
      ></Box>
    </Box>
  );
};

export default Eyes;
