/** @jsxImportSource theme-ui */
import Link from "next/link";
// import { useRef, useState } from "react";
import { Box, Flex, Text } from "theme-ui";
import ResponsiveImage from "../Generic/ResponsiveImage";

const MarqueeFeature = ({ list, title }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        overflow: "hidden",
        overflowStyle: "marquee",
        color: "white",
      }}
    >
      <Text
        as="h3"
        sx={{ pt: "39px", pl: "30px", m: 0, mb: ["30px", "100px"] }}
      >
        {title}
      </Text>
      <Flex sx={{ flexDirection: "column" }}>
        {list.map((li, i) => (
          <MarqueeSlider
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

const MarqueeSlider = ({ content, li }) => {
  // const stringWidth = useRef();

  // const [width, setWidth] = useState("100%");
  // useEffect(() => {
  //   const bound = textRef.current?.getBoundingClientRect();
  //   console.log(bound);
  //   setWidth(bound.width);
  //   window.addEventListener("resize", () => {
  //     const bound = textRef.current?.getBoundingClientRect();
  //     setWidth(bound.width);
  //   });
  // }, []);

  return (
    <Link href={content.url}>
      <Flex
        sx={{
          alignItems: "center",
          cursor: "pointer",
          width: "fit-content",
          fontSize: ["30px", "70px"],
          borderTop: "1px solid white",
          webkitTextFillColor: "none",
          pb: "5px",
          filter: "grayscale(100)",
          whiteSpace: "nowrap",
          flexWrap: "nowrap",
          svg: {
            transition: ".3s ease",
          },
          color: "black",
          transition: ".5s ease",
          gap: "30px",
          ":hover": {
            filter: "grayscale(0)",
            color: "white",
          },
        }}
      >
        {[...Array(4)].map((e, i) => (
          <Flex key={`${e}-${i}`} sx={{ width: "100%", alignItems: "center" }}>
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
                  ml: "30px",
                  my: ["4px", "13px"],
                  width: "15%",
                  minWidth: ["50px", "100px"],
                  height: "fit-content",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                <ResponsiveImage image={content.image} />
              </Box>
            )}
          </Flex>
        ))}
      </Flex>
    </Link>
  );
};
