/** @jsxImportSource theme-ui */
import { memo, useEffect, useRef } from "react";
import { useMedia } from "react-use";
import { Box, Flex } from "theme-ui";

// eyelid
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.4689 0.671875C22.6405 0.671875 8.01242 5.2046 0.561279 11.8717C8.01242 18.5388 22.6405 23.0715 39.4689 23.0715C56.2975 23.0715 70.9256 18.5388 78.3765 11.8717C70.9256 5.2046 56.2975 0.671875 39.4689 0.671875Z"
      />
    </svg>
  );
};

const Eyes = memo(function Eyes() {
  // Eyelid rotation start
  const rotate = 0; //  const rotate = Math.floor(Math.random() * 61 - 30);

  // eyelid forwardRef
  const eyeRRef = useRef();
  const eyeLRef = useRef();

  useEffect(() => {
    // animate eyelid blink
    if (!eyeRRef.current || !eyeLRef.current) return;
    const eyeR = eyeRRef.current;
    const eyeL = eyeLRef.current;
    const rightAnim = eyeR.animate(
      [
        { transform: `scaleY(1) rotate(-${rotate}deg)` },
        { transform: `scaleY(0) rotate(-${rotate}deg)` },
        { transform: `scaleY(1) rotate(-${rotate}deg)` },
      ],
      {
        duration: 1000,
        easing: "ease",
      }
    );
    const leftAnim = eyeL.animate(
      [
        { transform: `scaleY(1) rotate(${rotate}deg)` },
        { transform: `scaleY(0) rotate(${rotate}deg)` },
        { transform: `scaleY(1) rotate(${rotate}deg)` },
      ],
      {
        duration: 1000,
        easing: "ease",
      }
    );
    leftAnim.pause();
    rightAnim.pause();

    // randomize eyelid blink and recursion that never ends
    function blink() {
      let blinkTime = null;
      // clean up closure
      function start() {
        blinkTime = setTimeout(() => {
          rightAnim.play();
          leftAnim.play();
          start();
        }, Math.random() * 15000);
      }
      function clear() {
        clearTimeout(blinkTime);
      }

      return {
        start,
        clear,
      };
    }
    const blinkFunction = blink();
    blinkFunction.start();

    // clear blink
    return () => blinkFunction.clear();
  }, [eyeRRef, eyeLRef]);

  return (
    <>
      <Flex
        sx={{
          "--rotate-eye": `${rotate}deg`,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          ".blink-left": {
            transform: "scaleY(1) rotate(calc(-1 * var(--rotate-eye)))",
          },
          ".blink-right": {
            transform: "rotate(var(--rotate-eye))",
          },
        }}
      >
        <EyeBall forwardRef={eyeLRef} />
        <EyeBall right forwardRef={eyeRRef} />
      </Flex>
    </>
  );
});

const EyeBall = ({ right, forwardRef }) => {
  const eyeWhiteRef = useRef();
  const pupilRef = useRef();
  const maskRef = useRef();
  const query = useMedia("(any-hover: none)");
  // Rotating eyeball
  useEffect(() => {
    const followMe = (e) => {
      if (!eyeWhiteRef.current || !pupilRef.current) return;

      const center = {
        x: 0,
        y: 0,
      };

      // window (scroll) vs mouse (mousemove)
      if (!e.x || !e.y) {
        center.x = window.innerWidth / 2;
        center.y = window.innerHeight / 2;
      } else {
        center.x = e.x;
        center.y = e.y;
      }
      const eye = eyeWhiteRef.current.getBoundingClientRect();

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

    // if mobile -> scroll, else mousemove
    if (query) {
      window.addEventListener("scroll", followMe);
    } else {
      window.addEventListener("mousemove", followMe);
    }
    return () =>
      query
        ? window.addEventListener("scroll", followMe)
        : window.removeEventListener("mousemove", followMe);
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
        <Box
          ref={forwardRef}
          className={right ? "blink-right" : "blink-left"}
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

export default memo(Eyes);
