/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const SmallBlock = ({ forwardSx, content }) => {
  console.log(content);
  return (
    <Box
      sx={{
        backgroundColor: content.mainColor ?? "white",
        aspectRatio: "1",
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],
          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: "50%",

          background: content.secondaryColor ?? "brand",
        }}
      />
    </Box>
  );
};

export default SmallBlock;
