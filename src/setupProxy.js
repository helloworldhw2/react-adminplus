const { createProxyMiddleware}= require('http-proxy-middleware')
module.exports = function(app){
	app.use(createProxyMiddleware([process.env.REACT_APP_API],{
		//请求的前缀写这里 服务器的路由path不要写
			target: process.env.REACT_APP_BASE_URL,
			changeOrigin:true,
      pathRewrite: {
				[`^${process.env.REACT_APP_API}`] : ""
      },
		}))
	// app.use(createProxyMiddleware("/manage/api",{
	// 	//请求的前缀写这里 服务器的路由path不要写
	// 		target:"http://admintest.happymmall.com:7000",
	// 		changeOrigin:true
	// 	}))
}