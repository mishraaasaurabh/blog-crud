import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import PostModel from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const posts = await PostModel.find().sort({ createdAt: -1 });
  res.json({ posts });
}