import React, { useState } from 'react';
import MemberTable from './MemberTable';
import HeaderText from './components/HeaderText';

import BoothManageMent from './BoothManagement'
import './MemberManagement.style.css'

function MemberManagement() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(true); //true = Member false = Booth
  
  const [focus, setFocus] = useState(
    {
      uid:"t",
      email:"t",
      phoneNum:"t"
    }
  );
  const [focusUID, setUID] = useState("");
  const [focusEmail, setEmail] = useState("");
  const [focusPhoneNum, setPhoneNum] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleUserClick = (event, uid, email, phoneNum) => {
    setFocus({
      uid:uid,
      email:email,
      phoneNum:phoneNum
    })
    setPage(false);
  };

  return(
    <div>
      {page?(
        <div>
        <HeaderText school="건국대학교" title="운영자 계정 관리"></HeaderText>
        <div className='roleBar'>
          <div className='roleDiv'>
            <div className='roleLeftDiv'>
              전체 신청 수
            </div>
            <div className='roleRightDiv1'>
              32
              {/* 향후 숫자로 수정 */}
            </div>
          </div>
          <div className='roleDiv'>
            <div className='roleLeftDiv'>
              전체 신청 수
            </div>
            <div className='roleRightDiv2'>
              32
              {/* 향후 숫자로 수정 */}
            </div>
          </div>
          <div className='roleDiv'>
            <div className='roleLeftDiv'>
              전체 신청 수
            </div>
            <div className='roleRightDiv3'>
              32
              {/* 향후 숫자로 수정 */}
            </div>
          </div>
          <div className='roleDiv'>
            <div className='roleLeftDiv'>
              전체 신청 수
            </div>
            <div className='roleRightDiv4'>
              32
              {/* 향후 숫자로 수정 */}
            </div>
          </div>
        </div>
        <div className='selectDiv'>
          <label className='filterLabel' htmlFor="role">필터</label> 
          <select className='filterSelect' id="role" value={selectedRole} onChange={handleRoleChange}>
            <option value="">All</option>
            <option value="ADMIN">Admin</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="DENIED">Denied</option>
          </select>
          <MemberTable role={selectedRole} setter={setLoading} loading = {loading} setPage={handleUserClick} />
        </div>
        </div>
      ):(
        <div>
          <BoothManageMent id={focus['uid']} email={focus['email']} phoneNum={focus['phoneNum']} ></BoothManageMent>
        </div>
      )}
        
    </div>
  )
}

export default MemberManagement;