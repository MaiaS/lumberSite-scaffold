/** @jsxImportSource theme-ui */
import { useRef, useEffect, useState, memo } from "react";
import { useMedia } from "react-use";
import { Box, Flex, Text } from "theme-ui";
import { motion } from "framer-motion";

const RingFeature = ({ list, title }) => {
  const ringRef = useRef(null);
  const cursorRef = useRef(null);

  const [start, setStart] = useState(false);

  /** Replace mouse with rotating pointer on mouse enter.
   * Initially set mouse to false so that it doesn't eat up cpu on mobile and before mouse enters
   * then on mouse enter, set up 3 vars, mouse X, mouse Y, and mouse rotation
   * Calculate mouse rotation getting angle btwn fake mouse position and target element
   * https://css-tricks.com/can-you-rotate-the-cursor-in-css/
   */
  const [mouseIn, setMouseIn] = useState(true);

  const calculateRotate = (cursor, elem) => {
    const cursorRect = cursor.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    const center = {
      x: cursorRect.left + cursorRect.width / 2,
      y: cursorRect.top + cursorRect.height / 2,
    };
    const elemCenter = {
      x: elemRect.left + elemRect.width / 2,
      y: elemRect.top + elemRect.height / 2,
    };
    const radian = Math.atan2(elemCenter.x - center.x, elemCenter.y - center.y);
    const degree = radian * (180 / Math.PI) * -1 + 180;
    return degree;
  };

  const handleMouseMove = (e) => {
    const rect = ringRef.current.getBoundingClientRect();

    cursorRef.current.style.display = "block";
    window.requestAnimationFrame(() => {
      ringRef.current.style.setProperty("--mouse-x", e.x - rect.x + "px");
      ringRef.current.style.setProperty("--mouse-y", e.y - rect.y + "px");
      ringRef.current.style.setProperty(
        "--mouse-r",
        calculateRotate(cursorRef.current, ringRef.current) + 20 + "deg"
      );
    });
  };

  const query = useMedia("(any-hover: none)");

  useEffect(() => {
    if (!ringRef.current || !cursorRef.current || !mouseIn || query) return;

    const handleLeave = () => {
      cursorRef.current.style.display = "none";
    };

    ringRef.current.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    ringRef.current.addEventListener("mouseleave", handleLeave, {
      passive: true,
    });
    return () =>
      ringRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, [ringRef, handleMouseMove, calculateRotate, mouseIn]);

  return (
    <Box
      ref={ringRef}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      sx={{
        cursor: "none",
        position: "relative",
        background: "black",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        ".textpath": {
          fontSize: "3px",
        },
        ".brand": {
          fill: "brand",
        },
        ".circle": {
          stroke: "brand",
        },
        ".before": {
          animationName: null,
          animation: "none !important",
        },
        ".start": {
          transform: "scale(1)",
          animationName: "rotation",
        },
      }}
    >
      <img
        ref={cursorRef}
        className="mover"
        src="/assets/cursor/HoverCursor.svg"
      />
      <motion.div
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
        onViewportEnter={() => setStart(true)}
        onViewportLeave={() => setStart(false)}
      >
        {start && <RingSet list={list} title={title} />}
      </motion.div>
    </Box>
  );
};

const RingSet = memo(function RingSet({ list, title }) {
  const [ringAnimation, setRingAnimation] = useState(false);
  const animationDelay = 4.6;
  return (
    <Flex
      sx={{
        width: "25%",
        position: "absolute",
        transition: "1s ease",
        justifyContent: "center",
        alignItems: "center",
        isolation: "isolate",
      }}
    >
      {list.slice().map((li, i) => {
        return (
          <Ringlet
            key={`${li + i}`}
            li={li}
            i={i + 1}
            list={list}
            setRingAnimation={i === list.length - 1 && setRingAnimation}
            ringAnimation={ringAnimation}
            animationDelay={animationDelay}
          />
        );
      })}

      <Box
        sx={{
          zIndex: 100,
          aspectRatio: "1",
          width: "100%",
        }}
      >
        <motion.div
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            zIndex: 99,
          }}
          initial={{ opacity: 0, translateY: 4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 3, delay: 0.95 }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontSize: ["8px", "clamp(25px, 2vw,42px)"],
              whiteSpace: "nowrap",

              fontWeight: 900,
            }}
          >
            {title}
          </Text>
        </motion.div>
        <motion.svg
          initial={{ scale: 0.06, originX: "50%", originY: "50%" }}
          transition={{ delay: 1, type: "spring", duration: 0.5 }}
          animate={{ scale: 1 }}
          width="100%"
          height="100%"
          className="brand"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </motion.svg>
      </Box>
    </Flex>
  );
});

const Ringlet = ({ li, i, list, animationDelay }) => {
  const getCircumference = (radius) => {
    return 2 * Math.PI * radius;
  };

  const getChar = (circumference, fontSize) => {
    if (!circumference || !fontSize) return 1;
    return circumference / fontSize;
  };

  /** Generate a textPath to set inside a text svg element. Takes string, radius of ring, and fontSize
   * 1st get circumference
   * 2nd get max chars that text can occupy based on circumference length
   * 3rd get amount of times to multiply string
   * 4th padstart string to give space between repeated strings, repeat by `newChars`
   * return textpath with new string.
   */
  const generateString = (string, radius, fontSize) => {
    const circumference = getCircumference(radius);

    const maxChars = getChar(circumference, fontSize);
    const newChars = Math.max(1, maxChars / (string.length + 1));
    const newString = string.padStart(string.length + 1, " ").repeat(newChars);

    return `<textPath

    method=stretch
   spacing=exact
   textLength=155%
    xlink:href="#circle"
    >
    ${newString}
    </textPath>`;
  };

  const hoverRef = useRef();
  // const rotationStart = Math.floor(Math.random() * 360);
  // const scale = 2.25 + Math.pow(i, 1.2 + i * 0.025);

  return (
    <motion.div
      // onAnimationComplete={
      //   setRingAnimation ? () => setRingAnimation(true) : null
      // }
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: (i + 3) * 0.2, duration: 0.2 }}
      sx={{
        "@keyframes rotation": {
          "0%": {
            transform: "rotate(360deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },

        aspectRatio: "1",
        width: "100%",
        position: "absolute",
        transition: "1s ease",
        animation: `rotation ${Math.max(20, 20 * i * 0.5)}s infinite`,
        animationDelay: `${animationDelay}s`,
        animationTimingFunction: "linear",
        zIndex: list.length - i,
        ":hover": {
          animationPlayState: "paused",
        },
        svg: {
          circle: {
            pointerEvents: "auto",
          },
        },
      }}
    >
      {/* <Box
        sx={{
          aspectRatio: "1",
          height: `${120 * i * 0.5 + 10}%`,
          width: `${120 * i * 0.5 + 10}%`,
          top: `${50}%`,
          left: `${50}%`,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          position: "absolute",
          border: i % 2 === 0 ? "1px solid" : "1px dotted",
          strokeDashoffset: "20px",
          borderColor: "brand",
        }}
      ></Box> */}
      <svg
        key={`${li}-${i}`}
        style={{
          pointerEvents: "none",
          position: "absolute",
          height: `${130 * (i + 1)}%`,
          width: `${130 * (i + 1)}%`,
          top: `${50}%`,
          left: `${50}%`,
          transform: "translate(-50%,-50%)",

          //  transform: `scale(${scale}) rotate(${rotationStart}deg)`,
          // transformStyle: "preserve-3d",
        }}
        preserveAspectRatio="none"
        fill="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="circle"
          d="
          M 25, 50
          a 1,1 0 1,1 50,0
          a 1,1 0 1,1 -50,0
          "

          // d="
          // M cx cy
          // m -r, 0
          // a r,r 0 1,0 (r * 2),0
          // a r,r 0 1,0 -(r * 2),0
          // "
        />
        <circle
          onMouseEnter={() => {
            hoverRef.current.style.fill = "var(--theme-ui-colors-brand)";
          }}
          onMouseLeave={() => {
            hoverRef.current.style.fill = "white";
          }}
          className="circle"
          fill="black"
          strokeWidth={`.1px`}
          strokeDasharray={(i + 1) % 2 === 0 ? "0" : ".3"}
          cx="50"
          cy="50"
          r={`${25 * Math.pow(1.6, Math.pow(0.5, 0.3 * (i + 1)))}`}
        />

        <text
          ref={hoverRef}
          fill="white"
          className="textpath"
          dangerouslySetInnerHTML={{
            __html: generateString(li, 50, 3),
          }}
        />
      </svg>
    </motion.div>
  );
};

export default RingFeature;
