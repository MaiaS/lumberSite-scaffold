/** @jsxImportSource theme-ui */
import { Box, Flex, Text } from "theme-ui";

const RingFeature = ({ list, title }) => {
  const getCircumference = (radius, scale) => {
    return 2 * Math.PI * radius * scale;
  };

  const getChar = (circumference, scale, fontSize) => {
    if (!circumference || !scale || !fontSize) return 1;
    return circumference / (scale * fontSize);
  };

  const generateString = (string, radius, scale, fontSize) => {
    const circumference = getCircumference(radius, scale);
    const minChars = getChar(circumference, scale, fontSize);
    const newChars = Math.max(1, minChars / string.length);
    const newString = string.padStart(string.length + 1, " ").repeat(newChars);

    return `<textPath
    fill="white"
    xlink:href="#circle"
    >
    ${newString}
    </textPath>`;
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: "black",
        height: "100%",
        paddingBottom: "100%",
        overflow: "hidden",
        ".textpath": {
          fontSize: "3px",
        },
        ".brand": {
          fill: "brand",
          zIndex: 1,
        },
        ".circle": {
          stroke: "brand",
        },
      }}
    >
      <Flex
        sx={{
          width: "30%",
          top: "50%",
          left: "50%",

          position: "absolute",
          transform: "translate(-50%, -50%)",
          flexDirection: "justify-center",
        }}
      >
        {list.map((li, i) => {
          return (
            <svg
              key={i + li}
              style={{
                position: "absolute",
                transform: `scale(${
                  2.25 + Math.pow(i, 1.2)
                }) rotate(${Math.floor(Math.random() * 360)}deg)`,
                // transformStyle: "preserve-3d",
              }}
              preserveAspectRatio="none"
              fill="none"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="circle"
                d="
    M 25, 50
    a 25,25 0 1,1 50,0
    a 25,25 0 1,1 -50,0
    "
              />
              <circle
                className="circle"
                strokeWidth={`${(2.25 + Math.pow(i, 1.2)) * 0.009}`}
                strokeDasharray={i % 2 === 0 ? "0" : ".3"}
                cx="50"
                cy="50"
                r="30"
              />
              <text
                className="textpath"
                dangerouslySetInnerHTML={{
                  __html: generateString(li, 50, 1, 3),
                }}
              />
            </svg>
          );
        })}
        <Text
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            textAlign: "center",
            fontSize: ["8px", "clamp(25px, 2vw,42px)"],
            whiteSpace: "nowrap",
            fontWeight: 900,
          }}
        >
          {title}
        </Text>
        <svg
          className="brand"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </Flex>
    </Box>
  );
};

export default RingFeature;
