import P5jsLogo from "../../assets/p5js-logo.png";
import HtmlLogo from "../../assets/html5-logo.png";

export default function IndexPlayground() {
  return (
    <section className=" w-full h-full overflow-hidden flex flex-col gap-6 mt-20 lg:mt-0 py-6 lg:py-12 px-12  text-center place-items-center place-content-center">
      <h1 className="text-accent text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
        Welcome to <span className="text-accentTwo">ctx.</span>Playground!
      </h1>
      <p className="text-accentTwo w-full lg:w-3/4 md:text-lg">
        This is my <span className="text-additional">portfolio</span> of canvas
        online <span className="text-additional">programs</span> and{" "}
        <span className="text-additional">games</span>, including my own
        creations as well as those made for my clients. Some of my games are
        <span className="text-additional"> responsive</span>, while others are
        not. Additionally, some of the games are compatible with{" "}
        <span className="text-additional">mobile devices</span>, so you can play
        them on the go.
      </p>

      {/* Logos */}
      <div className="flex w-full lg:w-3/4 md:text-lg justify-around text-accent place-items-center py-4 md:px-6">
        <img src={P5jsLogo} className="h-16 md:h-20" alt="p5js" />
        <div className="flex flex-col items-center">
          <img
            src={HtmlLogo}
            className="h-16 md:h-20 w-16 md:w-20"
            alt="canvas"
          />
          <div className="flex gap-1 select-none">
            <div>
              <span>{"<"}</span>
              <span className="text-accentTwo">{"canvas"}</span>
              <span>{">"}</span>
            </div>
            <div>
              <span>{"</"}</span>
              <span className="text-accentTwo">{"canvas"}</span>
              <span>{">"}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-accentTwo w-full lg:w-3/4 md:text-lg">
        All of the programs and games in my portfolio are based on{" "}
        <span className="text-additional">Canvas</span> and are created using{" "}
        <span className="text-additional">p5js</span> or{" "}
        <span className="text-additional">vanilla JS</span>. This allows for
        unique and engaging experiences that are optimized for performance and
        accessibility.
      </p>

      <p className="text-accentTwo w-full lg:w-3/4 md:text-lg">
        <span className="text-additional">Feel free</span> to browse my
        collection, you may find the program or game that suits your needs. If
        you have any questions or comments, please do not hesitate to{" "}
        <span className="text-additional">contact me</span>.
      </p>
    </section>
  );
}
