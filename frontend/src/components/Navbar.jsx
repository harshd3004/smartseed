import { Link } from "react-router-dom";

export default function Navbar({ activePage }) {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Process", path: "/Process" },
  ];

  return (
    <header className="navbar">
      <div className="brand-badge" aria-label="Icon">
        ICON
      </div>

      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={
              activePage === item.name
                ? "nav-link active"
                : "nav-link"
            }
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
