/** @jsxImportSource theme-ui */
import { Grid } from "theme-ui";

import SmallBlock from "./small";
import LargeBlock from "./large";

const ThreeWayGrid = ({ largeBox, smallCollection }) => {
  return (
    <>
      <Grid
        sx={{
          display: ["none", "grid"],
          gridAutoRows: "",
          backgroundColor: "black",
          gridGap: "1px",
          direction: "rtl", // ltr to switch positions
        }}
      >
        {smallCollection.map((box) => (
          <SmallBlock key={box.id} />
        ))}
        <LargeBlock position={true} />
      </Grid>
      <>
        <LargeBlock forwardSx={{ display: ["block", "none"] }} />
        {smallCollection.map((box) => (
          <SmallBlock key={box.id} forwardSx={{ display: ["block", "none"] }} />
        ))}
      </>
    </>
  );
};

export default ThreeWayGrid;
