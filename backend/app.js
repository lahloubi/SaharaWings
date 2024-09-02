require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const volRoutes = require("./routes/vols");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/vols", volRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database and server is running on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
