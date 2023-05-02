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

      <div className="w-full h-full flex place-content-center">
        <Outlet />
      </div>
    </section>
  );
}
