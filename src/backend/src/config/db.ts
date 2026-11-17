import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://playzofficial2106_db_user:iglscare@iglscare.08elfqs.mongodb.net/samarthya_db?retryWrites=true&w=majority';

const DB_NAME = process.env.MONGODB_DB_NAME || 'samarthya_db';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db && client) {
    return db;
  }

  try {
    client = new MongoClient(DEFAULT_URI, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    db = client.db(DB_NAME);
    console.log(`[Database] MongoDB Atlas Connected: Database "${DB_NAME}"`);

    // 1. Unique index on users.email
    try {
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    } catch {
      // Index might already exist
    }

    // 2. OTP TTL index - auto-deletes expired OTP documents after 600 seconds (10 minutes)
    try {
      await db.collection('otps').createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 });
      await db.collection('otps').createIndex({ email: 1 });
    } catch {
      // Index might already exist
    }

    return db;
  } catch (error) {
    console.error('[Database] MongoDB Connection Error:', error);
    throw error;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not initialized. Please call connectDB() first.');
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('[Database] MongoDB connection closed');
  }
}

