/** @jsxImportSource theme-ui */
import { Box, Text, Flex } from "theme-ui";

const Marquee = ({ text }) => {
  const list = text.split(" ");

  const totalLetters = text.replace(" ", "").length;

  return (
    <Box
      sx={{
        display: ["none", "unset"],
        backgroundColor: "brand",
        whiteSpace: "nowrap",
        overflow: "hidden",

        flexGrow: 1,
        position: "relative",
        zIndex: 3,
        maxWidth: "100px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          "@keyframes slideDown": {
            "0%": {
              transform: "translate(0%, -100%)",
              opacity: 1,
            },
            "100%": {
              transform: "translate(0%, 0%)",
              opacity: 1,
            },
          },
          ".marquee": {
            animation: "slideDown 10s linear infinite",
            height:
              totalLetters > 10
                ? `calc(100% + ${totalLetters * 2.5}ch)`
                : "100%",
            display: "flex",
            flexWrap: "nowrap",

            flexDirection: "column",
          },
          ".container": {
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            justifyContent: "space-around",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            gap: "1ch",
          },
        }}
      >
        <div className="marquee">
          <MarqueeContent list={list} />
          <MarqueeContent list={list} />
        </div>
      </Box>
    </Box>
  );
};

const MarqueeContent = ({ list, forwardSx }) => {
  return (
    <Flex
      className="container"
      sx={{
        ...forwardSx,
      }}
    >
      {list.map((li, i) => (
        <Text
          key={`${li}-${i}`}
          variant="marquee"
          dangerouslySetInnerHTML={{ __html: li }}
        />
      ))}
    </Flex>
  );
};

export default Marquee;
