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

        aspectRatio: ["1", "3/2"],
        width: "100%",
        "@supports not (aspect-ratio: 1)": {
          height: ["0"],
          pb: ["100%", "80%"],
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <FeatureContent type={content.type} content={content} />
      </Box>
      {/* only render if marquee is true */}

      {marqueeText && <Marquee text={marqueeText} />}
    </Flex>
  );
};

export default MainFeature;
