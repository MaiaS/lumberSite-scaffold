/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Box, Grid, Text } from "theme-ui";
import CircleGrid from "./circleGrid";
import Clock from "./clock";
import Eyes from "./eyes";

const SmallBlock = ({ forwardSx, classType, content = {} }) => {
  const { type } = content;
  console.log(content.mainColor, type);
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
      {type === "clock" && <Clock content={content} />}
      {type === "text_image" && <div></div>}
      {type === "eyes" && <Eyes />}

      {type === "circle_grid_bfs" && (
        <>
          <CircleGrid type="bfs" />
        </>
      )}

      {type === "circle_grid_rain" && (
        <>
          <CircleGrid type="rain" />
        </>
      )}

      {type === "circle_grid_paint" && (
        <>
          <CircleGrid type="paint" />
        </>
      )}

      {type === "circle_grid_grow" && (
        <>
          <CircleGrid type="grow" />
        </>
      )}
    </Box>
  );
};

export default SmallBlock;
