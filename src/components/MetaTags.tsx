import React from 'react';
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  slug: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, slug }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://yourdomain.com/blog/${slug}`} />
      <meta property="og:type" content="article" />
      <link rel="canonical" href={`https://yourdomain.com/blog/${slug}`} />
    </Head>
  );
};

export default MetaTags;