import { Link, useLocation, useParams } from "react-router-dom";
import img from "../assets/react.svg";

export default function Navbar() {
  const url = useLocation();
  // const {id}=useParams();
  return (
    <div>
      <header className="flex items-center justify-between bg-white py-5 px-4 shadow-lg">
        <div>
          <img src={img} alt="website logo" className="cursor-pointer" />
        </div>
        <span className="text-orange-400">Suraj Kushwaha</span>

        {url.pathname == "/" ? (
          <Link to="/history">
            <button className="bg-blue-500 py-2 px-5 rounded-md cursor-pointer hover:bg-red-500 ">
              History
            </button>
          </Link>
        ) : (
          <Link to="/">
            <button className="bg-blue-500 py-2 px-5 rounded-md cursor-pointer hover:bg-red-500 ">
              Generate
            </button>
          </Link>
        )}

        {/* {
          num==4?even:odd
        } */}
      </header>
    </div>
  );
}
