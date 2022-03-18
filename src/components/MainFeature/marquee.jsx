/** @jsxImportSource theme-ui */
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "theme-ui";
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

  const [height, setHeight] = useState(100);

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
          width: "100%",
          fontSize: [`${height * 0.4}px`, `${height * 0.8}px`],

          webkitTextFillColor: "none",
          filter: "grayscale(100)",

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
              transform: "translate(0%, 0)",
            },
            "100%": {
              transform: "translate(-100%, 0%)",
            },
          },

          ".marquee": {
            animation: "slideOut 10s linear infinite",
            width: "100%",
            display: "flex",
            flexWrap: "nowrap",
            animationDirection: alternate && "reverse",
          },
          ".container": {
            display: "flex",
          },
        }}
      >
        <div className="marquee">
          <MarqueeContent
            content={content}
            li={li}
            containerRef={containerRef}
          />
          <MarqueeContent
            content={content}
            li={li}
            containerRef={containerRef}
          />
        </div>
      </Flex>
    </Link>
  );
};

const MarqueeContent = ({ content, li }) => {
  const number =
    content.__typename === "Client"
      ? content.title.length <= 8
        ? 2
        : 1
      : li.length <= 5
      ? 2
      : 1;
  return (
    <Flex
      className="container"
      sx={{
        alignItems: "center",
        height: "100%",
        flexWrap: "nowrap",

        whiteSpace: "nowrap",
        minWidth: "100%",
        justifyContent: "space-around",
      }}
    >
      {[...Array(number)].map((e, i) => (
        <Fragment key={`${e}-${i}`}>
          <Text
            as="span"
            sx={{
              textShadow:
                "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;",
            }}
          >
            {content.__typename === "Client" ? content.title : li}
          </Text>
          {content.__typename === "Client" && (
            <Box
              as="span"
              sx={{
                width: "15%",
              }}
            >
              <ResponsiveImage
                forwardSx={{
                  width: "90%",
                  height: "90%",
                  borderRadius: ["12px", "24px"],
                  overflow: "hidden",
                }}
                image={content.image}
              />
            </Box>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};
