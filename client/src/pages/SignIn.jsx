import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import "./styles/Glassmorphism.css";
import User from "../../../api/models/user.model.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div
      className="h-screen p-9 mt-24"
      style={{
        backgroundImage:
          "url(https://live.staticflickr.com/5758/29781941692_2e0d06762c_h.jpg)",
        backgroundSize: "cover",
        opacity: "0.9",
      }}
    >
      <div className="p-3 max-w-lg mx-auto glassmorphism px-6">
        <h1 className="text-4xl text-center font-semibold mt-10">
          Hello there, Welcome Back !
        </h1>
        <p className="text-2xl text-center font-normal mb-10">
          Your Next Home Is Just a Click Away
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg mb-5 bg-white"
            id="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg mb-10"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className=" text-white text-xl p-3 rounded-lg hover:opacity-95 disabled:opacity-80 font-semibold"
            style={{ background: "rgb(14,100,210)" }}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <hr
              style={{
                flexGrow: 1,
                border: "none",
                borderTop: "1px solid #000",
              }}
            />
            <span
              style={{ margin: "0 10px", whiteSpace: "nowrap" }}
              className="text-xl text-slate-100"
            >
              Or with
            </span>
            <hr
              style={{
                flexGrow: 1,
                border: "none",
                borderTop: "1px solid #000",
              }}
            />
          </div>
          <OAuth></OAuth>
        </form>
        <div className="flex gap-2 mt-5 text-xl">
          <h6>
            <b>Dont Have an Account?</b>
          </h6>
          <Link to={"/sign-up"}>
            <span className="text-blue-900">
              <b>Sign up</b>
            </span>
          </Link>
        </div>
        {error && (
          <p className="text-red-900 mt-5 font-extrabold text-xl">{error}</p>
        )}
      </div>
    </div>
  );
}
