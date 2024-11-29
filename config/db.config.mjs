import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbConfig = {
  HOST: process.env.DB_HOST || '0.0.0.0', // Default to 0.0.0.0 if not specified
  PORT: process.env.DB_PORT || 27017, // Default to 27017 if not specified
  DB: process.env.DB_NAME || 'passAuthProj', // Default to bezkoder_db if not specified
  URI: process.env.DB_URI || `mongodb://${process.env.DB_HOST || '0.0.0.0'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'passAuthProj'}` // MongoDB URI
};

export default dbConfig;