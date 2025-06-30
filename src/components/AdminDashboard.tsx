import React, { useEffect, useState } from 'react';
import BlogList from './BlogList';
import { Post } from '../models/Post';

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete post');
        setPosts(posts.filter(post => post.slug !== slug));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <BlogList posts={posts} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;