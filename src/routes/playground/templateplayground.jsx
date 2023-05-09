/* eslint-disable react/prop-types */
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useRef } from "react";

export default function TemplatePlayground({ game }) {
  const gradientRef = useRef();
  return (
    <section className="w-full h-full text-accent overflow-auto flex flex-col gap-8 mt-20 lg:mt-0 py-6 lg:py-12 px-12 md:px-32 lg:px-12 text-center">
      {/* Title */}
      <div className="flex items-end gap-4 justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
          {game.title}
        </h1>
        {/* Stars */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2 text-accent">
            {[...Array(game.stars || 0)].map((star, i) => {
              return (
                <AiFillStar
                  key={i}
                  className="text-2xl lg:text-3xl xl:text-4xl"
                />
              );
            })}
          </div>
          <span>({game.type})</span>
        </div>
      </div>

      {/* Tags */}
      <div className="w-full flex gap-4 items-center justify-center static z-10">
        <span className="bg-accent flex items-center h-full text-main px-4 font-semibold rounded">
          Tags
        </span>
        <div className="flex flex-wrap gap-1">
          {game.tags.map((tag, i) => {
            return (
              <span key={i} className="border-2 border-accent px-2 rounded">
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <div className="w-full xl:w-3/4 place-self-center grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center place-items-center z-10">
        {game.images.map((image, i) => {
          return (
            <div
              key={i}
              className={
                i === game.images.length - 1 && game.images.length % 2 !== 0
                  ? "md:col-span-2"
                  : "" + " w-auto flex place-content-center"
              }
            >
              <img
                src={image}
                alt={game.title + " " + i}
                className="w-full rounded-lg"
              />
            </div>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-lg lg:text-xl lg:px-12 py-4 z-10">
        {game.description}
      </p>
      {/* Play button */}
      <Link
        className="hover:opacity-80 active:opacity-60 transition-opacity duration-200 z-10"
        to={`/play/${game.name}`}
        onMouseEnter={() => {
          gradientRef.current.classList.add("-translate-y-[10%]");
        }}
        onMouseLeave={() => {
          gradientRef.current.classList.remove("-translate-y-[30%]");
          gradientRef.current.classList.remove("-translate-y-[10%]");
        }}
        onMouseDown={() => {
          gradientRef.current.classList.add("-translate-y-[30%]");
        }}
        onMouseUp={() => {
          gradientRef.current.classList.remove("-translate-y-[30%]");
        }}
      >
        <Button>Play</Button>
      </Link>

      {/* Gradient */}
      <div
        ref={gradientRef}
        className="fixed w-screen left-0  lg:w-full h-[300%] top-full bg-gradient-to-t from-accent overflow-hidden transition-all duration-300"
      ></div>
    </section>
  );
}
