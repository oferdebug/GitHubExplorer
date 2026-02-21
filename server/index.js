require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

//Connect To Db
connectDB();

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    } ),
);
app.use(express.static("public"));

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/github", require("./routes/github"));
app.use("/api/favorites", require("./routes/favorites"));

app.get("/", (_req, res) => {
	res.send("Github Explorer API Ready!");
});
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
