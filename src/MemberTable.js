import React, { useState, useEffect } from 'react';
import axios from 'axios';
let BaseURL = 'http://ec2-43-200-72-31.ap-northeast-2.compute.amazonaws.com:9090';

function MemberTable({ role }) {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(`${BaseURL}/members`, {
          params: { role: role }
        });
        setMembers(response.data.data);
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
    try {
      const response = await axios.patch(`${BaseURL}/members`, null, {
        params: { members: selectedMembers, role: newRole }
      });
      console.log('Role updated:', response.data);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error updating role:', error);
      setShowErrorPopup(true);
    }
  };

  return (
    <div>
      <h2>Members</h2>
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
                <input type="checkbox" onChange={(e) => handleCheckboxChange(e, member.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="DENIED">Denied</option>
          <option value="PENDING">Pending</option>
          <option value="ADMIN">Admin</option>
          <option value="VERIFIED">Verified</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {showSuccessPopup && <div>Success Popup</div>}
      {showErrorPopup && <div>Error Popup</div>}
    </div>
  );
}

export default MemberTable;
