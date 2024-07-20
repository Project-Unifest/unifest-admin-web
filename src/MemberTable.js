import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import './MemberTable.css';
import tempDB from './tempDB.json'
import MemberComponent from './MemberComponent';

function MemberTable({ role , setter, loading}) {
  const [members, setMembers] = useState([]);
  //const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newRole, setNewRole] = useState('');
  

  useEffect(() => {
    async function fetchMembers() {
      try {
        // const response = await axios.get(`/members`, {
        //   params: { role: role }
        // });
        await new Promise(r => setTimeout(r, 1000));
        setMembers([tempDB.data[0],tempDB.data[1]])
        // for (let i=0; i<tempDB.data.length; i++){
        //   setMembers([...members, tempDB.data[i]]);          
        // }

        
        //setMembers(response.data.data);
        setter(false)
        
       // setLoading(false); // 멤버들을 모두 불러왔음을 표시
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, [role]);

  const handleCheckboxChange = (event, memberId) => {
    if (event.target.checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    }
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedMembers.length === 0 || newRole === '') {
      alert('Please select members and role');
      return;
    }

    for (const memberId of selectedMembers) {
      await patchMember(memberId, newRole);
    }
    window.location.reload();
  };

  const patchMember = async (memberId, role) => {
    try {
      const response = await axios.patch(`/members/${memberId}`, null, {
        params: { role: role }
      });
      console.log('Role updated:', response.data);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (loading) {
    return <div style={{ flex:'1',  display: "flex", justifyContent: "center", alignContent:"center"}}>
      <CircularProgress color="inherit" size={120} />
    </div>;
  }

  if (members.length === 0) {
    return <div>No members to show</div>;
  }


  return (
    <div>
      {members.map((value, index)=>{
        return <MemberComponent id={value.id} email={value.email} phoneNum={value.phoneNum}/>
      })}
      {/* <h2>Members</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>School ID</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.email}</td>
              <td>{member.schoolId}</td>
              <td>{member.phoneNum}</td>
              <td>{member.memberRole}</td>
              <td>
                { member.memberRole !== 'ADMIN' ?
                <input type="checkbox" onChange={(e) => handleCheckboxChange(e, member.id)} />
              : <input type="checkbox" disabled />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select onChange={handleRoleChange}>
          <option value="">Select Role To Change</option>
          <option value="DENIED">Denied</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div> */}
    </div>
  );
}

export default MemberTable;
