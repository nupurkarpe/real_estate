import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/leoproperties.png";

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <img
            src={logo} // Replace with the path to your logo
            alt="Company Logo"
            className="h-12 mb-4"
          />
          {/* <h4 className="text-xl font-semibold mb-2">Leo Properties</h4> */}
          <p>Lotus Corporate Park</p>
          <p>Goregaon,Mumbai, Maharashtra, 400060</p>
          <p>India</p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Telephone: +1 (555) 987-6543</p>
          <p>Email: leoproperty4u@gmail.com</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                className="text-white hover:text-blue-500"
                size={24}
              />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-white hover:text-blue-400" size={24} />
            </a>
            <a
              href="https://www.instagram.com/leo_property4u?igsh=MW40enpieGd6OGZoZw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-white hover:text-pink-400"
                size={24}
              />
            </a>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="text-xl font-semibold mb-2">About Us</h4>
          <p className="text-sm">
            Leo Properties is dedicated to helping you find your next perfect
            place to live. We offer a wide range of properties that cater to all
            your needs. Follow us on social media for the latest updates.
          </p>
        </div>
      </div>
      <div className="text-center text-sm mt-8">
        &copy; {new Date().getFullYear()} Leo Properties. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
