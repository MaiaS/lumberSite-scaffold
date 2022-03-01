/** @jsxImportSource theme-ui */
import { Grid, Flex } from "theme-ui";

import SmallBlock from "./small";
import LargeBlock from "./large";

const ThreeWayGrid = ({ large, smallCollection }) => {
  console.log(smallCollection);
  return (
    <>
      <Flex
        sx={{
          display: ["none", "flex"],

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
            background: "white",
            flexDirection: "column",
            "div:first-child": {
              borderBottom: "1px solid black",
            },
          }}
        >
          {smallCollection.map((box) => (
            <SmallBlock key={box.sys.id} content={box} />
          ))}
        </Flex>
        <LargeBlock content={large} position={true} />
      </Flex>

      <>
        <LargeBlock
          content={large}
          forwardSx={{ display: ["block", "none"] }}
        />
        {smallCollection.map((box) => (
          <SmallBlock
            key={box.sys.id}
            content={box}
            forwardSx={{ display: ["block", "none"] }}
          />
        ))}
      </>
    </>
  );
};

export default ThreeWayGrid;
