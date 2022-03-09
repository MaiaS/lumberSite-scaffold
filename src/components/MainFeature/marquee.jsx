/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
        sx={{
          pt: "39px",
          pl: "30px",
          pb: "clamp(20px, 5vw, 100px)",
          height: "20%",
          m: 0,
        }}
      >
        {title}
      </Text>
      <Flex sx={{ flexDirection: "column", height: "80%" }}>
        {list.map((li, i) => (
          <MarqueeSlider
            listLength={list.length}
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

const MarqueeSlider = ({
  content,
  li,
  alternate,
  containerRef,
  listLength,
}) => {
  const marqueeSliderRef = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!marqueeSliderRef.current) return;

    const resizeMarqueeText = () => {
      const rect = marqueeSliderRef.current.getBoundingClientRect();
      setHeight(rect.height);
    };
    window.addEventListener("resize", resizeMarqueeText);
    resizeMarqueeText();
    return () => window.removeEventListener("resize", resizeMarqueeText);
  }, [marqueeSliderRef]);

  return (
    <Link href={content.url}>
      <Flex
        ref={marqueeSliderRef}
        sx={{
          cursor: "url('/assets/cursor/GoCursor.svg'), pointer",
          py: [`${100 / listLength}px`, `${100 / listLength}px`],
          borderTop: "1px solid white",
          height: [`${90 / listLength}%`, `${90 / listLength}%`],
          // height: ["30px", "70px", "200px"],
          alignItems: "center",
          minWidth: "100%",
          fontSize: [`${height * 0.4}px`, `${height * 0.8}px`],

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
            animationDelay: "-10s",
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
            animationDelay: "0s !important",
            opacity: 0,
          }}
        />
      </Flex>
    </Link>
  );
};

const MarqueeContent = ({ content, li, containerRef, forwardSx }) => {
  const initialElemRef = useRef();

  const number = useMarquee({ containerRef, initialElemRef, type: "width" });

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
                mx: "20px",
                aspectRatio: "3/2",
                height: "100%",
                width: ["clamp(10px,6vw,500px)", "clamp(10px,14vw,400px)"],
                position: "relative",
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
