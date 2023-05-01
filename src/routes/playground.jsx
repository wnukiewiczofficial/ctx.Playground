import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Playground({ gameDatabase }) {
  return (
    <section className="h-full flex flex-col lg:flex-row">
      <NavBar gameDatabase={gameDatabase} />
      <Outlet />
    </section>
  );
}
