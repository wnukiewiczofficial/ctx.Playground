import { RiMenu3Fill } from "react-icons/ri";
import anime from "animejs";
import { Link } from "react-router-dom";
import Logo from "../components/logo";
import GameTab from "../components/gametab";
import { useState, useEffect, useRef } from "react";

export default function NavBar({ gameDatabase }) {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef();

  const didMount = useRef(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const games = gameDatabase.sort((a, b) => {
    if (a.title > b.title) return 1;
    else if (a.title < b.title) return -1;
    return 0;
  });

  useEffect(() => {
    if (didMount.current) {
      if (navOpen) {
        anime({
          targets: navRef.current,
          translateY: 0,
          duration: 500,
          easing: "easeOutSine",
        });
      } else {
        anime({
          targets: navRef.current,
          translateY: "-100%",
          duration: 500,
          easing: "easeOutSine",
        });
      }
    } else didMount.current = true;
  }, [navOpen]);

  return (
    <nav className="fixed lg:static lg:flex lg:flex-col w-full lg:w-auto lg:h-full text-center">
      <div className="flex h-20 bg-main place-items-center justify-between p-6">
        <Link
          to="/ctx.Playground/playground"
          onClick={() => setSelectedTab(null)}
        >
          <Logo />
        </Link>
        <RiMenu3Fill
          size={40}
          className="text-accent cursor-pointer lg:hidden"
          onClick={() => setNavOpen((prev) => !prev)}
        />
      </div>
      {/* Mobile */}
      <ul
        ref={navRef}
        style={{ transform: "translateY(-100%)" }}
        className={`lg:hidden overflow-auto bg-main fixed z-[-1] w-full grid grid-cols-2 md:grid-cols-3 p-6 gap-6`}
      >
        {games.map((game, i) => {
          return (
            <li key={i}>
              <Link to={game.playgroundTo}>
                <GameTab
                  id={i}
                  setSelectedTab={setSelectedTab}
                  setNavOpen={setNavOpen}
                  selected={i === selectedTab}
                  gameType={game.type}
                  stars={game.stars ?? 0}
                >
                  {game.title}
                </GameTab>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Desktop */}
      <ul
        className={`overflow-auto hidden lg:flex h-full w-full flex-col pr-6 mb-12 gap-2 scrollbar scrollbar-thumb-accent scrollbar-track-accent/10`}
      >
        {games.map((game, i) => {
          return (
            <li key={i}>
              <Link to={game.playgroundTo}>
                <GameTab
                  id={i}
                  setSelectedTab={setSelectedTab}
                  selected={i === selectedTab}
                  gameType={game.type}
                  stars={game.stars ?? 0}
                >
                  {game.title}
                </GameTab>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
