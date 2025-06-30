import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import slugify from '../../../lib/slugify';

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  await dbConnect();

  const slug = slugify(title);

  try {
    const newPost = new Post({ title, content, slug });
    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error });
  }
}