const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/image", "/env.js", "/cv"],
    createProxyMiddleware({
      target: "https://unep-gpml.akvotest.org/",
      changeOrigin: true,
    })
  );
};
