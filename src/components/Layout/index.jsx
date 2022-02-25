/** @jsxImportSource theme-ui */
import { Box, Container } from "theme-ui";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: ["grid"],
            gridTemplateColumns: [
              "repeat(auto-fit, minmax(200px, 1fr))",
              "1fr",
            ],
            gridGap: "1px",
            backgroundColor: "black",
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
