/* eslint-disable react/prop-types */
import ThreeDot from "../../assets/letterm/3dDot.png";
import Arc from "../../assets/letterm/arc.png";
import Broken from "../../assets/letterm/broken.png";
import Brush from "../../assets/letterm/brush.png";
import Card from "../../assets/letterm/card.png";
import Circle from "../../assets/letterm/circle.png";
import Cisco from "../../assets/letterm/cisco.png";
import Cross from "../../assets/letterm/cross.png";
import Dot from "../../assets/letterm/dot.png";
import Flat from "../../assets/letterm/flat.png";
import Hook from "../../assets/letterm/hook.png";
import Noise from "../../assets/letterm/noise.png";
import Ortho from "../../assets/letterm/ortho.png";
import Pattern from "../../assets/letterm/pattern.png";
import Reverse from "../../assets/letterm/reverse.png";
import Reverted from "../../assets/letterm/reverted.png";
import Sandal from "../../assets/letterm/sandal.png";
import Sphere from "../../assets/letterm/sphere.png";
import Splash from "../../assets/letterm/splash.png";
import Stroke from "../../assets/letterm/stroke.png";
import Triangle from "../../assets/letterm/triangle.png";

import { AiFillStar } from "react-icons/ai";

export default function LetterMPlayground({ game }) {
  const letters = [
    { name: "3D Dot", src: ThreeDot },
    { name: "Arc", src: Arc },
    { name: "Broken", src: Broken },
    { name: "Brush", src: Brush },
    { name: "Card", src: Card },
    { name: "Circle", src: Circle },
    { name: "Cisco", src: Cisco },
    { name: "Cross", src: Cross },
    { name: "Dot", src: Dot },
    { name: "Flat", src: Flat },
    { name: "Hook", src: Hook },
    { name: "Noise", src: Noise },
    { name: "Ortho", src: Ortho },
    { name: "Pattern", src: Pattern },
    { name: "Reverse", src: Reverse },
    { name: "Reverted", src: Reverted },
    { name: "Sandal", src: Sandal },
    { name: "Sphere", src: Sphere },
    { name: "Splash", src: Splash },
    { name: "Stroke", src: Stroke },
    { name: "Triangle", src: Triangle },
  ];

  return (
    <section className=" w-full h-full text-accent overflow-auto flex flex-col gap-8 mt-20 lg:mt-0 py-6 lg:py-12 px-12 md:px-32 lg:px-12 text-center">
      {/* Title */}
      <div className="flex items-end gap-4 justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
          {game.title}
        </h1>
        {/* Stars */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2 text-accent">
            {[...Array(game.stars || 0)].map((star, i) => {
              return <AiFillStar key={i} className="text-2xl" />;
            })}
          </div>
          <span>({game.type})</span>
        </div>
      </div>
      {/* Tags */}
      <div className="w-full flex gap-4 items-center justify-center">
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

      {/* Description */}
      <p className="text-xl px-12 py-4">{game.description}</p>

      {/* Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-12 place-content-center">
        {letters.map((letter, i) => {
          return (
            <figure key={i} className="text-2xl font-semibold">
              <figcaption className="ml-4">{letter.name}</figcaption>
              <img src={letter.src} alt={letter.name + " M"} />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
