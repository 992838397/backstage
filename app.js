// 1.加载express
const express = require('express');
//2.引用express
const server = express();
// 2.1引用跨域cors
const cors = require('cors')
//2.2 加载生成token模块
const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'heima61', // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
    path: ['/user/login', '/user/register'] // 除了这两个接口，其他都需要认证
}));

// 错误处理
server.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({ status: 1, message: '身份认证失败！' });
    }
});





server.use(cors());
//3.启动服务器
server.listen(8000, () => {
    console.log("8000端口服务器启动成功");
})