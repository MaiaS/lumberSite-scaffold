import { useRef, useState } from "react";
import { Box, Grid } from "theme-ui";
import { motion } from "framer-motion";
import { useMedia } from "react-use";

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
    }, 1000);
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

  const mobile = useMedia("(any-hover: none)");

  const [selected, setSelected] = useState(false);

  // fix with springs.

  const handleFlip = () => {
    setSelected(true);
    handleFlipEnter(i, j, paint ? !flip : true);
  };
  const handleLeave = () => {
    setSelected(false);
    if (handleFlipLeave) handleFlipLeave(i, j, !flip);
  };

  const variants = {
    open: { scale: 1 },
    closed: { scale: 0.7 },
    selected: { scale: 0.3 },
  };

  return (
    <Box
      onMouseEnter={handleFlip}
      onMouseLeave={handleLeave}
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <motion.div
        onDragEnter={handleFlip}
        onTouchEnd={handleLeave}
        inital={true}
        animate={grow && (selected ? "selected" : flip ? "closed" : "open")}
        variants={variants}
        // animate={{ scale: 0.7 }}
        style={{ height: "100%", width: "100%" }}
        transition={{
          type: mobile ? "tween" : "spring",
          duration: mobile ? 0.5 : "none",
        }}
      >
        <Box
          ref={circleRef}
          sx={{
            height: "100%",
            width: "100%",
            perspective: "1000px",
            overflow: "hidden",
            position: "relative",
            transformStyle: "preserve-3d",
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
              transform: !grow && flip ? "rotate(-80deg)" : "rotateY(180deg)",

              transition: ".5s ease",
              backgroundColor: "brand",
              borderRadius: "50%",

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
              transform: !grow && flip ? "rotateY(180deg)" : "rotate(-80deg)",

              transition: ".5s ease",

              backgroundColor: "black",
              borderRadius: "50%",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default CircleGrid;
