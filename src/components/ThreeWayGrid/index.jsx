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
          minHeight: "100%",
          width: "100%",
          gridGap: "1px",
        }}
      >
        {!active && (
          <Flex
            sx={{
              height: "100%",
              width: "100%",
              position: "relative",
              background: "black",
              flexDirection: "column",
              gap: "1px",
              aspectRatio: "1",
            }}
          >
            {smallCollection.map((box) => (
              <SmallBlock
                className="smallBlock"
                key={box.sys.id}
                content={box}
              />
            ))}
          </Flex>
        )}
        <LargeBlock
          forwardSx={{
            width: active ? "100%" : "65%",
            aspectRatio: "3/2",
          }}
          active={active}
          handleActivate={() => setActive(!active)}
          content={large}
          position={true}
        />
      </Flex>

      <LargeBlock
        content={large}
        handleActivate={() => setActive(!active)}
        active={active}
        forwardSx={{
          display: ["block", "none"],
          height: "100%",
          width: "100%",
          aspectRatio: "2/3",
          gridColumn: ["span 2"],
          gridRow: ["span 2"],
        }}
      />

      {smallCollection.map((box) => (
        <SmallBlock
          key={box.sys.id}
          content={box}
          forwardSx={{
            width: "100%",
            height: "100%",
            gridColumn: ["span 2"],
            gridRow: ["span 2"],
            display: ["block", "none"],
          }}
        />
      ))}
    </>
  );
};

export default ThreeWayGrid;
