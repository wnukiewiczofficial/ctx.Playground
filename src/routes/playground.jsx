import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import React from "react";

export default function Playground({ gameDatabase }) {
  return (
    <section className="h-full flex flex-col lg:flex-row">
      <NavBar gameDatabase={gameDatabase} />
      <Outlet />
    </section>
  );
}
