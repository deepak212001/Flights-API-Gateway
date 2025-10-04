const express = require("express");
const { ServerConfig } = require("./config/index.js");
const axios = require("axios");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, () => {
    console.log(`API Gateway for flight service is runnind on port ${ServerConfig.PORT}`)
})

console.log("flight service ", ServerConfig.FLIGHT_SERVICE)
app.use('/flightsService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    // pathRewrite: { '^/flightsService': '/' }
}));


// and by own function
// app.use('/flightsService', async (req, res) => {
//     try {

//         const targetUrl = `${ServerConfig.FLIGHT_SERVICE}${req.originalUrl.replace("/flightsService", "")}`;
//         console.log("targetUrl", targetUrl)
//         // const headers = { ...req.headers };
//         // delete headers['if-none-match'];
//         // delete headers['if-modified-since'];
//         const response = await axios({
//             method: req.method,
//             url: targetUrl,
//             headers: req.headers,
//             data: req.body,
//             validateStatus: () => true
//         })
//         // console.log(response);

//         res.status(response.status).json(response.data);
//         if (response.data.success) {
//             next();
//         }
//     } catch (error) {
//         console.log("error", error)
//         res.status(401).json({
//             message: "Unauthorised",
//         });
//     }
// });

app.use('/bookingService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true
}));

console.log("auth ", ServerConfig.AUTH_SERVICE)
app.use('/authService', createProxyMiddleware({
    target: ServerConfig.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/authService': '/' }
}));
