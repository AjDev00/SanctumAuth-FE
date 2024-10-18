import { useContext, useState } from "react";
import loadingImg from "../../assets/loading.svg";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(null);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setErrors(data.errors);
    setLoading(false);
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast(data.message);
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
      <div className="mb-2 font-serif font-bold">Register a new account</div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <input
          className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
          type="text"
          value={formData.name}
          placeholder="Enter your name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className="mb-4">
          {errors && errors.name && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.name[0]}
            </p>
          )}
        </div>
        <input
          className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="mb-4">
          {errors && errors.email && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.email[0]}
            </p>
          )}
        </div>
        <input
          className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div className="mb-4">
          {errors && errors.password && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.password[0]}
            </p>
          )}
        </div>
        <input
          className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950 mb-4"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) =>
            setFormData({ ...formData, password_confirmation: e.target.value })
          }
        />
        {!loading ? (
          <button className="border border-blue-950 text-white bg-blue-950 rounded-md p-1.5 hover:opacity-75 duration-300">
            Register
          </button>
        ) : (
          <button
            disabled
            className="disabled:cursor-not-allowed border border-blue-950 flex flex-row gap-4 justify-center items-center text-white bg-blue-950 rounded-md p-1.5 hover:opacity-75 duration-300"
          >
            <img src={loadingImg} alt="" className="w-6 animate-spin" />
          </button>
        )}
      </form>
    </div>
  );
}
