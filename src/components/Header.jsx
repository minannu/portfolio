import { Link, useLocation } from "react-router-dom";
import sidebarData from "../database/sidebar.json";

const { name } = sidebarData;

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/publications", label: "Publications" },
    { path: "/projects", label: "Research & Projects" },
    { path: "/experiences", label: "Experience" },
    { path: "/teaching-services", label: "Teaching & Services" },
    { path: "/awards", label: "Awards" },
    { path: "/cv", label: "CV" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="mb-4 md:mb-0">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              {name}
            </Link>
          </div>
          
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end gap-1 md:gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
