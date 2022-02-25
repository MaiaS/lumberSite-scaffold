/** @jsxImportSource theme-ui */
import { Box, Text } from "theme-ui";

// To do: wrap text and calculate string so it always goes full height.
const Marquee = ({ text }) => {
  return (
    <Text
      variant="marquee"
      sx={{
        backgroundColor: "red",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          "@keyframes marquee": {
            "0%": {
              transform: "translate(0,0)",
            },
            "100%": {
              transform: "translate(0,-100%)",
            },
          },
          animation: "8s marquee linear infinite",
        }}
      >
        {text.repeat(1)}
      </Box>
    </Text>
  );
};

export default Marquee;
