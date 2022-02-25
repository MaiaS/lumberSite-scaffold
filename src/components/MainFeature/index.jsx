/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui";
import Marquee from "../Generic/Marquee";

const MainFeature = () => {
  // const string = "We Love Ecommerce ";
  return (
    <Flex
      sx={{
        background: "white",
        height: [null, "100vh"],
        flexDirection: "row", // row-reverse to show marquee on other side
        color: "black",
        aspectRatio: ["1", "auto"],
      }}
    >
      <Box sx={{ flexGrow: "1" }}>main</Box>
      {/* only render if marquee is true */}
      <Marquee text="a string of text lies here" />
    </Flex>
  );
};

export default MainFeature;
