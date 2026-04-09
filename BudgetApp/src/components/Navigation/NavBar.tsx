import { Link, NavLink } from "react-router";

const routerLinks = [{ label: "Customers", path: "/home" }];

const NavBar = ({ appTitle }: { appTitle: string }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          {appTitle}
        </Link>

        <ul className="navbar-nav me-auto">
          {
            routerLinks.map(r => (
              <li className="nav-item" key={r.path}>
                <NavLink to={r.path} className={
                      ({ isActive }) => `nav-link ${isActive ? "active" : ""}`
                    }
                >
                  {r.label}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;