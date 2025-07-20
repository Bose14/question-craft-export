import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <h3 className="text-xl font-bold">QUESTION PAPER GENERATOR</h3>
            </div>
            <p className="text-blue-200 leading-relaxed max-w-md">
              Elevating minds, shaping futures through excellence in education and transformative learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-blue-200 hover:text-white transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link to="/mcq" className="text-blue-200 hover:text-white transition-colors">
                  MCQ Generator
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-blue-200 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-blue-200">+91 7010682506</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-blue-200">+91 9750603988</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-blue-200">academy@questiongen.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <span className="text-blue-200 text-sm">
                  R-NO:309, Mercury Block<br />
                  KSRCE, Tiruchengode, Namakkal, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © 2024 Question Paper Generator. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/portfolio" className="text-accent hover:text-white transition-colors text-sm">
                Generator Portfolio
              </Link>
              <Link to="/media" className="text-accent hover:text-white transition-colors text-sm">
                Generator Media
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;