import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import PostModel from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await PostModel.findOne({ slug });
    if (!post) return res.status(404).json({ error: 'Not found' });
    return res.json(post);
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const newSlug = title ? require('slugify')(title, { lower: true, strict: true }) : slug;
    const post = await PostModel.findOneAndUpdate(
      { slug },
      { title, content, slug: newSlug },
      { new: true }
    );
    return res.json(post);
  }

  if (req.method === 'DELETE') {
    await PostModel.findOneAndDelete({ slug });
    return res.json({ success: true });
  }

  res.status(405).end();
}