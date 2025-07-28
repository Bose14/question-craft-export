
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              {/* Vinathaal Icon */}
              <div className="rounded-lg flex items-center justify-center overflow-hidden w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28">
                <img
                  src="/vinathaal_icon.png"
                  alt="Vinathaal Logo"
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Vinathaal Heading Logo */}
              <div className="flex items-center h-8 sm:h-10 lg:h-14">
                <img
                  src="vinathaal-heading-white.png" 
                  alt="Vinathaal Heading"
                  className="object-contain h-full"
                />
              </div>
            </div>

            <p className="text-blue-200 leading-relaxed max-w-md text-center sm:text-left text-sm sm:text-base">
              Elevating minds, shaping futures through excellence in education and transformative learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-accent font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  Generator
                </Link>
              </li>
              <li>
                <Link to="/mcq-generator" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  MCQ Generator
                </Link>
              </li>
              <li>
                <Link to="/question-bank" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="text-center sm:text-left">
            <h4 className="text-accent font-semibold mb-4 text-lg">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-blue-200 text-sm sm:text-base">azhizensolutions@gmail.com</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0 sm:mt-1" />
                <span className="text-blue-200 text-sm text-center sm:text-left">
                  R-NO:309, Mercury Block<br />
                  KSRCE, Tiruchengode, Namakkal, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-blue-200 text-xs sm:text-sm text-center">
              © 2025 Vinathaal Question Paper Generator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
