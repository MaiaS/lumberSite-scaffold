/** @jsxImportSource theme-ui */

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useContext } from "react";
import { Box, Grid, Flex, Text, Button } from "theme-ui";
import Marquee from "../Generic/Marquee";
import FeatureContent from "./feature";
import { GameStartContext } from "../Context/GameStartContext";

const Footer = ({ title, email }) => {
  const gridArray = Array(69).fill(0);
  const [start, setStart] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const { setStartGamePage } = useContext(GameStartContext);
  const handleTransition = () => {
    setStartGamePage(true);
  };

  return (
    <Box
      sx={{
        background: showGame && "black",
        height: "100%",
        width: "100%",
      }}
    >
      {!showGame && (
        <Flex
          sx={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Grid
            sx={{
              justifyContent: "center",
              alignContent: "center",
              gridTemplateColumns: "repeat(auto-fit, 8%)",
              gap: 0,
              width: "90%",
              gridAutoFlow: "dense",
              minHeight: "70%",
            }}
          >
            {gridArray.map((g, i) => {
              const center = i === Math.round(gridArray.length / 2.4);
              return (
                <Flex
                  onClick={() => setStartGamePage(true)}
                  sx={{
                    cursor: center && "pointer",
                    m: center && "5%",
                    height: center ? "90%" : "100%",
                    width: center ? "90%" : "100%",
                    transform: center ? "rotate(-0deg)" : start && "scale(20)",
                    gridRow: center && "span 2",
                    gridColumn: center && "span 2",
                    aspectRatio: "1",
                    background: center ? "brand" : "black",
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: center ? ".3s ease" : ".7s ease",
                    ":hover": {
                      transform: center && "rotate(-30deg) scale(.9)",
                    },
                  }}
                >
                  {center && <Text sx={{ fontSize: "30px" }}>Play</Text>}
                </Flex>
              );
            })}
          </Grid>
          <Flex
            sx={{
              justifyContent: "center",
              flexDirection: "column",
              mb: "20px",
            }}
          >
            <Text
              as="h4"
              sx={{
                fontSize: "70px",
                fontWeight: "bold",
                letterSpacing: "-.3rem",
              }}
            >
              {title}
            </Text>
            <Link href={`mailto:${email}`}>
              <Button
                sx={{
                  cursor: "pointer",
                  boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  py: "16px",
                  px: "50px",
                  mx: "auto",
                  maxWidth: "80%",
                  borderRadius: "25px",
                  background: "white",
                  transition: ".3s ease",
                  ":hover": {
                    background: "white",
                    border: "none",
                    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {email}
              </Button>
            </Link>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Footer;
