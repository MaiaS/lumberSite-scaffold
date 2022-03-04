/** @jsxImportSource theme-ui */
import { Box, Flex, Text } from "theme-ui";

const Eyes = ({ content }) => {
  return (
    <Flex sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: "25%",
          width: "25%",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",

            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              height: "25%",
              width: "25%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -170%)",
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
          ></Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "25%",
          width: "25%",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            clipPath: "path('M44, 75 a39,35 0 1,0 -10,0')",

            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              height: "25%",
              width: "25%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -170%)",
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
          ></Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Eyes;
