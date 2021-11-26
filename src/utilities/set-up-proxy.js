// const proxy = require("http-proxy-middileware");

// module.exports = function (app) {
//   app.use(
//     proxy("/api", {
//       target: "http://localhost:3000/graphql",
//       changeOrigin: true,
//       secure: false,
//     })
//   );
// };

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000/graphql",
    changeOrigin: true,
  })
);
