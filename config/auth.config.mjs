import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authConfig = {
  secret: process.env.SECRET_KEY || 'default-secret-key', 
  tokenExpiration: 86400,
   // Fallback to a default if not set
};

export default authConfig;