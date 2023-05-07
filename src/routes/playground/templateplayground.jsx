/* eslint-disable react/prop-types */
import Button from "../../components/button";
import { Link } from "react-router-dom";

export default function TemplatePlayground({ game }) {
  return (
    <section className=" w-full h-full text-accent overflow-hidden flex flex-col gap-8 mt-20 lg:mt-0 py-6 lg:py-12 px-12 md:px-32 lg:px-12 text-center lg:text-left">
      {/* Title */}
      <div className="flex items-end gap-4">
        <h1 className="text-3xl lg:text-5xl font-semibold">{game.title}</h1>
        <span>({game.type})</span>
      </div>

      {/* Tags */}
      <div className="w-full flex gap-4 items-center">
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
      <div className="grid grid-cols-2 gap-4 place-content-center">
        <img src="" alt="Image1" />
        <img src="" alt="Image2" />
        <img src="" alt="Image3" />
        <img src="" alt="Image4" />
      </div>

      {/* Description */}
      <p className="text-xl lg:px-12 py-4">{game.description}</p>
      {/* Play button */}
      <Link to={`/play/${game.name}`}>
        <Button>Play</Button>
      </Link>
    </section>
  );
}
