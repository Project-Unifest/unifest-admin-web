import "./HeaderText.style.css"

function HeaderText(props){
    return(
        <div className="HeaderTextDiv">
            <div className="schoolText">{props.school}</div>
            <div className="titleText">{props.title}</div>
        </div>
    )
}

export default HeaderText;