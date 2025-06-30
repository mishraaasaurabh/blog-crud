import { NextApiRequest, NextApiResponse } from 'next';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.setHeader('Set-Cookie', 'admin=1; Path=/; HttpOnly; SameSite=Lax');
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, error: 'Invalid password' });
}
