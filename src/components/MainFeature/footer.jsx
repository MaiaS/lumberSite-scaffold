/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useState } from "react/cjs/react.production.min";
import { Box, Grid, Flex, Text, Button } from "theme-ui";
import Marquee from "../Generic/Marquee";
import FeatureContent from "./feature";

const Footer = ({ title, email }) => {
  const gridArray = Array(69).fill(0);

  return (
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
              sx={{
                m: center && "5%",
                height: center ? "90%" : "100%",
                width: center ? "90%" : "100%",
                transform: "rotate(-30deg)",
                gridRow: center && "span 2",
                gridColumn: center && "span 2",
                aspectRatio: "1",
                background: center ? "brand" : "black",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {center && <Text sx={{ fontSize: "30px" }}>Play</Text>}
            </Flex>
          );
        })}
      </Grid>
      <Flex
        sx={{ justifyContent: "center", flexDirection: "column", mb: "20px" }}
      >
        <Text
          as="h4"
          sx={{ fontSize: "70px", fontWeight: "bold", letterSpacing: "-.3rem" }}
        >
          Let's chat
        </Text>
        <Link href={"google.com"}>
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
            Hello@lumber.dev
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
