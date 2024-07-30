import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import "../components/LogoBar.style.css";

function Header(props) {
  const handleClick = () => {
    props.onLogout();
  };

  const navigator = useNavigate();
  const onClick = () => {
    navigator("/");
  };
  return (
    <div className="HeaderDiv">
      <img src={Logo} onClick={onClick}></img>
      <button
        className="logoutBtn"
        onClick={() => {
          console.log(props);
          props.onLogout();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default Header;
