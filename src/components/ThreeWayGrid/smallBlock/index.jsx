/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import CircleGrid from "./circleGrid";
import Clock from "./clock";
import Eyes from "./eyes";

import { memo, useState } from "react";
import TextImage from "./TextImage";

import { motion } from "framer-motion";

const SmallBlock = memo(function SmallBlock({ forwardSx, content = {} }) {
  const { type } = content;
  const [pause, setPause] = useState(true);

  return (
    <motion.div
      initial={true}
      viewport={{ margin: "1000px" }}
      onViewportEnter={() => setPause(false)}
      onViewportLeave={() => setPause(true)}
      sx={{
        ...forwardSx,
      }}
    >
      <motion.div
        sx={{
          height: "0 !important",
          width: "100%",
          pb: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: content?.mainColor ?? "white",
        }}
      >
        {!pause && (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            {type === "clock" && <Clock content={content} />}

            {type === "text_image" && <TextImage content={content} />}

            {type === "eyes" && <Eyes />}

            {type === "circle_grid_bfs" && <CircleGrid type="bfs" />}

            {type === "circle_grid_rain" && <CircleGrid type="rain" />}

            {type === "circle_grid_paint" && <CircleGrid type="paint" />}

            {type === "circle_grid_grow" && <CircleGrid type="grow" />}
          </Box>
        )}
      </motion.div>
    </motion.div>
  );
});

export default memo(SmallBlock);
