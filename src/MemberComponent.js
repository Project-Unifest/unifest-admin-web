import "./MemberComponent.style.css"

function MemberComponent({id, email, phoneNum}){
    return(
        <div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
                <div><hr style={{}}/></div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div>
                        <div className="uidLabel">
                            UID
                        </div>
                        <div className="uid">
                            {id}
                        </div>
                    </div>
                    <div style={{width:"320px"}}>
                        <div style={{display:"flex"}}>
                            <div className="labelDiv">이메일</div>
                            <div className="contentDiv">{email}</div>
                        </div>
                        <div style={{display:"flex"}}>
                        <div className="labelDiv">전화번호</div>
                        <div className="contentDiv">{phoneNum}</div>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className="btnDiv">
                            <div className="circleDiv" style={{backgroundColor: "#9C9C9C"}}/>
                            <button>대기</button>
                        </div>
                        <div className="btnDiv">
                            <div className="circleDiv" style={{backgroundColor: "#15D055"}}/>
                            <button>승인</button>
                        </div>
                        <div className="btnDiv">
                            <div className="circleDiv" style={{backgroundColor: "#FF5252"}}/>
                            <button>거부</button>
                        </div>
                        <div className="btnDiv2">
                            <button>관리</button>
                        </div>
                    </div>   
                </div>     
            </div>
        </div>
    );
}

export default MemberComponent;