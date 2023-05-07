import {
  Outlet,
  useOutlet,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

export default function Play() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const gameName = pathArray[pathArray.length - 1];

  useEffect(() => {
    if (!outlet) navigate("/playground");
  }, []);

  return (
    <section className="w-full h-full flex flex-col place-content-center">
      <Link to={`/playground/${gameName}`}>
        <div className="w-full flex justify-center items-center p-4 bg-accent">
          <h1 className="font-semibold text-xl">Back to playground</h1>
        </div>
      </Link>

      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent text-xl md:text-6xl font-bold">
        Loading...
      </h1>

      <div className="relative w-full h-full flex place-content-center place-items-center">
        <Outlet />
      </div>
    </section>
  );
}
