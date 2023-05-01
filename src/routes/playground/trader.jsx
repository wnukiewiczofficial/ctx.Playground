import { useState } from "react";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Trader() {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const gameName = pathArray[pathArray.length - 1];

  const [tags, setTags] = useState([
    { name: "p5js" },
    { name: "responsive" },
    { name: "canvas" },
    { name: "canvas" },
  ]);
  return (
    <section className=" w-full h-full text-accent overflow-hidden flex flex-col gap-8 mt-20 lg:mt-0 py-6 lg:py-12 px-12 md:px-32 lg:px-12 text-center lg:text-left">
      {/* Title */}
      <h1 className="text-3xl lg:text-5xl font-semibold">Trader</h1>
      {/* Gallery */}
      <div className="grid grid-cols-2 gap-4 place-content-center">
        <img src="" alt="Image1" />
        <img src="" alt="Image2" />
        <img src="" alt="Image3" />
        <img src="" alt="Image4" />
      </div>
      {/* Tags */}
      <div className="w-full flex gap-4 items-center">
        <span className="bg-accent flex items-center h-full text-main px-4 font-semibold rounded">
          Tags
        </span>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => {
            return (
              <span key={i} className="border-2 border-accent px-2 rounded">
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>
      {/* Description */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales
        erat in ipsum tristique, sed venenatis velit rhoncus. Aenean vitae massa
        vel mauris gravida fringilla eu ut turpis. Sed vestibulum tristique
        lacus, eu efficitur magna sollicitudin id. Etiam vulputate tincidunt.
      </p>
      {/* Play button */}
      <Link to={`/play/${gameName}`}>
        <Button>Play</Button>
      </Link>
    </section>
  );
}
