/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Text } from "theme-ui";
import ResponsiveImage from "../Generic/ResponsiveImage";

const LargeBlock = ({ forwardSx, position, content }) => {
  const mainImage = content?.mainImage ?? content?.client?.image;

  const getRandomColor = (opacity) => {
    const call = (limit) => Math.max(limit, Math.floor(Math.random() * 225));
    const r = call(50);
    const g = call(100);
    const b = call(200);
    return `rgba(${r},${g},${b}, ${opacity})`;
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        aspectRatio: ["1", "auto"],
        backgroundColor: "white",
        position: "relative",
        // gridColumn: [null, "2 / span 2 "],
        // gridRow: [null, "1 / span 2"],
        gridColumn: [null, "2 / span 2"],
        gridRow: [null, "1 / span 2"],
        direction: "ltr",
        filter: "grayscale(100)",
        transition: "1s ease",
        flexShrink: 0.001,
        height: "100%",
        width: ["100%", "65%"],
        flexGrow: 0,
        ":hover": {
          filter: "grayscale(0)",
          width: "100%",
          flexGrow: 10,
        },
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],

          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      <Container variant="container.largeBlock" sx={{ height: "100%" }}>
        {/* {JSON.stringify(content, null, 2)} */}
        <Box
          sx={{
            borderRadius: "24px",
            height: "60%",
            background: "grey",
            overflow: "hidden",
            filter: "grayscale(0)",
            mb: ["16px", "32px"],

            span: {
              position: "static !important",
            },
          }}
        >
          <ResponsiveImage height="100%" width="100%" image={mainImage} />
        </Box>
        <Text
          sx={{ fontWeight: 700, fontSize: ["16px", "clamp(20px, 5vw, 32px)"] }}
        >
          {content.title}
        </Text>
        <Flex
          sx={{
            display: ["none", "flex"],
            gap: "5px",
            position: "absolute",
            bottom: "4%",
          }}
        >
          {content.tags.map((tag) => (
            <Box
              sx={{
                fontSize: "13px",
                px: "10px",
                m: 0,
                py: "4px",
                borderRadius: "4px",
                width: "fit-content",
                textTransform: "uppercase",
                backgroundColor: getRandomColor(0.8),
              }}
            >
              {tag}
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default LargeBlock;
