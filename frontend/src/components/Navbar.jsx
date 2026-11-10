import { Link } from "react-router-dom";

export default function Navbar({ activePage }) {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Process", path: "/Process" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00684A] text-sm font-bold text-white">
            S
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            SmartSeed
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => {
            const isActive = activePage === item.name;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                  isActive
                    ? "bg-emerald-50 text-[#00684A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#00684A]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}