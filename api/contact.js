// Vercel serverless function — stores contact form messages in MongoDB Atlas.
// Deployed automatically from the `api/` folder when this repo is connected to Vercel.
// Requires the MONGODB_URI env var (set it in the Vercel project settings).

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'portfolio'
const collectionName = process.env.MONGODB_COLLECTION || 'messages'

let client
let clientPromise

function getClient() {
  if (!clientPromise) {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
    clientPromise = client.connect()
  }
  return clientPromise
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!uri) {
    return res.status(500).json({ error: 'MONGODB_URI is not configured' })
  }

  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const mongoClient = await getClient()
    const result = await mongoClient.db(dbName).collection(collectionName).insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    })
    return res.status(201).json({ success: true, id: result.insertedId })
  } catch (err) {
    console.error('[contact] MongoDB insert failed:', err)
    return res.status(500).json({ error: 'Failed to save your message' })
  }
}
