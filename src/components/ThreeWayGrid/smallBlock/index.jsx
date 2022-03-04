/** @jsxImportSource theme-ui */
import { Box, Text } from "theme-ui";
import Clock from "./clock";
import Eyes from "./eyes";

const SmallBlock = ({ forwardSx, classType, content = {} }) => {
  const { type } = content;
  return (
    <Box
      className={classType}
      sx={{
        backgroundColor: content?.mainColor ?? "blue",
        aspectRatio: "1",
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],
          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      {type === "clock" && <Clock content={content} />}
      {type === "text_image" && <div></div>}
      {type === "eyes" && <Eyes />}

      {type === "circle_grid_a"}
    </Box>
  );
};

export default SmallBlock;
