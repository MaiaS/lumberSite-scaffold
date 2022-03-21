/** @jsxImportSource theme-ui */
import { useRef, useEffect, useState, memo } from "react";
import { useMedia } from "react-use";
import { Box, Flex, Text } from "theme-ui";
import { motion } from "framer-motion";
import RingSvg from "./ring1.svg";
import RingSvg2 from "./ring2.svg";
import RingSvg3 from "./ring3.svg";
import RingSvg4 from "./ring4.svg";
import RingSvg5 from "./ring5.svg";

const RingFeature = ({ title }) => {
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
        sx={{ zIndex: 99 }}
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
        {start && <RingSet title={title} />}
      </motion.div>
    </Box>
  );
};

const RingSet = memo(function RingSet({ title }) {
  return (
    <Flex
      sx={{
        width: "50%",
        position: "absolute",
        transition: "1s ease",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RingCoded />

      <Box
        sx={{
          zIndex: 100,
          aspectRatio: "1",
          width: "50%",
        }}
      >
        <motion.div
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "50%",
            zIndex: 3,
          }}
          initial={{ opacity: 0, translateY: 4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 3, delay: 0.95 }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontSize: ["clamp(25px, 2vw,42px)"],
              whiteSpace: "nowrap",

              fontWeight: 900,
            }}
          >
            {title}
          </Text>
        </motion.div>
      </Box>
      <motion.svg
        initial={{ scale: 0.06, originX: "50%", originY: "50%" }}
        transition={{ delay: 1, type: "spring", duration: 0.5 }}
        animate={{ scale: 1 }}
        sx={{
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
          overflow: "hidden",
          background: "brand",
          width: ["70%", "50%"],
          aspectRatio: "1",
        }}
      ></motion.svg>
    </Flex>
  );
});

// hard-coded
const RingCoded = () => {
  const [animation, setAnimation] = useState(false);
  const array = [RingSvg, RingSvg2, RingSvg3, RingSvg4, RingSvg5];
  return (
    <Box
      sx={{
        isolation: "isolate",
      }}
    >
      {array.map((e, i) => (
        <Box
          key={`${e}-${i}`}
          sx={{
            "@keyframes rotation": {
              "0%": {
                transform: "rotate(360deg)",
              },
              "100%": {
                transform: "rotate(0deg)",
              },
            },

            zIndex: array.length - (i + 1),
            top: "50%",
            left: "50%",
            position: "absolute",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            onAnimationComplete={
              i === array.length - 1 ? () => setAnimation(true) : null
            }
            sx={{
              width: ["50vw", "30vw"],
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              zIndex: array.length - (i + 1),
              border: "1px",
              borderStyle: i % 2 === 0 ? "solid" : "dotted",
              borderColor: "brand",
              py: `${5 / (i + 1)}%`,
              px: `${5 / (i + 1)}%`,
              background: "black",
              pointerEvents: "all",
              svg: {
                transition: ".3s ease",
                fill: "white",
              },
              ":hover": {
                svg: {
                  fill: "brand",
                  animationPlayState: "paused",
                },
              },
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: Math.pow(4, 0.2 * i),
              opacity: 1,
            }}
            transition={{
              type: "spring",
              delay: (i + 7) * 0.2,
              duration: 0.2,
            }}
          >
            <div
              sx={{ animation: animation && "rotation 10s linear infinite" }}
            >
              {e()}
            </div>
          </motion.div>
        </Box>
      ))}
    </Box>
  );
};

export default RingFeature;
