/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useRef } from "react";
// import { useRef, useState } from "react";
import { Box, Flex, Text } from "theme-ui";
import useMarquee from "~/utils/useMarquee";
import ResponsiveImage from "../Generic/ResponsiveImage";

const MarqueeFeature = ({ list, title }) => {
  const containerRef = useRef();

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        overflow: "hidden",
        position: "relative",
        color: "white",
      }}
    >
      <Text
        as="h3"
        sx={{ pt: "39px", pl: "30px", m: 0, mb: ["30px", "100px"] }}
      >
        {title}
      </Text>
      <Flex sx={{ flexDirection: "column", height: "100%" }}>
        {list.map((li, i) => (
          <MarqueeSlider
            containerRef={containerRef}
            alternate={i % 2 === 0 && true}
            key={`${li}-${i}`}
            text={li.__typename === "Client" ? li.title : li}
            content={li}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default MarqueeFeature;

const MarqueeSlider = ({ content, li, alternate, containerRef }) => {
  return (
    <Link href={content.url}>
      <Flex
        sx={{
          cursor: "url('/assets/cursor/GoCursor.svg'), pointer",
          py: ["30px", "50px"],
          borderTop: "1px solid white",
          height: ["30px", "70px"],
          alignItems: "center",
          width: "100%",
          fontSize: ["30px", "70px"],

          webkitTextFillColor: "none",
          filter: "grayscale(100)",
          whiteSpace: "nowrap",
          flexWrap: "nowrap",
          transition: "color .5s ease",
          color: "black",
          ":hover": {
            filter: "grayscale(0)",
            color: "white",
            ".marquee": {
              animationPlayState: "paused",
            },
          },
          "@keyframes slideOut": {
            "0%": {
              transform: "translateX(-100%)",
              opacity: 1,
            },
            "100%": {
              transform: "translateX(100%)",
              opacity: 1,
            },
          },

          ".marquee": {
            position: "absolute",
            animation: "slideOut 20s linear infinite",
            animationFillMode: "forwards",
            animationDirection: alternate && "reverse",
            // left: !alternate && "-200%",
          },
        }}
      >
        <MarqueeContent content={content} li={li} containerRef={containerRef} />

        <MarqueeContent
          content={content}
          li={li}
          containerRef={containerRef}
          forwardSx={{
            animationDelay: "10s !important",
            opacity: 0,
          }}
        />
      </Flex>
    </Link>
  );
};

const MarqueeContent = ({ content, li, containerRef, forwardSx }) => {
  const initialElemRef = useRef();

  const number = useMarquee({ containerRef, initialElemRef, type: "" });

  return (
    <Flex className="marquee" sx={{ ...forwardSx }}>
      {[...Array(number)].map((e, i) => (
        <Flex
          ref={i === 0 ? initialElemRef : null}
          key={`${e}-${i}`}
          sx={{
            width: "100%",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text
            sx={{
              textShadow:
                "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;",
            }}
          >
            {content.__typename === "Client" ? content.title : li}
          </Text>
          {content.__typename === "Client" && (
            <Box
              sx={{
                mx: ["10px", "30px"],
                // minWidth: ["40px", "140px"],

                width: "clamp(30px, 7vw, 100px)",
                borderRadius: ["12px", "24px"],
                overflow: "hidden",
              }}
            >
              <ResponsiveImage image={content.image} />
            </Box>
          )}
        </Flex>
      ))}
    </Flex>
  );
};
