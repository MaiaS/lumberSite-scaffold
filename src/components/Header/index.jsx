/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Flex, Text } from "theme-ui";
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
      <Text variant="logo" as="h1" sx={{ flexShrink: 0 }}>
        Lumber
      </Text>
      <Progress scroll={offset} />
      <Text variant="h6" as="h2" sx={{ flexShrink: 0 }}>
        Build with us
      </Text>
    </Flex>
  );
};

export default Header;
