const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);
module.exports = app;
