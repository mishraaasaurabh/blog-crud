import React, { useEffect, useState } from 'react';
import BlogList from '../../components/BlogList';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check for admin cookie
    if (document.cookie.includes('admin=1')) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/posts')
        .then(res => res.json())
        .then(data => setPosts(data.posts || []));
    }
  }, [isAuthenticated]);

  const handleEdit = (slug: string) => router.push(`/admin/edit/${slug}`);
  const handleDelete = async (slug: string) => {
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    setPosts(posts.filter((p: any) => p.slug !== slug));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleLogin} style={{ maxWidth: 320, margin: '3em auto', background: '#f7fafc', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 16 }}>Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 4, border: '1px solid #cbd5e0', fontSize: 16 }}
        />
        <button type="submit" style={{ width: '100%', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>Login</button>
        {error && <div style={{ color: 'red', marginTop: 12, textAlign: 'center' }}>{error}</div>}
      </form>
    );
  }

  return (
    <div className="admin-dashboard" style={{ maxWidth: 800, margin: '2em auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 24 }}>Admin Dashboard</h1>
      <button onClick={() => router.push('/admin/create')} style={{ display: 'block', margin: '0 auto 2em auto', background: '#38a169', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>Create New Post</button>
      <BlogList posts={posts} onEdit={handleEdit} onDelete={handleDelete} showAdminControls={true} />
    </div>
  );
};

export default AdminDashboard;