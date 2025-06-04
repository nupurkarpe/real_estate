import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import "./styles/Glassmorphism.css";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount >= 4) {
      // Navigate after 5 clicks
      navigate("/admin/signup");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="h-screen p-9 mt-24"
      style={{
        backgroundImage:
          "url(https://www.villa-vie.com/wp-content/uploads/2022/10/Villa-Acacia.jpg)",
        backgroundSize: "cover",
        opacity: 0.9,
      }}
    >
      <div className="p-3 max-w-lg mx-auto glassmorphism">
        <h1 className="text-4xl text-center font-semibold mt-10">
          Create an account
        </h1>
        <p
          className="text-2xl text-center font-normal mb-10"
          onClick={handleClick}
        >
          Find your dream home today!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className=" text-white text-xl p-3 rounded-lg  hover:opacity-95 disabled:opacity-80 font-semibold"
            style={{ background: "rgb(14,100,210)" }}
          >
            {loading ? "Loading..." : "Sign up"}
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
              className="text-xl text-slate-900"
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
            <b> Already have an account?</b>{" "}
          </h6>
          <Link to={"/sign-in"}>
            <span className="text-blue-700 ">
              {" "}
              <b>Sign in</b>
            </span>
          </Link>
        </div>
        {error && (
          <p className="text-red-500 mt-5 font-bold text-xl">{error}</p>
        )}
      </div>
    </div>
  );
}
