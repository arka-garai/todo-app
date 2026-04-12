const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user.js")
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/", userRouter);

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
    app.listen(3345, async function () {
        console.log("server is running")
    })
}
main();
