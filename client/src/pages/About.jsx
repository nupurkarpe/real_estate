import React from "react";
import {
  FaHome,
  FaKey,
  FaBuilding,
  FaMapMarkedAlt,
  FaHandshake,
  FaDollarSign,
} from "react-icons/fa";

export default function About() {
  // Define inline styles for animations
  const sectionStyle = {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll(".fade-in");
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.8) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen">
      <div
        className="py-20 px-6 max-w-7xl mx-auto mt-24 bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg w-screen fade-in"
        style={sectionStyle}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800">
          About Leo Properties
        </h1>

        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://st.depositphotos.com/1194063/2151/i/450/depositphotos_21515189-stock-photo-agent-with-house-model-and.jpg"
              alt="Leo Properties"
              className="rounded-md  h-[390px] w-[600px]"
              style={{ transition: "transform 0.5s ease" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <p className="mb-6 text-lg text-slate-700">
              Leo Properties is a leading real estate agency that specializes in
              helping clients buy, sell, and rent properties in the most
              desirable neighborhoods. Our team of experienced agents is
              dedicated to providing exceptional service and making the buying
              and selling process as smooth as possible.
            </p>
            <p className="mb-6 text-lg text-slate-700">
              Our mission is to help our clients achieve their real estate goals
              by providing expert advice, personalized service, and a deep
              understanding of the local market. Whether you are looking to buy,
              sell, or rent a property, we are here to help you every step of
              the way.
            </p>
          </div>
        </div>

        <div
          className="bg-blue-50 p-8 rounded-lg shadow-md mb-16 fade-in"
          style={sectionStyle}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-900 text-center">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4" style={{ transition: "transform 0.3s ease" }}>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Expertise
              </h3>
              <p className="text-slate-900">
                Our agents have years of experience and deep knowledge of the
                real estate market, ensuring you get the best deals.
              </p>
            </div>
            <div className="p-4" style={{ transition: "transform 0.3s ease" }}>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Personalized Service
              </h3>
              <p className="text-slate-900">
                We tailor our services to meet your unique needs, providing a
                personalized experience from start to finish.
              </p>
            </div>
            <div className="p-4" style={{ transition: "transform 0.3s ease" }}>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Trusted Reputation
              </h3>
              <p className="text-slate-900">
                With a proven track record of success, Leo Properties is a name
                you can trust in real estate.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16 fade-in" style={sectionStyle}>
          <h2
            className="text-3xl font-bold mb-8 text-slate-800"
            style={sectionStyle}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaHome className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Property Sales
              </h3>
              <p className="text-slate-600">
                We help you buy and sell residential properties with ease,
                ensuring you find your dream home.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaKey className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Property Rentals
              </h3>
              <p className="text-slate-600">
                Find the perfect rental property with our extensive listings and
                dedicated agents.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaBuilding className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Commercial Real Estate
              </h3>
              <p className="text-slate-600">
                We specialize in commercial properties, helping businesses find
                the ideal location.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaMapMarkedAlt className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Property Management
              </h3>
              <p className="text-slate-600">
                Let us manage your properties, ensuring they are well-maintained
                and profitable.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaHandshake className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Consultation Services
              </h3>
              <p className="text-slate-600">
                Get expert advice on the real estate market, investment
                opportunities, and more.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <FaDollarSign className="text-5xl text-slate-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Investment Opportunities
              </h3>
              <p className="text-slate-600">
                Explore lucrative investment options with our expert guidance
                and market insights.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <p className="text-lg text-slate-700">
              Our team of agents has a wealth of experience and knowledge in the
              real estate industry, and we are committed to providing the
              highest level of service to our clients. We believe that buying or
              selling a property should be an exciting and rewarding experience,
              and we are dedicated to making that a reality for each and every
              one of our clients.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://media.istockphoto.com/id/1567429058/photo/landscaping-on-middleclass-homes-aerial-neighborhood-fresh-cut-lawns.jpg?s=612x612&w=0&k=20&c=XnYq0Vcl34LsM2V4Jto2_4rZSaDWwSGqW5-oSOHWz-s="
              alt="Real Estate"
              className="rounded-lg shadow-lg"
              style={{ transition: "transform 0.5s ease" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="mailto:leoproperty4u@gmail.com?subject=Contact Us&body=Hello Admin,%0D%0A%0D%0A[Your message here]"
            className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
