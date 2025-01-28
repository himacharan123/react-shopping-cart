import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../styles/navbar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
        <Link to="/cart">
          <ShoppingCartOutlinedIcon fontSize="medium" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
