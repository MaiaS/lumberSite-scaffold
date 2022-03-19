import { useState, createContext } from "react";

export const GameStartContext = createContext();

export const GameStartProvider = (props) => {
  const { children } = props;
  const [startGamePage, setStartGamePage] = useState(false);

  const returnValues = {
    startGamePage,
    setStartGamePage,
  };

  return (
    <GameStartContext.Provider value={returnValues}>
      {children}
    </GameStartContext.Provider>
  );
};

export default GameStartProvider;
