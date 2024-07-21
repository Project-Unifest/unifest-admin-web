import "./MemberComponent.style.css"
import HeaderText from "./components/HeaderText";
import MemberComponent from "./MemberComponent";

function BoothManagement({id, email, phoneNum}){
    return(
        <div>
            <HeaderText school="건국대학교" title="부스 관리"/>
            <div className='selectDiv'>
                <MemberComponent id={id} email={email} phoneNum={phoneNum} hrEnable={false}/> 
            </div>
        </div>
    )
}

export default BoothManagement;