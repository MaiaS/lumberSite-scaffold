/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import CircleGrid from "./circleGrid";
import Clock from "./clock";
import Eyes from "./eyes";

import { memo } from "react";
import TextImage from "./TextImage";

const SmallBlock = memo(function SmallBlock({
  forwardSx,
  classType,
  content = {},
}) {
  const { type } = content;

  return (
    <Box
      className={classType}
      sx={{
        backgroundColor: content?.mainColor ?? "white",
        ...forwardSx,
      }}
    >
      <Box
        sx={{
          height: "0 !important",
          width: "100%",
          pb: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ height: "100%", width: "100%", position: "absolute" }}>
          {type === "clock" && <Clock content={content} />}

          {type === "text_image" && <TextImage content={content} />}

          {type === "eyes" && <Eyes />}

          {type === "circle_grid_bfs" && <CircleGrid type="bfs" />}

          {type === "circle_grid_rain" && <CircleGrid type="rain" />}

          {type === "circle_grid_paint" && <CircleGrid type="paint" />}

          {type === "circle_grid_grow" && <CircleGrid type="grow" />}
        </Box>
      </Box>
    </Box>
  );
});

export default memo(SmallBlock);
