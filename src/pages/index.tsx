import React from 'react';
import BlogList from '../components/BlogList';
import { Post } from '../models/Post';
import { GetServerSidePropsContext } from 'next';

interface HomeProps {
  posts: Post[];
}

const HomePage: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', margin: '1em 0', color: '#2d3748' }}>Welcome to the Blog</h1>
      <p style={{ textAlign: 'center', color: '#4a5568' }}>Explore our latest posts below:</p>
      <a href="/admin" style={{ display: 'block', textAlign: 'center', margin: '1em 0', fontWeight: 'bold', color: '#3182ce' }}>Go to Admin Dashboard</a>
      <BlogList posts={posts} showAdminControls={false} />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = context.req?.headers.host;
  const res = await fetch(`${protocol}://${host}/api/posts`);
  const data = await res.json();
  return { props: { posts: data.posts || [] } };
}

export default HomePage;