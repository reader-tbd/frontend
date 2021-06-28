const withPWA = require('next-pwa');
const dotenv = require('dotenv');

dotenv.config();

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_PORT: process.env.BACKEND_PORT,
  },
});