import React, { useState } from 'react';
import MemberTable from './MemberTable';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <h1>Member Management</h1>
      <label htmlFor="role">Select Role:</label>
      <select id="role" value={selectedRole} onChange={handleRoleChange}>
        <option value="">All</option>
        <option value="ADMIN">Admin</option>
        <option value="PENDING">Pending</option>
        <option value="VERIFIED">Verified</option>
        <option value="DENIED">Denied</option>
      </select>
      <MemberTable role={selectedRole} />
    </div>
  );
}

export default App;