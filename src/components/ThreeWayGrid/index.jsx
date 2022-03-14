/** @jsxImportSource theme-ui */
import { Flex, Grid } from "theme-ui";
import SmallBlock from "./smallBlock/index";
import LargeBlock from "./large";
import { useState } from "react";

const ThreeWayGrid = ({ large, position, smallCollection }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Flex
        sx={{
          ".active": {
            pb: "100%",
          },
          display: ["none", "flex"],
          flexDirection: !position && "row-reverse",
          gridAutoRows: "",
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          gridGap: "1px",
        }}
      >
        <Flex
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            background: "black",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          {smallCollection.map((box) => (
            <SmallBlock className="smallBlock" key={box.sys.id} content={box} />
          ))}
        </Flex>
        <LargeBlock
          active={active}
          handleActivate={() => setActive(!active)}
          content={large}
          position={true}
        />
      </Flex>

      <Grid
        sx={{
          display: ["grid", "none"],
          borderTop: 0,
          gridGap: "1px",
          gridColumn: ["span 2"],
          gridRow: ["span 2"],
        }}
      >
        <LargeBlock content={large} />
        {smallCollection.map((box) => (
          <SmallBlock key={box.sys.id} content={box} />
        ))}
      </Grid>
    </>
  );
};

export default ThreeWayGrid;
