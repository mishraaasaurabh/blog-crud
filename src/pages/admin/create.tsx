import React, { useState } from 'react';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSlug(slugify(e.target.value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      toast.success('Blog post created successfully!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      toast.error('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '3em auto', background: '#f7fafc', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 8 }}>Create Post</h2>
      <label style={{ fontWeight: 500, marginBottom: 4 }}>Title</label>
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        required
        style={{ width: '100%', marginBottom: 0, padding: 12, borderRadius: 4, border: '1px solid #cbd5e0', fontSize: 16 }}
      />
      <label style={{ fontWeight: 500, marginBottom: 4 }}>Slug</label>
      <input
        value={slug}
        readOnly
        placeholder="Slug"
        style={{ width: '100%', marginBottom: 0, padding: 12, borderRadius: 4, border: '1px solid #e2e8f0', background: '#edf2f7', color: '#718096', fontSize: 16 }}
      />
      <label style={{ fontWeight: 500, marginBottom: 4 }}>Content <span style={{ color: '#e53e3e' }}>*</span></label>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write the body of your blog post here..."
        required
        style={{ width: '100%', minHeight: 180, padding: 12, borderRadius: 4, border: '1px solid #cbd5e0', fontSize: 16, resize: 'vertical', background: '#fff' }}
      />
      <button type="submit" style={{ width: '100%', background: '#38a169', color: '#fff', border: 'none', borderRadius: 4, padding: '14px 0', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginTop: 12 }}>Create Post</button>
    </form>
  );
};

export default CreatePost;