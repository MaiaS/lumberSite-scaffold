/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Text } from "theme-ui";
import ResponsiveImage from "../Generic/ResponsiveImage";

const LargeBlock = ({ forwardSx, handleActivate, active, content }) => {
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
      onClick={handleActivate}
      // className={active ? "active" : ""}
      sx={{
        cursor: "url('/assets/cursor/GoCursor.svg'), auto",
        overflow: "hidden",
        aspectRatio: ["auto"],
        backgroundColor: "white",
        position: "relative",
        zIndex: 2,
        // gridColumn: [null, "2 / span 2 "],
        // gridRow: [null, "1 / span 2"],
        gridColumn: ["1 / span 2"],
        gridRow: ["1 / span 2"],
        filter: "grayscale(100)",
        transition: "1s ease",
        flexShrink: 0.001,
        height: "100%",
        width: ["100%", "65%"],
        flexGrow: 0,
        ":hover": {
          filter: "grayscale(0)",
        },
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],

          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      <Container variant="container.largeBlock" sx={{ height: "100%" }}>
        <Box
          sx={{
            borderRadius: "24px",
            height: "60%",
            maxHeight: "500px",
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

        <Box
          sx={{ height: 0, transition: "1s ease", opacity: active ? 1 : 0 }}
          dangerouslySetInnerHTML={{ __html: content.description }}
        ></Box>

        <Flex
          sx={{
            display: ["none", "flex"],
            gap: "5px",
            position: "absolute",
            bottom: "4%",
          }}
        >
          {content.tags.map((tag, i) => (
            <Box
              key={`${tag + i}`}
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
