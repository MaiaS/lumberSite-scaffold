/** @jsxImportSource theme-ui */
import { Box, Text, Flex } from "theme-ui";
import { useState, memo, useEffect } from "react";
import { keyframes } from "@emotion/react";
import { linearScale } from "~/utils/linearScale";

const Clock = memo(function MemoClock({ content }) {
  const _date = new Date();

  const [date, setDate] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [hours, setHours] = useState(null);

  useEffect(() => {
    // if time zone set date to ... else set date to now.
    if (!date) {
      setDate(
        new Date(
          _date.toLocaleString("en-US", {
            timeZone: content?.timeZone,
          })
        )
      );
    } else {
      setSeconds(date.getSeconds());
      setMinutes(date.getMinutes());
      setHours(date.getHours());
    }
  }, [date]);

  // Set up animation and calculations
  const secStart = linearScale(seconds, 0, 60, 0, 360) + 45;
  const minStart = linearScale(minutes + seconds / 60, 0, 60, 0, 360) + 45;
  const hourStart =
    linearScale((hours + minutes / 60 + seconds / 3600) % 12, 0, 12, 0, 360) +
    45;

  const hourAnim = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(${hourStart}deg);
  },
100% {
    transform: translate(-50%, -50%) rotate(${hourStart + 360}deg);
  }`;
  const minuteAnim = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(${minStart}deg);
  },
  100% {
    transform: translate(-50%, -50%) rotate(${minStart + 360}deg);
  }`;
  const secondAnim = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(${secStart}deg);

  },
  100% {
    transform: translate(-50%, -50%) rotate(${secStart + 360}deg);
  }`;

  return (
    <Box
      sx={{
        ".hours": {
          animation: `86400s linear  infinite ${hourAnim}`,
          animationDelay: ".5s",
          transform: `translate(-50%, -50%) rotate(${
            linearScale(hours % 12, 0, 12, 0, 360) + 45
          }deg)`,
        },
        ".minutes": {
          animation: ` 3600s linear  infinite ${minuteAnim}`,
          animationDelay: ".5s",
          transform: `translate(-50%, -50%) rotate(${
            linearScale(minutes, 0, 60, 0, 360) + 45
          }deg)`,
        },
        ".seconds": {
          animation: `60s linear infinite ${secondAnim}`,
          animationDelay: ".5s",

          transform: `translate(-50%, -50%) rotate(${
            linearScale(30, 0, 60, 0, 360) + 45
          }deg)`,
        },
        height: "75%",
        width: "75%",
        top: "12.5%",
        position: "relative",
        overflow: "hidden",
        border: "10px solid",
        borderColor: content?.secondaryColor ?? "brand",
        mx: "auto",
        borderRadius: "50%",
        backgroundColor: content?.secondaryColor ?? "brand",
      }}
    >
      <Flex
        sx={{
          width: "100%",
          height: "100%",

          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Text
          as="p"
          variant="logo"
          sx={{
            mt: "1rem",
            fontSize: "clamp(20px, 3vw, 72px)",
            lineHeight: "clamp(20px, 3vw, 72px)",
          }}
        >
          {content?.title}
        </Text>
        <Text
          as="p"
          sx={{
            fontSize: "clamp(8px, 2vw, 52px)",
            lineHeight: "clamp(8px, 2vw, 52px)",
          }}
        >
          {content?.subtitle}
        </Text>
      </Flex>
      {typeof seconds === "number" &&
        typeof minutes === "number" &&
        typeof hours === "number" && (
          <>
            <div
              sx={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            >
              <Seconds mainColor={content?.mainColor} />
              <Minutes mainColor={content?.mainColor} />
              <Hours mainColor={content?.mainColor} />
            </div>
          </>
        )}

      <>
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            zIndex: 0,
            top: "50%",
            left: "50%",
            transform: ` translate(-50%, -50%) rotate(45deg)`,
            transformOrigin: "center",
          }}
        >
          {[...Array(12)].map((e, i) => (
            <line
              key={`${e}-${i}`}
              x1="82"
              y1="82"
              x2="100"
              y2="100"
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 0.7,
                transform: `rotate(${(359 / 12) * i + 1}deg)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </svg>
      </>
    </Box>
  );
});

const Seconds = ({ mainColor }) => {
  return (
    <>
      <svg
        className="seconds"
        height="100%"
        width="100%"
        viewBox="50 50 100 100"
        style={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transformOrigin: "center",
        }}
      >
        <line
          x1="70"
          y1="70"
          x2="100"
          y2="100"
          style={{
            stroke: mainColor ?? "black",
            strokeWidth: 0.7,
          }}
        />
      </svg>
    </>
  );
};

const Minutes = ({ mainColor }) => {
  return (
    <>
      <svg
        className="minutes"
        height="100%"
        width="100%"
        viewBox="50 50 100 100"
        style={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transformOrigin: "center",
        }}
      >
        <line
          x1="66"
          y1="66"
          x2="100"
          y2="100"
          style={{
            stroke: mainColor ?? "black",
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
        />
      </svg>
    </>
  );
};

const Hours = ({ mainColor }) => {
  return (
    <>
      <svg
        className="hours"
        height="100%"
        width="100%"
        viewBox="50 50 100 100"
        style={{
          position: "absolute",

          zIndex: 1,
          top: "50%",
          left: "50%",
          transformOrigin: "center",
        }}
      >
        <line
          x1="75"
          y1="75"
          x2="100"
          y2="100"
          style={{
            stroke: mainColor ?? "black",
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
        />
      </svg>
    </>
  );
};

export default memo(Clock);
