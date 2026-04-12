const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user.js")
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/", userRouter);

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
    app.listen(3345, async function () {
        console.log(`server is running on: ${PORT}`);
    })
}
main();
