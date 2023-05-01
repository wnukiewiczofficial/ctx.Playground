import { useRef } from "react";

export default function GameTab({
  children,
  id,
  selected,
  setSelectedTab,
  setNavOpen,
}) {
  const tabRef = useRef();

  function selectTab() {
    setSelectedTab(id);
    setNavOpen(false);
  }

  return (
    <div
      ref={tabRef}
      className="font-semibold text-left text-lg md:text-xl lg:text-2xl"
      onClick={selectTab}
    >
      {selected ? (
        <h1 className="bg-accent text-main lg:rounded-r-lg lg:pl-6">
          {children}
        </h1>
      ) : (
        <h1 className="bg-main text-accent hover:bg-accent/20 hover:text-accentTwo transition-all duration-200 lg:rounded-r-lg lg:pl-6">
          {children}
        </h1>
      )}
    </div>
  );
}
