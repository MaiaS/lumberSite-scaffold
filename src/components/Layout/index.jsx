/** @jsxImportSource theme-ui */
import { Box, Container, Text, Flex } from "theme-ui";
import Header from "../Header";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { GameStartContext } from "../Context/GameStartContext";
import { useContext } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const loadGame = () => {
    router.push("/game");
  };

  const { startGamePage } = useContext(GameStartContext);
  return (
    <>
      {startGamePage && (
        <motion.div
          onAnimationComplete={() => loadGame()}
          initial={{ scale: 0, borderRadius: "25%" }}
          animate={{ scale: 1, borderRadius: 0 }}
          transition={{
            type: "spring",
            borderRadius: { delay: 0.3 },
            delay: 1,
          }}
          sx={{
            height: "100vh",
            width: "100vw",
            background: "black",
            position: "fixed",
            zIndex: 999,
          }}
        ></motion.div>
      )}
      <div sx={{ px: ["20px", "65px"], pb: "62px" }}>
        <Header />

        <Container>
          <Box
            sx={{
              display: ["grid"],
              gridTemplateColumns: ["1fr", "1fr"],
              gridGap: "1px",
              backgroundColor: "black",
            }}
          >
            {children}
          </Box>
        </Container>
        <Copyright />
      </div>
    </>
  );
};

const Copyright = () => {
  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <Text as="p">Made In Brooklyn</Text>
      <Text as="p">© 2022 Lumber. All rights reserved</Text>
    </Flex>
  );
};

export default Layout;
