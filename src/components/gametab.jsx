import { useRef } from "react";

export default function GameTab({
  children,
  id,
  selected,
  setSelectedTab,
  setNavOpen,
  gameType,
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
        <h1 className="flex items-center gap-4 bg-accent text-main lg:rounded-r-lg lg:pl-6">
          {children}
          <span className="font-bold text-green-400">
            {gameType === "done" ? gameType : ""}
          </span>
        </h1>
      ) : (
        <h1 className="flex items-center gap-4 bg-main text-accent hover:bg-accent/20 hover:text-accentTwo transition-all duration-200 lg:rounded-r-lg lg:pl-6">
          {children}
          <span className="font-bold text-green-400">
            {gameType === "done" ? gameType : ""}
          </span>
        </h1>
      )}
    </div>
  );
}
