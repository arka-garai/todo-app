const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { UserModel, TodoModel } = require("../db.js")
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../Middleware/authMiddleware.js")

userRouter.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    try {
        const hasedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findOne({
            email
        });

        if (user) {
            res.json({
                message: "user with this email already exists!"
            })
            return
        }

        await UserModel.create({
            email: email,
            password: hasedPassword,
            username: username
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
        return
    }

    res.json({
        message: "signup successfull"
    })

})

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await UserModel.findOne({
            email
        })
        if (!user) {
            return res.status(403).json({
                message: "invalid credentials"
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        //jwt
        if (passwordMatched) {
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_USER_PASSWORD);

            if (token) {
                return res.json({
                    token,
                    message: "signin successfull"
                })
            }
        } else {
            return res.json({
                message: "invalid credentials"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
        return

    }
})



//authenticated endpoint
userRouter.post("/todo", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { title, status } = req.body;
    try {
        await TodoModel.create({
            userId,
            title,
            status
        })

        res.status(201).json({
            message: "todo added successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
        return
    }

})

//authenticated endpoint
userRouter.get("/todos", userMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const todos = await TodoModel.find({
            userId
        })

        res.status(200).json({
            todos
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
        return
    }

})

module.exports = {
    userRouter
}
