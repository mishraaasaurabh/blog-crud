import React from 'react';
import { Post } from '../models/Post';

interface BlogListProps {
  posts?: Post[];
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
  showAdminControls?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ posts = [], onEdit, onDelete, showAdminControls = false }) => {
  if (!posts.length) {
    return <div style={{ textAlign: 'center', color: '#888', margin: '2em 0' }}>No blog posts yet.</div>;
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#2b6cb0', marginBottom: '1em' }}>Blog Posts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} className="post" style={{ background: '#f7fafc', borderRadius: 8, marginBottom: 24, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 className="post-title" style={{ marginBottom: 8 }}>
              <a href={`/blog/${post.slug}`} style={{ color: '#2b6cb0', textDecoration: 'none' }}>{post.title}</a>
            </h3>
            {post.content && (
              <div className="post-content" style={{ color: '#4a5568', marginBottom: 12 }}>
                <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '') }} />
              </div>
            )}
            {showAdminControls && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onEdit && onEdit(post.slug)} style={{ background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => onDelete && onDelete(post.slug)} style={{ background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;