// 提供登陆API相关接口
const express = require('express');
// 创建一个路由
const router = express.Router();
// 引入自定义模块SQL服务器启动
const conn = require('../util/sql')
// 生成token值
const jwt = require('jsonwebtoken')

// POST请求普通键值对接收
router.use(express.urlencoded())


// 登陆注册接口

// 1.注册接口(用户名不能重复)
router.post('/register', (req, res) => {
    // 接收参数
    const { username, password } = req.body;
    // 注册的用户名不能相同,则需要查询一次,如果查到,则说明用户名存,如果没有查询到,说明用户注册成功
    const sqlStrselect = `select username from users where username="${username}"`;
    // 调用query()
    conn.query(sqlStrselect, (err, result) => {
        if (err) {
            res.json({ message: '服务器失败', status: 500 })
            return
        }
        // console.log("这是result长度", result.length);
        if (result.length > 0) {
            res.json({ message: '注册失败,用户名已存在', status: 1 })
            return
        }
        // 用户名没有被占用 继续执行
        //SQL语句拼接
        // 添加
        const sqlStr = `insert into users(username,password) values("${username}","${password}")`
        // 调用SQL的方法 query()
        // 根据不同的SQL语句返回不同的值
        conn.query(sqlStr, (err, result) => {
            // 请求失败则执行下面语句
            if (err) {
                res.json({ message: "注册失败", status: 1 })
                return
            }
            // 执行成功
            res.json({ message: '注册成功', status: 0 })
        })



    })




})

// 2.登陆接口
router.post('/login', (req, res) => {
    // 接收参数
    console.log(req.body);
    const { username, password } = req.body
    // 拼接SQL
    const sqlstr = `select username,password from users where  username="${username}" and password="${password}"`;
    conn.query(sqlstr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: "服务器错误", status: 1 })
        }
        if (result.length > 0) {
            // 未来接口要用到的token,
            const token = "Bearer " + jwt.sign({ name: 'userName' }, 'gz61', { expiresIn: 2 * 60 * 60 * 60 });
            res.json({ message: "登陆成功", status: 0, token })
        } else {
            res.json({ message: '登陆失败,用户名或密码错误', status: 201 })
        }
    })

    // 根据不同的情况返回不同的值

})
// 导出
module.exports = router;

