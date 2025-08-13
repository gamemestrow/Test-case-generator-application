const express = require("express");
const { textFunctionController } = require("./controllers/testCodeControllers");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const testCodeRoutes = require("./routes/testCodeRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus:200
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/test", testCodeRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log("server is listenning at " + PORT);
});
