/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import CircleGrid from "./circleGrid";
import Clock from "./clock";
import Eyes from "./eyes";

import { memo } from "react";
import TextImage from "./TextImage";

import { motion } from "framer-motion";

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
        aspectRatio: "1",
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],
          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      <Box sx={{ height: "100%", width: "100%", aspectRatio: "1" }}>
        {type === "clock" && <Clock content={content} />}

        {type === "text_image" && <TextImage content={content} />}

        {type === "eyes" && <Eyes />}

        {type === "circle_grid_bfs" && <CircleGrid type="bfs" />}

        {type === "circle_grid_rain" && <CircleGrid type="rain" />}

        {type === "circle_grid_paint" && <CircleGrid type="paint" />}

        {type === "circle_grid_grow" && <CircleGrid type="grow" />}
      </Box>
    </Box>
  );
});

export default memo(SmallBlock);
