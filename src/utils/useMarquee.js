import { useState, useEffect, useLayoutEffect } from "react";

const useMarquee = ({ containerRef, initialElemRef, type }) => {
  console.log(type, containerRef, initialElemRef);
  const [number, setNumber] = useState(5);

  const calculateWidth = (container, elem) => {
    if (!container || !elem) return 5;

    const containerBound = container.getBoundingClientRect();
    const elemBound = elem.getBoundingClientRect();
    if (!elemBound.width || !containerBound.width) return 1;
    const duplicateNum = Math.ceil(
      Math.ceil(containerBound.width / 2) / elemBound.width
    );
    console.log(duplicateNum);
    return duplicateNum;
  };

  const calculateHeight = (container, elem) => {
    if (!container || !elem) return 5;

    const containerBound = container.getBoundingClientRect();
    const elemBound = elem.getBoundingClientRect();
    if (!elemBound.height || !containerBound.height) return 1;
    const duplicateNum = Math.ceil(
      Math.ceil(containerBound.width / 2) / elemBound.height
    );
    console.log(duplicateNum);

    return duplicateNum;
  };

  useEffect(() => {
    if (!initialElemRef?.current || !containerRef?.current) return;
    type === "height"
      ? setNumber(calculateHeight(containerRef.current, initialElemRef.current))
      : setNumber(calculateWidth(containerRef.current, initialElemRef.current));
  }, [initialElemRef, containerRef]);

  useEffect(() => {
    const recalculate = () => {
      type === "height"
        ? setNumber(
            calculateHeight(containerRef?.current, initialElemRef?.current)
          )
        : setNumber(
            calculateWidth(containerRef?.current, initialElemRef?.current)
          );
    };
    window.addEventListener("resize", recalculate, {
      passive: true,
    });
    return () => {
      window.removeEventListener("resize", recalculate);
    };
  }, []);

  return number;
};

export default useMarquee;
