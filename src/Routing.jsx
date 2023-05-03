import { Routes, Route } from "react-router-dom";
import React from "react";
//Default Route
import Entrance from "./routes/entrance";
// Playground imports
import Playground from "./routes/playground";
import IndexPlayground from "./routes/playground/indexplayground";
import TemplatePlayground from "./routes/playground/templateplayground";

// Play imports
import Play from "./routes/play";
import ArtByLine from "./routes/play/artbyline/sketch";
import ChaseTheBall from "./routes/play/chasetheball/sketch";
import TicTacToe from "./routes/play/tictactoe/sketch";
import Snake from "./routes/play/snake/sketch";
import ThePong from "./routes/play/thepong/sketch";
import MusicVisualizer from "./routes/play/musicvisualizer/sketch";
import TagGame from "./routes/play/taggame/sketch";
// import MusicVisualizer from "./routes/play/musicvisualizer/sketch";
// import Snake from "./routes/play/snake/sketch";
/// HERE TO COMMENT OUT
// import Casino from "./routes/play/artbyline/sketch";

/// END
import gameDatabase from "./routes/playground/database.json";

export default function Routing() {
  const gameComponents = {
    artbyline: ArtByLine,
    chasetheball: ChaseTheBall,
    tictactoe: TicTacToe,
    snake: Snake,
    thepong: ThePong,
    musicvisualizer: MusicVisualizer,
    taggame: TagGame,
  };

  return (
    <main className="w-screen h-screen bg-main font-chakra color">
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route
          path="/playground"
          element={<Playground gameDatabase={gameDatabase} />}
        >
          <Route index element={<IndexPlayground />} />
          {gameDatabase.map((game, i) => {
            return (
              <Route
                key={i}
                path={gameDatabase[i].name}
                element={<TemplatePlayground game={gameDatabase[i]} />}
              />
            );
          })}
          <Route path="*" element={<IndexPlayground />} />
        </Route>
        <Route path="/play" element={<Play />}>
          {gameDatabase.map((game, i) => {
            const Game = gameComponents[game.name];
            return Game ? (
              <Route key={i} path={gameDatabase[i].name} element={<Game />} />
            ) : null;
          })}
          <Route path="*" element={<Play />} />
        </Route>
        <Route path="*" element={<Entrance />} />
      </Routes>
    </main>
  );
}
