/** @jsxImportSource theme-ui */
import { Box, Text } from "theme-ui";

// To do: wrap text and calculate string so it always goes full height.
const Marquee = ({ text }) => {
  return (
    <Box
      sx={{
        display: ["none", "unset"],
        backgroundColor: "red",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexGrow: 1,
        position: "relative",
        zIndex: 3,
        maxWidth: "100px",
        width: "100%",
        pb: "100%",
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

          animation: "30s marquee linear infinite",
        }}
      >
        <Text variant="marquee"> {text.repeat(10)} </Text>
      </Box>
    </Box>
  );
};

export default Marquee;
