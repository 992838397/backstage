// 1.加载express
const express = require('express');
const sql = require('../util/sql');
// 2.路由中间键
const router = express.Router();
// 3.引用数据库
const conn = require("../util/sql")

// 1.搜索
router.get('/search', (req, res) => {
    // 接收参数
    console.log(req.query);
    const { key, type, page, perpage } = req.query;
    // 拼接SQL语句
    const sqlStr = `select * from articles  where title like "%${key}%" or categoryid=${type}`
    conn.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) {
            res.json({ message: '服务器错误', status: 1 })
        }
        console.log(res.result);
        res.json({ message: '查询成功', status: 0, page: 1, pages: result.length, data: result })
        // res.json({ message: '查询失败', status: 1 })

    })
    // 根据不同的返回值返回不同的值
})
// 2.文章类型
router.get('/category', (req, res) => {
    console.log(req.query);
    const { id, name } = req.query;
    const sqlStr = `select id,categoryid from articles`
    conn.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) {
            res.json({ message: '服务器失败', status: 1 })
        }
        res.json({ message: '获取文章类型成功', status: 0, data: result })
    })
})
//3.热点图
router.get('/hotpic', (req, res) => {
    const { id, imgurl } = req.query;
    const sqlStr = `select id,title from articles  order by id limit 7`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ message: '服务器错误', status: 1 })
        }
        res.json({ message: '查询成功', status: 0, data: result })
    })
})
//4.最新资讯
router.get('/latest', (req, res) => {
    const sqlStr = `select * from articles order by id limit 5`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ message: '服务器错误', status: 1 })
        }
        res.json({ message: '查询成功', status: 0, data: result })
    })
})
// 5.最新评论
router.get('/latest_comment', (req, res) => {
    const sqlStr = `select author,date,content from comments order by id limit 5`
    conn.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) {
            res.json({ message: '服务器错误', status: 1 })
        }

        res.json({ message: '查询成功', status: 0, data: result })
    })
})






// 导出
module.exports = router;