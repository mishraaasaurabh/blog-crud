import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialTitle = '', initialContent = '', onSubmit }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ title, content });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <button type="submit">Save Post</button>
    </form>
  );
};

export default BlogEditor;