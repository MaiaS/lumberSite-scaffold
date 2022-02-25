/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const LargeBlock = ({ forwardSx, position }) => {
  return (
    <Box
      sx={{
        aspectRatio: ["1", "auto"],
        backgroundColor: "white",
        // gridColumn: [null, "2 / span 2 "],
        // gridRow: [null, "1 / span 2"],
        gridColumn: [null, "2 / span 2"],
        gridRow: [null, "1 / span 2"],
        direction: "ltr",
        ...forwardSx,
      }}
    >
      large
    </Box>
  );
};

export default LargeBlock;
