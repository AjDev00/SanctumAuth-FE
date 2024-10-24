import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

export default function NavBar() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
    toast(data.message);
  }

  return (
    <div>
      <div className="bg-blue-950 text-white p-6">
        <div className="flex flex-row justify-between px-6">
          <Link to="/" className="font-bold hover:cursor-pointer">
            Home
          </Link>
          {user ? (
            <div className="flex flex-row gap-10 font-bold">
              <Link to="/profile" className="">
                {user.name}
              </Link>
              <Link to="/create-posts" className="hover:cursor-pointer">
                New Post
              </Link>
              <form onSubmit={handleSubmit}>
                <button className="hover:cursor-pointer">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex flex-row gap-10 font-bold">
              <Link to="/register" className="hover:cursor-pointer">
                Register
              </Link>
              <Link to="/login" className="hover:cursor-pointer">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
