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
      <h1
        className={
          "flex items-center justify-between lg:gap-4 transition-all duration-200 lg:rounded-r-lg lg:pl-6 " +
          (selected
            ? "bg-accent text-main lg:active:pl-4"
            : "text-accent hover:pl-12 active:pl-16 hover:bg-accent/20 hover:text-accentTwo")
        }
      >
        {children}
        <div
          className={"flex gap-2" + (selected ? "text-main" : "text-accent")}
        >
          {[...Array(stars)].map((star, i) => {
            return <AiFillStar key={i} />;
          })}
        </div>
      </h1>
    </div>
  );
}
