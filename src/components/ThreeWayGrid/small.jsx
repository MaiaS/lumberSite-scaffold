/** @jsxImportSource theme-ui */
import { Box, Text } from "theme-ui";

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
      {type === "clock" && (
        <Box
          sx={{
            height: "75%",
            width: "75%",
            my: "12.5%",
            position: "relative",
            mx: "auto",
            borderRadius: "50%",
            backgroundColor: content.secondaryColor,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textTransform: "center",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Text
              variant="logo"
              sx={{
                fontSize: "clamp(20px, 3vw, 72px)",
                lineHeight: "clamp(20px, 3vw, 72px)",
                verticalAlign: "middle",
              }}
            >
              Potato
            </Text>
          </Box>
          <Box
            sx={{
              borderRadius: "30px",
              width: "46%",
              height: "8px",
              backgroundColor: "black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateY(-50%)",
              transformOrigin: "left",
            }}
          />

          <Box
            sx={{
              borderRadius: "30px",
              width: "46%",
              height: "2px",
              backgroundColor: "black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateY(-50%) rotate(20deg)",
              transformOrigin: "left",
            }}
          />
          <Box
            sx={{
              borderRadius: "30px",
              width: "35%",
              height: "8px",
              backgroundColor: "black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateY(-50%) rotate(40deg)",
              transformOrigin: "left",
            }}
          />
          {[...Array(12)].map((e, i) => (
            <Box
              key={`${e}-${i}`}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                // background: "blue",
                border: "none !important",
                transform: `rotate(${(359 / 12) * i + 1}deg)`,
              }}
            >
              <Box
                sx={{
                  height: "10px",
                  width: "2px",
                  background: "black",
                  bottom: "10px",
                  left: "50%",
                  position: "absolute",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
      {type === "text_image" && <div></div>}
      {type === "eyes" && <div></div>}
      {type === "circle_grid_a"}
    </Box>
  );
};

export default SmallBlock;
