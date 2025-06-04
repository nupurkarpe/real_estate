import React, { useState } from "react";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState("");

  const calculateEMI = () => {
    setError("");
    if (!principal || !rate || !tenure) {
      setError("Please fill all the fields");
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / (12 * 100);
    const n = parseFloat(tenure) * 12;

    if (r === 0) {
      setEmi((p / n).toFixed(2));
    } else {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emi.toFixed(2));
    }
  };

  return (
    <div
      className="pt-10 h-screen mt-24"
      style={{
        backgroundImage:
          "url(https://financesmarti.com/wp-content/uploads/2020/03/loan-calculator-benefits.jpeg)",
        backgroundSize: "cover",
        opacity: 0.8,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          //   fontFamily: "serif",
        }}
        className="text-4xl pb-4 sm:texl-xl flex items-center justify-center font-semibold"
      >
        Equated Monthly Installment (EMI) Calculator
      </h1>
      <p className="text-center font-normal text-xl pb-10">
        Stay Ahead with Accurate EMI Estimates
      </p>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          //   border: "2px solid #4B5563",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255,0.9)",
        }}
        className="shadow-lg glassmorphism "
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="principal"
            style={{ display: "block", marginBottom: "5px" }}
            className="text-xl font-medium"
          >
            Principal Amount (₹):
          </label>
          <input
            type="number"
            id="principal"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="rate"
            style={{ display: "block", marginBottom: "5px" }}
            className="text-xl font-medium"
          >
            Annual Interest Rate (%):
          </label>
          <input
            type="number"
            id="rate"
            placeholder="Enter annual interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="tenure"
            style={{ display: "block", marginBottom: "5px" }}
            className="text-xl font-medium"
          >
            Loan Tenure (Years):
          </label>
          <input
            type="number"
            id="tenure"
            placeholder="Enter loan tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={calculateEMI}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          <b>Calculate EMI</b>
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
        {emi !== null && !error && (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginTop: "20px",
            }}
            className="text-2xl"
          >
            {" "}
            <b>Monthly EMI: ₹{emi}</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
