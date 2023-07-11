const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGOOSE_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: ["https://canding-01.vercel.app/", "http://localhost:3000"],
  })
);

//routes
const report = require("./routes/report");
app.use("/users", report);

app.listen(9000, () => console.log("server is live on http://localhost:9000"));
