// pages/api/saveUserInfo.js
import { connectToMongoDB } from './database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInfo = req.body;

    try {
      const db = await connectToMongoDB();
      // MongoDB: Save user profile
      await db.collection('users').insertOne(userInfo);

      res.status(200).json({ message: 'User info saved successfully' });
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
