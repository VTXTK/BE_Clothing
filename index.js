const express = require('express')
const connectDB = require('./utils/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
const categoryRoute = require('./src/routes/category')
const brandRoute = require('./src/routes/brand')
const bannerRoute = require('./src/routes/banner')
const orderRoute = require('./src/routes/order')
const uploadRoute = require('./src/routes/upLoad')
const path = require('path');

const app = express()
app.use(express.json())
// const allowAllOriginsWithCredentials = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// };
// // Sử dụng middleware tùy chỉnh
// app.use(allowAllOriginsWithCredentials);

const corsOptions = {
    origin: function (origin, callback) {
        // Cho phép requests không có origin (như mobile apps hoặc curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = ['http://localhost:3000'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Cho phép gửi thông tin xác thực
};
//app.use(express.urlencoded({ extended: true }));
connectDB()
app.listen(8000, () => {
    console.log('Sever is running')
})
app.use(cors(corsOptions));
//Route

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/brand", brandRoute)
app.use("/api/v1/banner", bannerRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/order", orderRoute)
//app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/file", uploadRoute)
// app.use("/api/v1/dashboard", dashboardRoute)
app.use(express.static(path.join(__dirname, 'public')));




// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         credentials: true
//     }
// ))
app.use(cookieParser())




// app.use("/api/v1/order", orderRoute)

//authentication : so sanh du lieu vo database
//authorization : chia role, phana quyen
//Json web token(JWT) : xac thuc nguoi dung