export default {
  styles: {
    root: {
      px: ["20px", "65px"],
      pb: "62px",
    },
  },
  breakpoints: ["768px", "1280px", ""],
  colors: {
    text: "#000",
    background: "#fff",
    brand: "#FFCC08",
    black: "#000",
    white: "#FFF",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  text: {
    logo: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "28.6597px",
      lineHeight: "34px",
      letterSpacing: "0.150043px",
    },
    h1: {
      fontFamily: "heading",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "32px",
      lineHeight: "115%",
      /* identical to box height, or 37px */
      letterSpacing: "-0.02em",
    },
    h6: {
      fontFamily: "heading",
      fontStyle: "normal;",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "30px",
      /* identical to box height, or 214% */
      textTransform: "uppercase",
      letterSpacing: "0.7px",
    },
    marquee: {
      display: ["none", "unset"],
      px: [null, "20px", "33px"],
      m: 0,
      textAlign: "center",
      writingMode: "vertical-rl",
      textOrientation: "mixed",
      fontSize: [null, "30px", "70px"],
      fontFamily: "heading",
    },
  },
  container: {
    background: "white",
    overflow: "hidden",
    border: "1px solid black",
    borderTop: 0,
    borderBottom: "1px solid black",
    mt: 0,
    width: "auto",
    minHeight: "100vh",
  },
};
