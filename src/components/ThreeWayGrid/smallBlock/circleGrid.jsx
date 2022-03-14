import { useRef, useState } from "react";
import { Box, Grid } from "theme-ui";

const CircleGrid = ({ type }) => {
  const [gridArray, setGridArray] = useState(
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(false))
  );

  const flipHelper = (i, j, bool, skipSet) => {
    if (
      i < 0 ||
      i >= gridArray.length ||
      j < 0 ||
      j >= gridArray[i].length ||
      gridArray[i][j] === bool
    ) {
      return;
    }
    gridArray[i][j] = bool;
    !skipSet && setGridArray([...gridArray]);
  };

  const BFSFlip = (i, j, bool) => {
    if (
      i < 0 ||
      i >= gridArray.length ||
      j < 0 ||
      j >= gridArray[i].length ||
      gridArray[i][j] === bool
    ) {
      return;
    }

    requestAnimationFrame(() => {
      gridArray[i][j] = bool;
      setGridArray([...gridArray]);
      BFSFlip(i - 1, j, bool);
      BFSFlip(i + 1, j, bool);
      BFSFlip(i, j - 1, bool);
      BFSFlip(i, j + 1, bool);
    });
  };

  const paintFlip = (i, j, bool) => {
    if (
      i < 0 ||
      i >= gridArray.length ||
      j < 0 ||
      j >= gridArray[i].length ||
      gridArray[i][j] === bool
    ) {
      return;
    }
    requestAnimationFrame(() => {
      gridArray[i][j] = bool;
      setGridArray([...gridArray]);
    });
  };

  const growFlip = (i, j, bool) => {
    requestAnimationFrame(() => {
      flipHelper(i, j, bool, true);
      flipHelper(i - 1, j, bool, true);
      flipHelper(i + 1, j, bool, true);
      flipHelper(i, j - 1, bool, true);
      flipHelper(i, j + 1, bool, true);
      flipHelper(i + 1, j + 1, bool, true);
      flipHelper(i - 1, j - 1, bool, true);
      flipHelper(i + 1, j - 1, bool, true);
      flipHelper(i - 1, j + 1, bool, true);
      setGridArray([...gridArray]);
    });
  };

  const recursiveFlip = (index, j, bool) => {
    if (index >= gridArray.length) return;
    flipHelper(index++, j, bool);
    setTimeout(() => {
      recursiveFlip(index, j, bool);
    }, 300);
  };
  const rainFlip = (j) => {
    window.clearTimeout();
    let index = 0;
    window.setTimeout(() => {
      recursiveFlip(index, j, true);
    }, 0);
    window.setTimeout(() => {
      recursiveFlip(index, j, false);
    }, 1000);
  };

  const handleFlipper = (i, j, bool) => {
    type === "bfs" &&
      gridArray.every((arr) => arr.every((v) => v === !bool)) &&
      BFSFlip(i, j, bool);
    type === "paint" && paintFlip(i, j, bool);
    type === "grow" && growFlip(i, j, bool);
    type === "rain" && rainFlip(j);
  };

  const CircleGrid = (gridArray) => {
    return (
      gridArray &&
      gridArray.map((grid, i) =>
        grid.map((flip, j) => (
          <Circle
            key={j}
            flip={flip}
            i={i}
            j={j}
            handleFlipEnter={handleFlipper}
            handleFlipLeave={
              type === "paint" || type === "rain" ? null : handleFlipper
            }
            grow={type === "grow"}
            paint={type === "paint"}
          />
        ))
      )
    );
  };

  return (
    <Grid
      sx={{
        gridTemplateColumns: "repeat(5, 1fr)",
        height: "100%",
        width: "100%",
        gap: 0,
        padding: "11%",
      }}
    >
      {CircleGrid(gridArray)}
    </Grid>
  );
};

const Circle = ({
  flip,
  i,
  j,
  handleFlipEnter,
  handleFlipLeave,
  grow,
  paint,
}) => {
  const circleRef = useRef();

  const [scale] = useState(0.8);

  // fix with springs.

  const handleFlip = () => {
    handleFlipEnter(i, j, paint ? !flip : true);
  };
  const handleLeave = () => {
    if (handleFlipLeave) handleFlipLeave(i, j, false);
  };

  return (
    <Box
      ref={circleRef}
      onMouseEnter={handleFlip}
      onMouseLeave={handleLeave}
      onTouchStart={handleFlip}
      onTouchEnd={handleLeave}
      sx={{
        height: "100%",
        width: "100%",
        perspective: "1000px",
        overflow: "hidden",
        position: "relative",
        transformStyle: "preserve-3d",
        ":hover": {
          ".back, .front": {
            transform: grow && `scale(.3)`,
          },
        },
      }}
    >
      <Box
        className="back"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          transform: !grow
            ? flip
              ? "rotate(-80deg)"
              : "rotateY(180deg)"
            : flip
            ? `scale(${scale})`
            : "scale(1)",
          backgroundColor: "brand",
          borderRadius: "50%",
          transition: grow ? ".5s cubic-bezier(.17,.67,0,1.06)" : ".5s ease",
          // transitionDelay: `${i + j}s`,
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      />

      <Box
        className="front"
        sx={{
          position: "absolute",

          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          transform: !grow
            ? flip
              ? "rotateY(180deg)"
              : "rotate(-80deg)"
            : flip
            ? `scale(${scale})`
            : "scale(1)",
          transition: grow ? ".5s cubic-bezier(.17,.67,0,1.06)" : ".5s ease",
          // transitionDelay: `${i + j}s`,
          backgroundColor: "black",
          borderRadius: "50%",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      />
    </Box>
  );
};

export default CircleGrid;
