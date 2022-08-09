import "./Navbar.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import ToursDataService from "../../Services/tours";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const logoutFunction = () => {
    dispatch({ type: "LOGOUT" });
    ToursDataService.logout();
  };

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <NavLink to="/tours">All Tours</NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/tours" onClick={logoutFunction}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
