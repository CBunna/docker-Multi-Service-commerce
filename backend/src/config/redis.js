const redis = require('redis');

// Debug what we're getting
console.log('=== REDIS CONFIG DEBUG ===');
console.log('REDIS_HOST env var:', process.env.REDIS_HOST);
console.log('REDIS_PORT env var:', process.env.REDIS_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Use the most explicit configuration possible
const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
console.log('Redis URL:', redisUrl);

const client = redis.createClient({
  url: redisUrl,
  // Force IPv4 to prevent IPv6 issues
  socket: {
    family: 4
  }
});

client.on('connect', () => {
  console.log('✅ Redis connected successfully to:', redisUrl);
});

client.on('error', (err) => {
  console.error('❌ Redis error:', err);
  console.log('Continuing without Redis...');
});

// Simple connection with timeout
const connectWithTimeout = async () => {
  try {
    console.log('Attempting Redis connection...');
    await client.connect();
    console.log('Redis connection established!');
  } catch (err) {
    console.error('Redis connection failed:', err.message);
    console.log('Application will continue without Redis cache');
  }
};

connectWithTimeout();

// Export simple interface
module.exports = {
  get: async (key) => {
    try {
      if (!client.isOpen) return null;
      return await client.get(key);
    } catch (err) {
      console.log('Redis get failed:', err.message);
      return null;
    }
  },
  setEx: async (key, seconds, value) => {
    try {
      if (!client.isOpen) return;
      return await client.setEx(key, seconds, value);
    } catch (err) {
      console.log('Redis setEx failed:', err.message);
    }
  }
};