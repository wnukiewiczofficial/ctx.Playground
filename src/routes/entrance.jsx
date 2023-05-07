import Button from "../components/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Entrance() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== "/") navigate("/");
  }, []);

  return (
    <section className="w-full h-full flex flex-col place-content-center place-items-center gap-6">
      <h1 className="font-bold text-5xl md:text-6xl lg:text-8xl">
        <span className="text-accentTwo">ctx.</span>
        <span className="text-accent">Playground</span>
      </h1>
      <Link to="/ctx.Playground/playground">
        <Button>Go to the playground</Button>
      </Link>
    </section>
  );
}
