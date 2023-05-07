import { useRef } from "react";
import { AiFillStar } from "react-icons/ai";

export default function GameTab({
  children,
  id,
  selected,
  setSelectedTab,
  setNavOpen,
  gameType,
  stars,
}) {
  const tabRef = useRef();

  function selectTab() {
    setSelectedTab(id);
    if (setNavOpen) setNavOpen(false);
  }

  return (
    <div
      ref={tabRef}
      className="font-semibold text-left text-lg md:text-xl lg:text-2xl"
      onClick={selectTab}
    >
      {selected ? (
        <h1 className="flex items-center justify-between lg:gap-4 bg-accent text-main lg:rounded-r-lg lg:pl-6">
          {children}
          <div className="flex gap-2 text-main">
            {[...Array(stars)].map((star, i) => {
              return <AiFillStar key={i} />;
            })}
          </div>
        </h1>
      ) : (
        <h1 className="flex items-center justify-between lg:gap-4 bg-main text-accent hover:bg-accent/20 hover:text-accentTwo transition-all duration-200 lg:rounded-r-lg lg:pl-6">
          {children}
          <div className="flex gap-2 text-accent">
            {[...Array(stars)].map((star, i) => {
              return <AiFillStar key={i} />;
            })}
          </div>
        </h1>
      )}
    </div>
  );
}
