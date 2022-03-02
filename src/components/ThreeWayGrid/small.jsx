/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const SmallBlock = ({ forwardSx, classType, content = {} }) => {
  console.log(content);
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
      {type === "clock" && (
        <Box
          sx={{
            height: "75%",
            width: "75%",
            my: "12.5%",
            mx: "auto",
            borderRadius: "50%",
            backgroundColor: content.secondaryColor,
          }}
        ></Box>
      )}
      {type === "text_image" && <div></div>}
      {type === "eyes" && <div></div>}
      {type === "circle_grid_a"}
    </Box>
  );
};

export default SmallBlock;
