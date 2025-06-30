import { GetServerSideProps } from 'next';
import { Post } from '../../models/Post';
import MetaTags from '../../components/MetaTags';

interface BlogPostProps {
  post: Post | null;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  if (!post) {
    return <div style={{ textAlign: 'center', margin: '3em 0', color: '#e53e3e' }}>Post not found.</div>;
  }
  return (
    <div className="container" style={{ maxWidth: 700, margin: '3em auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 32 }}>
      <MetaTags title={post.title} description={post.content.substring(0, 150)} />
      <h1 style={{ color: '#2d3748', marginBottom: 16 }}>{post.title}</h1>
      <div style={{ color: '#4a5568', fontSize: 18, whiteSpace: 'pre-line', marginBottom: 24 }}>{post.content}</div>
      <div style={{ color: '#a0aec0', fontSize: 14 }}>Published: {new Date(post.createdAt).toLocaleString()}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = context.req.headers.host;
  const res = await fetch(`${protocol}://${host}/api/posts/${slug}`);
  if (!res.ok) return { props: { post: null } };
  const post = await res.json();
  return { props: { post } };
};

export default BlogPost;