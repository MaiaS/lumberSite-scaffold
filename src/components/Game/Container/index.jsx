/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui";
import { motion } from "framer-motion";
import { useState } from "react";

const Container = () => {
  const [startTransition, setStartTransition] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: startTransition ? "black" : "brand",
      }}
    >
      {/* remove from DOM after completion */}
      {startTransition && (
        <motion.div
          initial={{
            scale: 0.2,
            opacity: 0.5,
            translateY: -5,
            borderRadius: "50%",
          }}
          onAnimationComplete={() => setStartTransition(false)}
          animate={{
            scale: 1.8,
            opacity: 1,

            translateY: 0,
            borderRadius: 0,
          }}
          transition={{
            type: "spring",
            duration: 1,
            opacity: { duration: 0.5 },
            borderRadius: { delay: 1 },
          }}
          sx={{
            height: "100%",
            mx: "auto",
            aspectRatio: "1",
            backgroundColor: "brand",
          }}
        ></motion.div>
      )}
      {!startTransition && (
        <>
          <motion.div
            initial={{ translateY: -10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            sx={{
              width: "100%",
              background: "white",
              height: "60px",
              position: "absolute",
              borderBottom: "1px solid black",
            }}
          >
            <Flex
              sx={{
                px: "10%",
                height: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ translateY: -5, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Back
              </motion.div>
              <Flex
                sx={{
                  gap: "20px",
                  textTransform: "uppercase",
                  position: "absolute",
                  left: "50%",
                  transform: [0, "translate(-50%)"],
                }}
              >
                <motion.div
                  initial={{ translateY: -5, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Score: 0
                </motion.div>
                <motion.div
                  initial={{ translateY: -5, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Highest: 0
                </motion.div>
              </Flex>
            </Flex>
          </motion.div>
        </>
      )}
    </Box>
  );
};

export default Container;
