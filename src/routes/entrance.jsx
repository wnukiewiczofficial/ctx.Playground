import Logo from "../components/logo";
import Button from "../components/button";
import { Link } from "react-router-dom";

export default function Entrance() {
  return (
    <section className="w-full h-full flex flex-col place-content-center place-items-center gap-6">
      <Logo />
      <Link to="/playground">
        <Button>Go to the playground</Button>
      </Link>
    </section>
  );
}