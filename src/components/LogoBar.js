import Logo from "../assets/logo.svg"
import styles from "../components/LogoBar.style.css"

function Header(){
    return(
        <div className="HeaderDiv">
            <img src={Logo}></img>
        </div>
    )
}

export default Header;