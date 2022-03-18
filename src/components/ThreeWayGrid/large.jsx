/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Text } from "theme-ui";
import ResponsiveImage from "../Generic/ResponsiveImage";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useMedia } from "react-use";
import ArrowBack from "/public/assets/images/arrow-back.svg";
import { useState } from "react";

const LargeBlock = ({ forwardSx, handleActivate, active, content }) => {
  const mainImage = content?.mainImage ?? content?.client?.image;

  return (
    <Box
      sx={{
        cursor: "url('/assets/cursor/GoCursor.svg'), auto",
        overflow: "hidden",
        aspectRatio: ["auto"],
        backgroundColor: "white",
        position: "relative",
        zIndex: 2,
        gridColumn: ["1 / span 2"],
        gridRow: ["1 / span 2"],
        filter: "grayscale(100)",
        transition: "1s ease",
        flexShrink: 0.0,
        minHeight: "100%",
        flexGrow: 0,
        ":hover": {
          filter: "grayscale(0)",
        },
        "@supports not (aspect-ratio:1)": {
          height: [0, "auto"],

          pb: "100%",
        },
        ...forwardSx,
      }}
    >
      <AnimatePresence inital={false}>
        {!active && (
          <Unactivated
            mainImage={mainImage}
            content={content}
            handleActivate={handleActivate}
          />
        )}
      </AnimatePresence>
      {active && <Activated content={content} close={handleActivate} />}
    </Box>
  );
};

const Unactivated = ({ mainImage, content, handleActivate }) => {
  return (
    <Container
      onClick={handleActivate}
      variant="container.largeBlock"
      sx={{ height: "100%" }}
    >
      <motion.div
        sx={{
          height: ["75%", "60%"],
          maxHeight: "500px",
          borderRadius: "24px",
          overflow: "hidden",
          mb: ["14px", "32px"],
          zIndex: 2,
          position: "relative",
        }}
        initial={{ scale: 2, translateY: -50, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        exit={{ scale: 2, translateY: 100, opacity: 0.3 }}
      >
        <Box
          sx={{
            height: "100%",
            filter: "grayscale(0)",

            span: {
              position: "static !important",
            },
          }}
        >
          <ResponsiveImage height="100%" width="100%" image={mainImage} />
        </Box>
      </motion.div>
      <Text sx={{ fontWeight: 700, fontSize: ["clamp(20px, 5vw, 32px)"] }}>
        {content.title}
      </Text>

      <Box
        sx={{
          display: "inline",
          height: "40px",
          minWidth: "100%",
          transition: "1s ease",
          background: "red",
        }}
      ></Box>

      <Flex
        sx={{
          display: ["flex"],
          gap: "5px",
          position: "absolute",
          bottom: "4%",
        }}
      >
        {content.tags.map((tag, i) => (
          <Tag tag={tag} key={`${tag}-${i}`} />
        ))}
      </Flex>
    </Container>
  );
};

const Activated = ({ content, close }) => {
  const [page, setPage] = useState(0);
  const x = useMotionValue(0);
  const [xAnim, setxAnim] = useState(x);

  const list = content.client.clientPageCollection.items;

  const handleDragDirection = (i) => {
    const offset = i.offset.x;
    if (offset < 30) {
      setxAnim(-100);
      if (page >= list.length - 1) {
        close();
        return;
      }
      setPage(page + 1);
    }
    if (offset > 30) {
      setxAnim(100);
      if (page <= 0) {
        close();
        return;
      }
      setPage(page - 1);
    }
  };
  const handleClick = (next) => {
    if (next) {
      setxAnim(-50);
      if (page >= list.length - 1) {
        close();
        return;
      }
    }
    setPage(page + 1);
    if (!next) {
      if (page <= 0) {
        close();
        return;
      }
      setxAnim(50);

      setPage(page - 1);
    }
  };
  const mobile = useMedia("(max-width:767px)");

  return (
    <Box
      sx={{
        minHeight: "100%",
        width: "100%",
        position: "relative",
        background:
          (page < list.length && page > -1 && list[page]?.color) ?? "black",
      }}
    >
      {!mobile && <Arrow handleClick={() => handleClick(false)} next />}
      {!mobile && <Arrow handleClick={() => handleClick(true)} />}

      <AnimatePresence initial={true}>
        {list.map((li, i) => {
          return (
            i === page && (
              <motion.div
                key={li.sys.id}
                drag="x"
                onDragEnd={(e, i) => handleDragDirection(i)}
                dragMomentum={true}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                dragElastic={0.5}
                dragConstraints={{ left: 0, right: 0 }}
                initial={{
                  x: xAnim,
                  opacity: 0,
                  scale: 0.9,
                  rotateY: xAnim * 0.5,
                }}
                animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
                // exit={{ x: xAnim, opacity: 0, scale: 0.9, rotateY: -xAnim / 2 }}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,

                  width: "100%",
                  height: "100%",
                }}
              >
                <ClientPage content={content} current={li} mobile={mobile} />
              </motion.div>
            )
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

const Arrow = ({ handleClick, next }) => {
  return (
    <Box
      sx={{
        left: next && 0,
        right: !next && 0,
        height: "100%",
        position: "absolute",
        p: "70px",
        zIndex: 1,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.3, translateX: next ? -10 : 10 }}
        sx={{
          borderRadius: "50%",
          background: "white",
          height: "60px",
          width: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          sx={{
            transform: next ? "scale(-1)" : "scale(1)",
            mt: next ? "-3px" : "3px",
          }}
        >
          <ArrowBack fill="white" />
        </div>
      </motion.div>
    </Box>
  );
};

const ClientPage = ({ content, current, mobile }) => {
  const { type } = current;
  return (
    <Flex
      sx={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {type === "fullWidthImage" && (
        <ResponsiveImage
          image={current.media}
          heightOut={mobile ? 4500 : null}
          drag={false}
          forwardSx={{
            height: "100%",
          }}
        />
      )}
      {type === "image" && (
        <Box
          sx={{
            width: "80%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "10px 10px 30px 0px rgba(0,0,0,.3)",
          }}
        >
          <ResponsiveImage image={current.media} drag={false} />
        </Box>
      )}
      {type === "description" && (
        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Text
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {content.title}
          </Text>
          <Text
            sx={{
              display: "inline",
              fontSize: "52px",
              lineHeight: "65px",
              mx: "auto",
              width: [null, "62%"],
            }}
          >
            {current.description}
          </Text>
          <Flex sx={{ justifyContent: "center", gap: "8px" }}>
            {content.tags.map((tag, i) => (
              <Tag tag={tag} key={`${tag}-${i}`} />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

const Tag = ({ tag }) => {
  return (
    <Box
      sx={{
        fontSize: "13px",
        px: "10px",
        m: 0,
        py: "4px",
        borderRadius: "4px",
        width: "fit-content",
        textTransform: "uppercase",
        background: "rgba(0, 0, 0, 0.08)",
        // backgroundColor: getRandomColor(0.8),
      }}
    >
      {tag}
    </Box>
  );
};

export default LargeBlock;
