/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const SmallBlock = ({ forwardSx }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        aspectRatio: "1",
        direction: "ltr",
        ...forwardSx,
      }}
    >
      small
    </Box>
  );
};

export default SmallBlock;
