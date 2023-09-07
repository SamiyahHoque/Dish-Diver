require('dotenv').config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;

module.exports = {
  RAPID_API_KEY,
  RAPID_API_HOST,
};
