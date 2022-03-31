/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui";
import ReactMarkdown from "react-markdown";
import ResponsiveImage from "~/components/Generic/ResponsiveImage";

const TextImage = ({ content }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        color: content.secondaryColor ?? "black",
        height: "100%",
        p: "10%",
        fontSize: ["clamp(30px, 10vw, 70px)", "clamp(30px, 4vw, 60px)"],
        lineHeight: ["clamp(30px, 10vw, 70px)", "clamp(30px, 4vw, 60px)"],
      }}
    >
      <Box
        sx={{
          maxWidth: "12ch",
          p: { m: 0 },
        }}
      >
        <ReactMarkdown>{content.title}</ReactMarkdown>
      </Box>
      <Box sx={{ width: "80%" }}>
        {content.image && <ResponsiveImage image={content.image} />}
      </Box>
    </Flex>
  );
};

export default TextImage;
