/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui";
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
            background: "white",
            flexDirection: "column",
            div: {
              borderBottom: "1px solid black",
            },
            "div:last-child": {
              borderBottom: "none",
            },
          }}
        >
          {smallCollection.map((box) => (
            <SmallBlock key={box.sys.id} content={box} />
          ))}

          <SmallBlock
            classType={active ? "active" : ""}
            forwardSx={{
              height: 0,
              pb: 0,
              transition: "1s ease",
            }}
          />
        </Flex>
        <LargeBlock
          active={active}
          handleActivate={() => setActive(!active)}
          content={large}
          position={true}
        />
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
