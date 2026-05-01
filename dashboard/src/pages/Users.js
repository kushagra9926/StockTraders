import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('/api/admin/users').then(res => {
      setUsers(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  const handleToggle = async (id) => {
    try {
      const res = await axios.put(`/api/admin/users/${id}/toggle`);
      setUsers(users.map(u => u._id === id ? res.data.user : u));
    } catch (err) {
      alert('Failed to toggle user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div>
      <h2 className="page-header">👥 Manage Users</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '350px' }}
        />
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>${user.balance?.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-dark' : 'bg-primary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`btn btn-sm me-1 ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleToggle(user._id)}
                    >
                      {user.isActive ? 'Disable' : 'Enable'}
                    </button>
                    {user.role !== 'admin' && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-muted mt-2">Total: {filtered.length} users</p>
    </div>
  );
};

export default Users;
