// pages/api/saveUserInfo.js
import { connectToMongoDB } from './database';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userInfo = req.body;

        try {
            const db = await connectToMongoDB();
            // Check if the user already exists
            const existingUser = await db.collection('users').findOne({ walletAddress: userInfo.walletAddress });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' }); // 409 Conflict might be appropriate
            }

            // MongoDB: Save user profile
            await db.collection('users').insertOne(userInfo);
            res.status(201).json({ message: 'User info saved successfully' }); // Using 201 Created for new resource
        } catch (error) {
            console.error('Failed to save user info:', error);
            res.status(500).json({ error: 'Failed to save user info' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
