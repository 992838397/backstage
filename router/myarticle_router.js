// 提供获取文章分类列表API相关接口
const express = require('express');
// 创建一个路由
const router = express.Router();
// 引入自定义模块SQL服务器启动
const conn = require('../util/sql')
router.use(express.urlencoded())

// 1.获取文章分类
router.get('/cates', (req, res) => {
    // 接收参数
    console.log(req.query);

    // 拼接SQL语句
    const sqlStr = `select * from categories `
    //根据不同的返回值返回
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: 1,
                message: "服务器错误"
            })
        }
        res.json({ status: 0, message: '获取文章分类列表成功', data: result })

    })
})
// 2.新增文章分类
router.post('/addcates', (req, res) => {
    console.log(req.body);
    // 接收参数
    const { name, slug } = req.body;
    // 拼接SQL字符串
    const sqlStr = `insert into categories(name,slug) values("${name}","${slug}")`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 1, message: '服务器错误' })
        }
        res.json({ status: 0, message: "新增文章分类成功！" })

    })

})
//3.根据id删除文章
router.get('/deletecate', (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    const sqlStr = `delete from categories where  id=${id} `
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ message: '服务器错误', status: 1 })
            return
        }
        if (result.affectedRows > 0) {
            res.json({ message: '删除成功', status: 0 })
        } else {
            res.json({ message: '删除失败', status: 1 })
        }
    })

})
//4.根据id获取文章分类数据
router.get('/getCatesById', (req, res) => {
    // 接收参数解构
    const { id } = req.query;
    // 拼接sql语句
    const sqlStr = `select name,slug from categories where  id=${id}`
    //根据不同的情况返回不同的值
    conn.query(sqlStr, (err, result) => {
        // console.log(err);
        if (err) {
            res.json({ message: "服务器错误", status: 1 })
        }

        res.json({ message: '获取文章分类数据成功', status: 0, data: result })
    })
})
//5.根据id更新文章分类数据
router.post('/updatecate', (req, res) => {
    // 接收参数
    const { id, name, slug } = req.body;
    // 拼接SQL语句
    let arrContent = [];
    if (name) {
        arrContent.push(`name="${name}"`)
    }
    if (slug) {
        arrContent.push(`slug="${slug}"`)
    }
    let strSQL = arrContent.join();
    const sqlStr = `update categories set  ${strSQL}  where id=${id}`
    console.log(sqlStr);
    conn.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) {
            res.json({ message: "更新分类信息失败", status: 1 })
        }
        res.json({ message: '更新分类信息成功', status: 0 })
    })
})
// 导出
module.exports = router;

