/** @jsxImportSource theme-ui */
import { useRef, useState } from "react";
import { Box, Text, Flex } from "theme-ui";
import useMarquee from "~/utils/useMarquee";

// To do: wrap text and calculate string so it always goes full height.
const Marquee = ({ text }) => {
  const containerRef = useRef();

  console.log("mf", containerRef.current);
  return (
    <Box
      ref={containerRef}
      sx={{
        display: ["none", "unset"],
        backgroundColor: "brand",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexGrow: 1,
        position: "relative",
        zIndex: 3,
        maxWidth: "100px",
        width: "100%",
        pr: "10%",
        // pb: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          "@keyframes slideDown": {
            "0%": {
              transform: "translate(0%, -100%)",
              opacity: 1,
            },
            "100%": {
              transform: "translate(0%, 100%)",
              opacity: 1,
            },
          },
          ".marquee": {
            position: "absolute",
            width: "100%",
            top: 0,
            animation: "slideDown 20s linear infinite",
            animationFillMode: "forwards",
          },
        }}
      >
        <MarqueeContent text={text} containerRef={containerRef} />
        <MarqueeContent
          text={text}
          containerRef={containerRef}
          forwardSx={{
            animationDelay: "10s !important",
            opacity: 0,
            // transform: "translateX(100%%)",
          }}
        />
      </Box>
    </Box>
  );
};

const MarqueeContent = ({ text, containerRef, forwardSx }) => {
  const initialElemRef = useRef();

  const number = useMarquee({ containerRef, initialElemRef, type: "height" });

  return (
    <Box
      className="marquee"
      sx={{
        ...forwardSx,
      }}
    >
      {[...Array(number)].map((e, i) => (
        <Flex key={`${e}-${i}`} ref={i === 0 ? initialElemRef : null} my="1em">
          <Text variant="marquee" dangerouslySetInnerHTML={{ __html: text }} />
        </Flex>
      ))}
    </Box>
  );
};

export default Marquee;
