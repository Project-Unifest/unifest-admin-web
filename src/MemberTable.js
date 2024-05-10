import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberTable.css';
const BaseURL = 'http://ec2-43-200-72-31.ap-northeast-2.compute.amazonaws.com:9090';

function MemberTable({ role }) {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [loading, setLoading] = useState(true); // 멤버들을 불러오는 중인지 여부

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(`${BaseURL}/members`, {
          params: { role: role }
        });
        setMembers(response.data.data);
        setLoading(false); // 멤버들을 모두 불러왔음을 표시
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
      const response = await axios.patch(`${BaseURL}/members/${memberId}`, null, {
        params: { role: role }
      });
      console.log('Role updated:', response.data);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (members.length === 0) {
    return <div>No members to show</div>;
  }

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
          <option value="">Select Role To Change</option>
          <option value="DENIED">Denied</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default MemberTable;
