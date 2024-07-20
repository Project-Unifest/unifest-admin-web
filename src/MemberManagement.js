import React, { useState } from 'react';
import MemberTable from './MemberTable';
import HeaderText from './components/HeaderText';
import './MemberManagement.style.css'

function MemberManagement() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return(
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
        <MemberTable role={selectedRole} setter={setLoading} loading = {loading} />
      </div>
    </div>
  )
}

export default MemberManagement;