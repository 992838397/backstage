// 提供个人中心API相关接口
const express = require('express');
// 创建一个路由
const router = express.Router();
// 引入自定义模块SQL服务器启动
const conn = require('../util/sql')
// 引入处理头像上传模块
const multer = require('multer');
// 精细化去设置，如何去保存router文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})
var upload = multer({ storage })

router.use(express.urlencoded())


//1.获取用户信息
router.get('/userinfo', (req, res) => {
    // 接收参数
    const { username } = req.query;
    // 拼接SQL语句
    const sqlStr = `select username,nickname,email,userPic from users where  username="${username}"`;

    // 根据不同SQL语句返回不同的值
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "message": "服务器失败",
            })

        }
        if (result.length > 0) {
            res.json({
                "status": 0,
                "message": "获取用户基本信息成功！",
                "data": result
            })
        } else {
            res.json({
                status: 1,
                message: '获取用户基本信息失败'
            })


        }


    })

})

//2.更新用户信息
router.post('/userinfo', (req, res) => {
    // 接收参数
    // console.log(req.body);
    const { id, nickname, email, userPic } = req.body;
    // 如果用户修改一个呢？而不是多个呢？
    // 定义一个空数组,如何判断是否为真。
    let condiing = [];
    if (nickname) {
        condiing.push(`nickname = "${nickname}"`)
    }
    if (email) {
        condiing.push(`email = "${email}"`)
    }
    if (userPic) {
        condiing.push(`userPic = "${userPic}"`)
    }
    const sqlconting = condiing.join();
    // 拼接SQL语句
    const sqlStr = `update users set ${sqlconting} where id="${id}"`
    conn.query(sqlStr, (err, result) => {
        //根据不同的sql语句返回不同的值
        if (err) {
            console.log(err);
            res.json({ message: '修改用户信息失败', status: 1 })
        }
        res.json({ status: 0, message: '修改用户信息成功！' })
    })
})
//3.上传用户头像
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // 接收参数
    console.log(req.file);
    res.json({
        status: 0,
        message: '上传成功',
        src: 'http://127.0.0.1:8000/' + req.file.filename

    })
    // 拼接字符串
    // 根据具体的sql语句返回值
})
// 4.重置密码
// 判断新旧密码，判断id和旧密码是否正确,正确才修改
router.post('/updatepwd', (req, res) => {
    // 接收参数
    const { id, oldPwd, newPwd } = req.body;
    // 根据sql拼接语句

    const sqlStr = `update users set password="${newPwd}"  where password=${oldPwd} and id=${id}`
    // 根据不同的情况返回不同的返回值
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: 1,
                message: '服务器错误'

            })

        }
        // 这里有一部分校验旧密码留给前端做
        res.json({
            status: 0,
            message: '更新密码成功'
        })
    })
})
// 导出
module.exports = router;

