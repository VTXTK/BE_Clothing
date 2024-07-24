const User = require("../model/Users")
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require('jsonwebtoken')

let refreshTokens = []

const autController = {
    registertUser: async (req, res) => {
        console.log('vo register')
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!req.body.email || !emailRegex.test(req.body.email)) {
                return res.status(400).json({ message: "Email không hợp lệ hoặc bị bỏ trống" });
            }

            // Kiểm tra password
            if (!req.body.password) {
                return res.status(400).json({ message: "Mật khẩu không được để trống" });
            }

            // Kiểm tra số điện thoại
            const phoneRegex = /^\d{10}$/;
            if (!req.body.phoneNumber || !phoneRegex.test(req.body.phoneNumber)) {
                return res.status(400).json({ message: "Số điện thoại phải có 10 chữ số và không chứa ký tự đặc biệt" });
            }
            // Kiểm tra trùng lặp email, số điện thoại và username
            const existingEmail = await User.findOne({ email: req.body.email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email đã được sử dụng" });
            }

            const existingPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });
            if (existingPhone) {
                return res.status(400).json({ message: "Số điện thoại đã được sử dụng" });
            }

            const existingUsername = await User.findOne({ username: req.body.username });
            if (existingUsername) {
                return res.status(400).json({ message: "Username đã được sử dụng" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)
            const userTest = await User?.find()
            if (userTest == null) {
                let idUser
                do {
                    idUser = Math.floor(Math.random() * 100000000) + 1;
                } while (userTest.includes(idUser))
            }
            else {
                idUser = Math.floor(Math.random() * 100000000) + 1;
            }
            const userId = `KH${idUser}`
            //tao user
            const newUser = await new User({
                id: userId,
                email: req.body.email,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
            })
            //save database
            const user = await newUser.save()
            res.status(200).json({
                data: {
                    _id: user.id,
                    user: user
                }
            })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    generateAccessToken: (email) => {
        return jwt.sign({
            id: email.id,
            role: email.role,
            firstName: email.firstName,
            lastName: email.lastName,
            email: email.email,
            phoneNumber: email.phone,
            profilePicture: email.profilePicture

        },
            process.env.JWK_SUCCES_KEY,
            { expiresIn: "60000s" }
        )
    },
    generateRefreshToken: (email) => {
        return jwt.sign({
            id: email.id,
            role: email.role,
        },
            process.env.JWK_REFRESH_KEY,
            { expiresIn: "365d" }
        )
    },
    loginUser: async (req, res) => {
        console.log("vo");
        try {
            console.log("vo")
            const email = await User.findOne({ email: req.body.email })
            if (!email) {
                return res.status(404).json({ message: "Email hoăc mật khẩu không chính xác!" })
            }
            const validPassword = await bcrypt.compare(

                req.body.password,
                email.password,

            )
            if (!validPassword) {
                return res.status(404).json({ message: "Email hoăc mật khẩu không chính xác!" })
            }
            if (email && validPassword) {
                const accessToken = autController.generateAccessToken(email)
                const refreshToken = autController.generateRefreshToken(email)
                refreshTokens.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "Strict"
                })
                const { password, ...others } = email._doc

                res.status(200);
                res.json({
                    data: {
                        user: others, // Trả về thông tin user
                        accessToken: accessToken,// Trả về access token
                    }

                });
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    loginFromGG: async (req, res) => {

        let email = await User.findOne({ email: req.body.email })
        if (!email) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(salt, salt)
            const userTest = await User.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (userTest.includes(id))
            const userId = `KH${id}`
            //tao user
            const newUser = await new User({
                email: req.body.email,
                id: userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashed,
                profilePicture: req.body.profilePicture,
            })
            //save database
            const user = await newUser.save()
            email = user
        }
        const accessToken = autController.generateAccessToken(email)
        const refreshToken = autController.generateRefreshToken(email)
        refreshTokens.push(refreshToken)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "Strict"
        })
        const { ...others } = email._doc

        res.status(200);
        res.json({
            data: {
                user: others, // Trả về thông tin user
                accessToken: accessToken,// Trả về access token
            }

        });
    },
    requestRefreshToken: async (req, res) => {
        //lay refresh token tu user
        const refreshToken = req.cookies.refreshToken


        if (!refreshToken) {
            return res.status(401).json("You're not authenticated")

        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid")
        }
        jwt.verify(refreshToken, process.env.JWK_REFRESH_KEY, (err, email) => {
            if (err) {
                console.log(err)
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = autController.generateAccessToken(email)
            const newRefreshToken = autController.generateRefreshToken(email)
            //luu refreshToken
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Strict"
            })

            res.status(200)
            return res.json({ accessToken: newAccessToken })
        })
    },

    userLogout: async (req, res) => {
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200)
        return res.json({ data: { user: req.user } })
    },
    getAccount: async (req, res) => {
        if (req.user) {
            return res.json({
                data: {
                    user: req.user
                }
            })
        }
    }
}

module.exports = autController



//store token
// 1: Local storage
//De bi tan cong boi XSS
// 2 : HTTPONLY COOKIE
//De bi tan cong boi CSRF nhung SAMESITE co the khac phuc
// 3 : REDUX STRORE -> ACCESSTOKEN + HTTPONLY COOKIE -> REFRESHTOKEN