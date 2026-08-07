const app = require("../src/app");
const connectDB = require("../src/config/database");

let connected = false;

const handler = async (req, res) => {
  if (!connected) {
    await connectDB();
    connected = true;
  }

  return serverless(app)(req, res);
};

module.exports = handler;
