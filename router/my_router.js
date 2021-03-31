// 提供个人中心API相关接口
const express = require('express');
// 创建一个路由
const router = express.Router();
// 引入自定义模块SQL服务器启动
const sql = require('../util/sql')

router.get('/add', (req, res) => {
    console.log(req.query);
    res.json('ok')
})

// 导出
module.exports = router;

