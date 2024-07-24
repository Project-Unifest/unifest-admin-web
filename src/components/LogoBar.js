import Logo from "../assets/logo.svg";
import "../components/LogoBar.style.css";

function Header(props) {
  const handleClick = () => {
    props.onLogout();
  };
  return (
    <div className="HeaderDiv">
      <img src={Logo}></img>
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
