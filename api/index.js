const express=require("express");
const app=express();
const dotenv=require("dotenv");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const MovieRoute=require("./routes/movies");
const ListRoute=require("./routes/lists");
const cors = require("cors");


dotenv.config();

//MongoDB Connection
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("DB connection successfull!!"))
.catch((err)=>console.log(err));
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",MovieRoute);
app.use("/api/lists",ListRoute);
// app.use(cors());
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:4000', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//        res.set('Access-Control-Allow-Origin', '*');
//     }
// }));
app.listen(4000,()=>{
    console.log("Backend server is running!!");
})