const app = require("../src/app");
const connectDB = require("../src/config/database");

let connected = false;

const handler = async (req, res) => {
  try {
    if (!connected) {
      await connectDB();
      connected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = handler;
