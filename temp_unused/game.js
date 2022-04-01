/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";
import Container from "~/components/Game/Container";
import { motion } from "framer-motion";

const Game = () => {
  return (
    <Container>
      <motion.div
        initial={{ translateY: -10, opacity: 0.3 }}
        animate={{ translateY: 0, opacity: 1 }}
      >
        <Text as="h2" sx={{ fontSize: "14px", textTransform: "uppercase" }}>
          Gravity Game
        </Text>
      </motion.div>
      <motion.div
        initial={{ translateY: -10, opacity: 0.3 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Text as="h3" sx={{ fontSize: ["38px", "40px"], textAlign: "center" }}>
          Control Gravity with your phone
        </Text>
      </motion.div>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        sx={{
          display: "flex",
          height: "110px",
          cursor: "pointer",
          width: "110px",
          background: "black",
          borderRadius: "50%",
          color: "white",
          fontWeight: 700,
          fontSize: "24px",
          justifyContent: "center",
          alignItems: "center",
          bottom: ["110px", "200px"],
          position: "absolute",
          isolation: "isolate",
          zIndex: 1,
          ":after": {
            content: '""',
            height: "100%",
            width: "100%",
            position: "absolute",

            zIndex: -1,
            borderRadius: "50%",
            background: "black",
          },
          ":before": {
            content: '""',
            height: "100%",
            width: "100%",
            position: "absolute",
            p: "12px",
            zIndex: -999,
            borderRadius: "50%",
            background: "rgba(0,0,0,.08)",
          },
        }}
      >
        Start
      </motion.div>
    </Container>
  );
};

export default Game;
