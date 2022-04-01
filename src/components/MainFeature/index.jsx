/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui";
import Marquee from "../Generic/Marquee";
import FeatureContent from "./feature";

const MainFeature = ({ content }) => {
  // const string = "We Love Ecommerce ";
  const { marqueeText, marqueePosition } = content;
  return (
    <Flex
      sx={{
        background: "white",
        flexDirection: marqueePosition === "right" ? "row" : "row-reverse", // row-reverse to show marquee on other side
        color: "black",
        gridColumn: ["span 2", "auto"],
        gridRow: ["span 2", "auto"],

        overflow: "hidden",
        width: "100%",

        height: ["0"],
        pb: ["130%", "70%"],
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <FeatureContent type={content.type} content={content} />
      </Box>
      {/* only render if marquee is true */}

      {marqueeText && <Marquee text={marqueeText} />}
    </Flex>
  );
};

export default MainFeature;
