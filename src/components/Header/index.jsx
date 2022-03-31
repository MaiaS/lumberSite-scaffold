/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "theme-ui";
import { Progress } from "../../styled";

const Header = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const scrollEvent = () => {
      setOffset(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
    };
    window.addEventListener("scroll", scrollEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        justifyContent: "space-between",
        backgroundColor: "white",
        height: "74px",
        alignItems: "center",
        borderBottom: "1px solid black",
      }}
    >
      <Link href={"/"}>
        <Text variant="logo" as="h1" sx={{ flexShrink: 0, cursor: "pointer" }}>
          Lumber
        </Text>
      </Link>
      <Progress scroll={offset} sx={{ display: ["none", "initial"] }} />
      <Link href={"mailto:hello@lumber.dev"}>
        <Flex
          sx={{
            "--transition": ".2s",
            cursor: "pointer",
            flexShrink: 0,
            position: "relative",
            alignItems: "center",
            gap: "10px",
            ":hover": {
              ":before": {
                transform: "scale(1)",
              },
              ".headerBall": {
                transform: "scale(1)",
                background: "brand",
              },
            },
            ":before": {
              content: '""',
              width: "100%",
              transition: "var(--transition) ease",
              transform: ["scaleX(1)", "scale(0)"],
              right: "0",
              height: "1px",
              background: "black",
              position: "absolute",
              bottom: "0",
            },
          }}
        >
          <Box
            className="headerBall"
            sx={{
              display: ["none", "initial"],
              background: "black",
              transform: "scale(.7)",
              height: "20px",
              width: "20px",
              borderRadius: "50%",

              transition: ".3s ease",
              transitionDelay: "var(--transition)",
            }}
          ></Box>
          <Text variant="h6" as="h2">
            Build something with us
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Header;
