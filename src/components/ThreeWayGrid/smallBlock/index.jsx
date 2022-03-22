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
  const [display, setDisplay] = useState(false);

  return (
    <motion.div
      initial={true}
      onViewportEnter={() => setDisplay(true)}
      onViewportLeave={() => setDisplay(false)}
      sx={{
        aspectRatio: "1",
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],
          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      {display && (
        <motion.div
          initial={{ opacity: 0.3, scale: 0.3, borderRadius: "50%" }}
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: content?.mainColor ?? "white",
          }}
          animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
          transition={{ borderRadius: { delay: 0.2 } }}
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
        </motion.div>
      )}
    </motion.div>
  );
});

export default memo(SmallBlock);
